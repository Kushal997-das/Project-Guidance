"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverTypedSignature_v4 = exports.recoverTypedSignature = exports.signTypedData_v4 = exports.signTypedData = exports.recoverTypedMessage = exports.signTypedMessage = exports.getEncryptionPublicKey = exports.decryptSafely = exports.decrypt = exports.encryptSafely = exports.encrypt = exports.recoverTypedSignatureLegacy = exports.signTypedDataLegacy = exports.typedSignatureHash = exports.extractPublicKey = exports.recoverPersonalSignature = exports.personalSign = exports.normalize = exports.concatSig = exports.TypedDataUtils = exports.TYPED_MESSAGE_SCHEMA = void 0;
const ethUtil = __importStar(require("ethereumjs-util"));
const ethAbi = __importStar(require("ethereumjs-abi"));
const nacl = __importStar(require("tweetnacl"));
const naclUtil = __importStar(require("tweetnacl-util"));
const TYPED_MESSAGE_SCHEMA = {
    type: 'object',
    properties: {
        types: {
            type: 'object',
            additionalProperties: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        type: { type: 'string' },
                    },
                    required: ['name', 'type'],
                },
            },
        },
        primaryType: { type: 'string' },
        domain: { type: 'object' },
        message: { type: 'object' },
    },
    required: ['types', 'primaryType', 'domain', 'message'],
};
exports.TYPED_MESSAGE_SCHEMA = TYPED_MESSAGE_SCHEMA;
/**
 * A collection of utility functions used for signing typed data
 */
const TypedDataUtils = {
    /**
     * Encodes an object by encoding and concatenating each of its members
     *
     * @param {string} primaryType - Root type
     * @param {Object} data - Object to encode
     * @param {Object} types - Type definitions
     * @returns {Buffer} - Encoded representation of an object
     */
    encodeData(primaryType, data, types, useV4 = true) {
        const encodedTypes = ['bytes32'];
        const encodedValues = [this.hashType(primaryType, types)];
        if (useV4) {
            const encodeField = (name, type, value) => {
                if (types[type] !== undefined) {
                    return [
                        'bytes32',
                        value == null // eslint-disable-line no-eq-null
                            ? '0x0000000000000000000000000000000000000000000000000000000000000000'
                            : ethUtil.keccak(this.encodeData(type, value, types, useV4)),
                    ];
                }
                if (value === undefined) {
                    throw new Error(`missing value for field ${name} of type ${type}`);
                }
                if (type === 'bytes') {
                    return ['bytes32', ethUtil.keccak(value)];
                }
                if (type === 'string') {
                    // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex
                    if (typeof value === 'string') {
                        value = Buffer.from(value, 'utf8');
                    }
                    return ['bytes32', ethUtil.keccak(value)];
                }
                if (type.lastIndexOf(']') === type.length - 1) {
                    const parsedType = type.slice(0, type.lastIndexOf('['));
                    const typeValuePairs = value.map((item) => encodeField(name, parsedType, item));
                    return [
                        'bytes32',
                        ethUtil.keccak(ethAbi.rawEncode(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v))),
                    ];
                }
                return [type, value];
            };
            for (const field of types[primaryType]) {
                const [type, value] = encodeField(field.name, field.type, data[field.name]);
                encodedTypes.push(type);
                encodedValues.push(value);
            }
        }
        else {
            for (const field of types[primaryType]) {
                let value = data[field.name];
                if (value !== undefined) {
                    if (field.type === 'bytes') {
                        encodedTypes.push('bytes32');
                        value = ethUtil.keccak(value);
                        encodedValues.push(value);
                    }
                    else if (field.type === 'string') {
                        encodedTypes.push('bytes32');
                        // convert string to buffer - prevents ethUtil from interpreting strings like '0xabcd' as hex
                        if (typeof value === 'string') {
                            value = Buffer.from(value, 'utf8');
                        }
                        value = ethUtil.keccak(value);
                        encodedValues.push(value);
                    }
                    else if (types[field.type] !== undefined) {
                        encodedTypes.push('bytes32');
                        value = ethUtil.keccak(this.encodeData(field.type, value, types, useV4));
                        encodedValues.push(value);
                    }
                    else if (field.type.lastIndexOf(']') === field.type.length - 1) {
                        throw new Error('Arrays are unimplemented in encodeData; use V4 extension');
                    }
                    else {
                        encodedTypes.push(field.type);
                        encodedValues.push(value);
                    }
                }
            }
        }
        return ethAbi.rawEncode(encodedTypes, encodedValues);
    },
    /**
     * Encodes the type of an object by encoding a comma delimited list of its members
     *
     * @param {string} primaryType - Root type to encode
     * @param {Object} types - Type definitions
     * @returns {string} - Encoded representation of the type of an object
     */
    encodeType(primaryType, types) {
        let result = '';
        let deps = this.findTypeDependencies(primaryType, types).filter((dep) => dep !== primaryType);
        deps = [primaryType].concat(deps.sort());
        for (const type of deps) {
            const children = types[type];
            if (!children) {
                throw new Error(`No type definition specified: ${type}`);
            }
            result += `${type}(${types[type]
                .map(({ name, type: t }) => `${t} ${name}`)
                .join(',')})`;
        }
        return result;
    },
    /**
     * Finds all types within a type definition object
     *
     * @param {string} primaryType - Root type
     * @param {Object} types - Type definitions
     * @param {Array} results - current set of accumulated types
     * @returns {Array} - Set of all types found in the type definition
     */
    findTypeDependencies(primaryType, types, results = []) {
        [primaryType] = primaryType.match(/^\w*/u);
        if (results.includes(primaryType) || types[primaryType] === undefined) {
            return results;
        }
        results.push(primaryType);
        for (const field of types[primaryType]) {
            for (const dep of this.findTypeDependencies(field.type, types, results)) {
                !results.includes(dep) && results.push(dep);
            }
        }
        return results;
    },
    /**
     * Hashes an object
     *
     * @param {string} primaryType - Root type
     * @param {Object} data - Object to hash
     * @param {Object} types - Type definitions
     * @returns {Buffer} - Hash of an object
     */
    hashStruct(primaryType, data, types, useV4 = true) {
        return ethUtil.keccak(this.encodeData(primaryType, data, types, useV4));
    },
    /**
     * Hashes the type of an object
     *
     * @param {string} primaryType - Root type to hash
     * @param {Object} types - Type definitions
     * @returns {Buffer} - Hash of an object
     */
    hashType(primaryType, types) {
        return ethUtil.keccak(this.encodeType(primaryType, types));
    },
    /**
     * Removes properties from a message object that are not defined per EIP-712
     *
     * @param {Object} data - typed message object
     * @returns {Object} - typed message object with only allowed fields
     */
    sanitizeData(data) {
        const sanitizedData = {};
        for (const key in TYPED_MESSAGE_SCHEMA.properties) {
            if (data[key]) {
                sanitizedData[key] = data[key];
            }
        }
        if ('types' in sanitizedData) {
            sanitizedData.types = Object.assign({ EIP712Domain: [] }, sanitizedData.types);
        }
        return sanitizedData;
    },
    /**
     * Signs a typed message as per EIP-712 and returns its keccak hash
     *
     * @param {Object} typedData - Types message data to sign
     * @returns {Buffer} - keccak hash of the resulting signed message
     */
    sign(typedData, useV4 = true) {
        const sanitizedData = this.sanitizeData(typedData);
        const parts = [Buffer.from('1901', 'hex')];
        parts.push(this.hashStruct('EIP712Domain', sanitizedData.domain, sanitizedData.types, useV4));
        if (sanitizedData.primaryType !== 'EIP712Domain') {
            parts.push(this.hashStruct(sanitizedData.primaryType, sanitizedData.message, sanitizedData.types, useV4));
        }
        return ethUtil.keccak(Buffer.concat(parts));
    },
};
exports.TypedDataUtils = TypedDataUtils;
function concatSig(v, r, s) {
    const rSig = ethUtil.fromSigned(r);
    const sSig = ethUtil.fromSigned(s);
    const vSig = ethUtil.bufferToInt(v);
    const rStr = padWithZeroes(ethUtil.toUnsigned(rSig).toString('hex'), 64);
    const sStr = padWithZeroes(ethUtil.toUnsigned(sSig).toString('hex'), 64);
    const vStr = ethUtil.stripHexPrefix(ethUtil.intToHex(vSig));
    return ethUtil.addHexPrefix(rStr.concat(sStr, vStr)).toString('hex');
}
exports.concatSig = concatSig;
function normalize(input) {
    if (!input) {
        return undefined;
    }
    if (typeof input === 'number') {
        const buffer = ethUtil.toBuffer(input);
        input = ethUtil.bufferToHex(buffer);
    }
    if (typeof input !== 'string') {
        let msg = 'eth-sig-util.normalize() requires hex string or integer input.';
        msg += ` received ${typeof input}: ${input}`;
        throw new Error(msg);
    }
    return ethUtil.addHexPrefix(input.toLowerCase());
}
exports.normalize = normalize;
function personalSign(privateKey, msgParams) {
    const message = ethUtil.toBuffer(msgParams.data);
    const msgHash = ethUtil.hashPersonalMessage(message);
    const sig = ethUtil.ecsign(msgHash, privateKey);
    const serialized = ethUtil.bufferToHex(concatSig(sig.v, sig.r, sig.s));
    return serialized;
}
exports.personalSign = personalSign;
function recoverPersonalSignature(msgParams) {
    const publicKey = getPublicKeyFor(msgParams);
    const sender = ethUtil.publicToAddress(publicKey);
    const senderHex = ethUtil.bufferToHex(sender);
    return senderHex;
}
exports.recoverPersonalSignature = recoverPersonalSignature;
function extractPublicKey(msgParams) {
    const publicKey = getPublicKeyFor(msgParams);
    return `0x${publicKey.toString('hex')}`;
}
exports.extractPublicKey = extractPublicKey;
function externalTypedSignatureHash(typedData) {
    const hashBuffer = typedSignatureHash(typedData);
    return ethUtil.bufferToHex(hashBuffer);
}
exports.typedSignatureHash = externalTypedSignatureHash;
function signTypedDataLegacy(privateKey, msgParams) {
    const msgHash = typedSignatureHash(msgParams.data);
    const sig = ethUtil.ecsign(msgHash, privateKey);
    return ethUtil.bufferToHex(concatSig(sig.v, sig.r, sig.s));
}
exports.signTypedDataLegacy = signTypedDataLegacy;
function recoverTypedSignatureLegacy(msgParams) {
    const msgHash = typedSignatureHash(msgParams.data);
    const publicKey = recoverPublicKey(msgHash, msgParams.sig);
    const sender = ethUtil.publicToAddress(publicKey);
    return ethUtil.bufferToHex(sender);
}
exports.recoverTypedSignatureLegacy = recoverTypedSignatureLegacy;
function encrypt(receiverPublicKey, msgParams, version) {
    switch (version) {
        case 'x25519-xsalsa20-poly1305': {
            if (typeof msgParams.data !== 'string') {
                throw new Error('Cannot detect secret message, message params should be of the form {data: "secret message"} ');
            }
            // generate ephemeral keypair
            const ephemeralKeyPair = nacl.box.keyPair();
            // assemble encryption parameters - from string to UInt8
            let pubKeyUInt8Array;
            try {
                pubKeyUInt8Array = naclUtil.decodeBase64(receiverPublicKey);
            }
            catch (err) {
                throw new Error('Bad public key');
            }
            const msgParamsUInt8Array = naclUtil.decodeUTF8(msgParams.data);
            const nonce = nacl.randomBytes(nacl.box.nonceLength);
            // encrypt
            const encryptedMessage = nacl.box(msgParamsUInt8Array, nonce, pubKeyUInt8Array, ephemeralKeyPair.secretKey);
            // handle encrypted data
            const output = {
                version: 'x25519-xsalsa20-poly1305',
                nonce: naclUtil.encodeBase64(nonce),
                ephemPublicKey: naclUtil.encodeBase64(ephemeralKeyPair.publicKey),
                ciphertext: naclUtil.encodeBase64(encryptedMessage),
            };
            // return encrypted msg data
            return output;
        }
        default:
            throw new Error('Encryption type/version not supported');
    }
}
exports.encrypt = encrypt;
function encryptSafely(receiverPublicKey, msgParams, version) {
    const DEFAULT_PADDING_LENGTH = 2 ** 11;
    const NACL_EXTRA_BYTES = 16;
    const { data } = msgParams;
    if (!data) {
        throw new Error('Cannot encrypt empty msg.data');
    }
    if (typeof data === 'object' && 'toJSON' in data) {
        // remove toJSON attack vector
        // TODO, check all possible children
        throw new Error('Cannot encrypt with toJSON property.  Please remove toJSON property');
    }
    // add padding
    const dataWithPadding = {
        data,
        padding: '',
    };
    // calculate padding
    const dataLength = Buffer.byteLength(JSON.stringify(dataWithPadding), 'utf-8');
    const modVal = dataLength % DEFAULT_PADDING_LENGTH;
    let padLength = 0;
    // Only pad if necessary
    if (modVal > 0) {
        padLength = DEFAULT_PADDING_LENGTH - modVal - NACL_EXTRA_BYTES; // nacl extra bytes
    }
    dataWithPadding.padding = '0'.repeat(padLength);
    const paddedMsgParams = { data: JSON.stringify(dataWithPadding) };
    return encrypt(receiverPublicKey, paddedMsgParams, version);
}
exports.encryptSafely = encryptSafely;
function decrypt(encryptedData, receiverPrivateKey) {
    switch (encryptedData.version) {
        case 'x25519-xsalsa20-poly1305': {
            // string to buffer to UInt8Array
            const recieverPrivateKeyUint8Array = nacl_decodeHex(receiverPrivateKey);
            const recieverEncryptionPrivateKey = nacl.box.keyPair.fromSecretKey(recieverPrivateKeyUint8Array).secretKey;
            // assemble decryption parameters
            const nonce = naclUtil.decodeBase64(encryptedData.nonce);
            const ciphertext = naclUtil.decodeBase64(encryptedData.ciphertext);
            const ephemPublicKey = naclUtil.decodeBase64(encryptedData.ephemPublicKey);
            // decrypt
            const decryptedMessage = nacl.box.open(ciphertext, nonce, ephemPublicKey, recieverEncryptionPrivateKey);
            // return decrypted msg data
            let output;
            try {
                output = naclUtil.encodeUTF8(decryptedMessage);
            }
            catch (err) {
                throw new Error('Decryption failed.');
            }
            if (output) {
                return output;
            }
            throw new Error('Decryption failed.');
        }
        default:
            throw new Error('Encryption type/version not supported.');
    }
}
exports.decrypt = decrypt;
function decryptSafely(encryptedData, receiverPrivateKey) {
    const dataWithPadding = JSON.parse(decrypt(encryptedData, receiverPrivateKey));
    return dataWithPadding.data;
}
exports.decryptSafely = decryptSafely;
function getEncryptionPublicKey(privateKey) {
    const privateKeyUint8Array = nacl_decodeHex(privateKey);
    const encryptionPublicKey = nacl.box.keyPair.fromSecretKey(privateKeyUint8Array).publicKey;
    return naclUtil.encodeBase64(encryptionPublicKey);
}
exports.getEncryptionPublicKey = getEncryptionPublicKey;
/**
 * A generic entry point for all typed data methods to be passed, includes a version parameter.
 */
function signTypedMessage(privateKey, msgParams, version = 'V4') {
    switch (version) {
        case 'V1':
            return signTypedDataLegacy(privateKey, msgParams);
        case 'V3':
            return signTypedData(privateKey, msgParams);
        case 'V4':
        default:
            return signTypedData_v4(privateKey, msgParams);
    }
}
exports.signTypedMessage = signTypedMessage;
function recoverTypedMessage(msgParams, version = 'V4') {
    switch (version) {
        case 'V1':
            return recoverTypedSignatureLegacy(msgParams);
        case 'V3':
            return recoverTypedSignature(msgParams);
        case 'V4':
        default:
            return recoverTypedSignature_v4(msgParams);
    }
}
exports.recoverTypedMessage = recoverTypedMessage;
function signTypedData(privateKey, msgParams) {
    const message = TypedDataUtils.sign(msgParams.data, false);
    const sig = ethUtil.ecsign(message, privateKey);
    return ethUtil.bufferToHex(concatSig(sig.v, sig.r, sig.s));
}
exports.signTypedData = signTypedData;
function signTypedData_v4(privateKey, msgParams) {
    const message = TypedDataUtils.sign(msgParams.data);
    const sig = ethUtil.ecsign(message, privateKey);
    return ethUtil.bufferToHex(concatSig(sig.v, sig.r, sig.s));
}
exports.signTypedData_v4 = signTypedData_v4;
function recoverTypedSignature(msgParams) {
    const message = TypedDataUtils.sign(msgParams.data, false);
    const publicKey = recoverPublicKey(message, msgParams.sig);
    const sender = ethUtil.publicToAddress(publicKey);
    return ethUtil.bufferToHex(sender);
}
exports.recoverTypedSignature = recoverTypedSignature;
function recoverTypedSignature_v4(msgParams) {
    const message = TypedDataUtils.sign(msgParams.data);
    const publicKey = recoverPublicKey(message, msgParams.sig);
    const sender = ethUtil.publicToAddress(publicKey);
    return ethUtil.bufferToHex(sender);
}
exports.recoverTypedSignature_v4 = recoverTypedSignature_v4;
/**
 * @param typedData - Array of data along with types, as per EIP712.
 * @returns Buffer
 */
function typedSignatureHash(typedData) {
    const error = new Error('Expect argument to be non-empty array');
    if (typeof typedData !== 'object' ||
        !('length' in typedData) ||
        !typedData.length) {
        throw error;
    }
    const data = typedData.map(function (e) {
        return e.type === 'bytes' ? ethUtil.toBuffer(e.value) : e.value;
    });
    const types = typedData.map(function (e) {
        return e.type;
    });
    const schema = typedData.map(function (e) {
        if (!e.name) {
            throw error;
        }
        return `${e.type} ${e.name}`;
    });
    return ethAbi.soliditySHA3(['bytes32', 'bytes32'], [
        ethAbi.soliditySHA3(new Array(typedData.length).fill('string'), schema),
        ethAbi.soliditySHA3(types, data),
    ]);
}
function recoverPublicKey(hash, sig) {
    const signature = ethUtil.toBuffer(sig);
    const sigParams = ethUtil.fromRpcSig(signature);
    return ethUtil.ecrecover(hash, sigParams.v, sigParams.r, sigParams.s);
}
function getPublicKeyFor(msgParams) {
    const message = ethUtil.toBuffer(msgParams.data);
    const msgHash = ethUtil.hashPersonalMessage(message);
    return recoverPublicKey(msgHash, msgParams.sig);
}
function padWithZeroes(number, length) {
    let myString = `${number}`;
    while (myString.length < length) {
        myString = `0${myString}`;
    }
    return myString;
}
// converts hex strings to the Uint8Array format used by nacl
function nacl_decodeHex(msgHex) {
    const msgBase64 = Buffer.from(msgHex, 'hex').toString('base64');
    return naclUtil.decodeBase64(msgBase64);
}
//# sourceMappingURL=index.js.map