"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.thirdparty = exports.hdkey = void 0;
var crypto = __importStar(require("crypto"));
var ethereumjs_util_1 = require("ethereumjs-util");
var scrypt_js_1 = require("scrypt-js");
var hdkey_1 = require("./hdkey");
Object.defineProperty(exports, "hdkey", { enumerable: true, get: function () { return __importDefault(hdkey_1).default; } });
var thirdparty_1 = require("./thirdparty");
Object.defineProperty(exports, "thirdparty", { enumerable: true, get: function () { return __importDefault(thirdparty_1).default; } });
var bs58check = require('bs58check');
var randomBytes = require('randombytes');
var uuidv4 = require('uuid').v4;
function validateHexString(paramName, str, length) {
    if (str.toLowerCase().startsWith('0x')) {
        str = str.slice(2);
    }
    if (!str && !length) {
        return str;
    }
    if (length % 2) {
        throw new Error("Invalid length argument, must be an even number");
    }
    if (typeof length === 'number' && str.length !== length) {
        throw new Error("Invalid " + paramName + ", string must be " + length + " hex characters");
    }
    if (!/^([0-9a-f]{2})+$/i.test(str)) {
        var howMany = typeof length === 'number' ? length : 'empty or a non-zero even number of';
        throw new Error("Invalid " + paramName + ", string must be " + howMany + " hex characters");
    }
    return str;
}
function validateBuffer(paramName, buff, length) {
    if (!Buffer.isBuffer(buff)) {
        var howManyHex = typeof length === 'number' ? "" + length * 2 : 'empty or a non-zero even number of';
        var howManyBytes = typeof length === 'number' ? " (" + length + " bytes)" : '';
        throw new Error("Invalid " + paramName + ", must be a string (" + howManyHex + " hex characters) or buffer" + howManyBytes);
    }
    if (typeof length === 'number' && buff.length !== length) {
        throw new Error("Invalid " + paramName + ", buffer must be " + length + " bytes");
    }
    return buff;
}
function mergeToV3ParamsWithDefaults(params) {
    var v3Defaults = {
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        salt: randomBytes(32),
        iv: randomBytes(16),
        uuid: randomBytes(16),
        dklen: 32,
        c: 262144,
        n: 262144,
        r: 8,
        p: 1,
    };
    if (!params) {
        return v3Defaults;
    }
    if (typeof params.salt === 'string') {
        params.salt = Buffer.from(validateHexString('salt', params.salt), 'hex');
    }
    if (typeof params.iv === 'string') {
        params.iv = Buffer.from(validateHexString('iv', params.iv, 32), 'hex');
    }
    if (typeof params.uuid === 'string') {
        params.uuid = Buffer.from(validateHexString('uuid', params.uuid, 32), 'hex');
    }
    if (params.salt) {
        validateBuffer('salt', params.salt);
    }
    if (params.iv) {
        validateBuffer('iv', params.iv, 16);
    }
    if (params.uuid) {
        validateBuffer('uuid', params.uuid, 16);
    }
    return __assign(__assign({}, v3Defaults), params);
}
function kdfParamsForPBKDF(opts) {
    return {
        dklen: opts.dklen,
        salt: opts.salt,
        c: opts.c,
        prf: 'hmac-sha256',
    };
}
function kdfParamsForScrypt(opts) {
    return {
        dklen: opts.dklen,
        salt: opts.salt,
        n: opts.n,
        r: opts.r,
        p: opts.p,
    };
}
// wallet implementation
var Wallet = /** @class */ (function () {
    function Wallet(privateKey, publicKey) {
        if (publicKey === void 0) { publicKey = undefined; }
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        if (privateKey && publicKey) {
            throw new Error('Cannot supply both a private and a public key to the constructor');
        }
        if (privateKey && !(0, ethereumjs_util_1.isValidPrivate)(privateKey)) {
            throw new Error('Private key does not satisfy the curve requirements (ie. it is invalid)');
        }
        if (publicKey && !(0, ethereumjs_util_1.isValidPublic)(publicKey)) {
            throw new Error('Invalid public key');
        }
    }
    // static methods
    /**
     * Create an instance based on a new random key.
     *
     * @param icapDirect setting this to `true` will generate an address suitable for the `ICAP Direct mode`
     */
    Wallet.generate = function (icapDirect) {
        if (icapDirect === void 0) { icapDirect = false; }
        if (icapDirect) {
            var max = new ethereumjs_util_1.BN('088f924eeceeda7fe92e1f5b0fffffffffffffff', 16);
            while (true) {
                var privateKey = randomBytes(32);
                if (new ethereumjs_util_1.BN((0, ethereumjs_util_1.privateToAddress)(privateKey)).lte(max)) {
                    return new Wallet(privateKey);
                }
            }
        }
        else {
            return new Wallet(randomBytes(32));
        }
    };
    /**
     * Create an instance where the address is valid against the supplied pattern (**this will be very slow**)
     */
    Wallet.generateVanityAddress = function (pattern) {
        if (!(pattern instanceof RegExp)) {
            pattern = new RegExp(pattern);
        }
        while (true) {
            var privateKey = randomBytes(32);
            var address = (0, ethereumjs_util_1.privateToAddress)(privateKey);
            if (pattern.test(address.toString('hex'))) {
                return new Wallet(privateKey);
            }
        }
    };
    /**
     * Create an instance based on a public key (certain methods will not be available)
     *
     * This method only accepts uncompressed Ethereum-style public keys, unless
     * the `nonStrict` flag is set to true.
     */
    Wallet.fromPublicKey = function (publicKey, nonStrict) {
        if (nonStrict === void 0) { nonStrict = false; }
        if (nonStrict) {
            publicKey = (0, ethereumjs_util_1.importPublic)(publicKey);
        }
        return new Wallet(undefined, publicKey);
    };
    /**
     * Create an instance based on a BIP32 extended public key (xpub)
     */
    Wallet.fromExtendedPublicKey = function (extendedPublicKey) {
        if (extendedPublicKey.slice(0, 4) !== 'xpub') {
            throw new Error('Not an extended public key');
        }
        var publicKey = bs58check.decode(extendedPublicKey).slice(45);
        // Convert to an Ethereum public key
        return Wallet.fromPublicKey(publicKey, true);
    };
    /**
     * Create an instance based on a raw private key
     */
    Wallet.fromPrivateKey = function (privateKey) {
        return new Wallet(privateKey);
    };
    /**
     * Create an instance based on a BIP32 extended private key (xprv)
     */
    Wallet.fromExtendedPrivateKey = function (extendedPrivateKey) {
        if (extendedPrivateKey.slice(0, 4) !== 'xprv') {
            throw new Error('Not an extended private key');
        }
        var tmp = bs58check.decode(extendedPrivateKey);
        if (tmp[45] !== 0) {
            throw new Error('Invalid extended private key');
        }
        return Wallet.fromPrivateKey(tmp.slice(46));
    };
    /**
     * Import a wallet (Version 1 of the Ethereum wallet format).
     *
     * @param input A JSON serialized string, or an object representing V1 Keystore.
     * @param password The keystore password.
     */
    Wallet.fromV1 = function (input, password) {
        return __awaiter(this, void 0, void 0, function () {
            var json, kdfparams, derivedKey, ciphertext, mac, decipher, seed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = typeof input === 'object' ? input : JSON.parse(input);
                        if (json.Version !== '1') {
                            throw new Error('Not a V1 Wallet');
                        }
                        if (json.Crypto.KeyHeader.Kdf !== 'scrypt') {
                            throw new Error('Unsupported key derivation scheme');
                        }
                        kdfparams = json.Crypto.KeyHeader.KdfParams;
                        return [4 /*yield*/, (0, scrypt_js_1.scrypt)(Buffer.from(password), Buffer.from(json.Crypto.Salt, 'hex'), kdfparams.N, kdfparams.R, kdfparams.P, kdfparams.DkLen)];
                    case 1:
                        derivedKey = _a.sent();
                        ciphertext = Buffer.from(json.Crypto.CipherText, 'hex');
                        mac = (0, ethereumjs_util_1.keccak256)(Buffer.concat([derivedKey.slice(16, 32), ciphertext]));
                        if (mac.toString('hex') !== json.Crypto.MAC) {
                            throw new Error('Key derivation failed - possibly wrong passphrase');
                        }
                        decipher = crypto.createDecipheriv('aes-128-cbc', (0, ethereumjs_util_1.keccak256)(derivedKey.slice(0, 16)).slice(0, 16), Buffer.from(json.Crypto.IV, 'hex'));
                        seed = runCipherBuffer(decipher, ciphertext);
                        return [2 /*return*/, new Wallet(seed)];
                }
            });
        });
    };
    /**
     * Import a wallet (Version 3 of the Ethereum wallet format). Set `nonStrict` true to accept files with mixed-caps.
     *
     * @param input A JSON serialized string, or an object representing V3 Keystore.
     * @param password The keystore password.
     */
    Wallet.fromV3 = function (input, password, nonStrict) {
        if (nonStrict === void 0) { nonStrict = false; }
        return __awaiter(this, void 0, void 0, function () {
            var json, derivedKey, kdfparams, ciphertext, mac, decipher, seed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = typeof input === 'object' ? input : JSON.parse(nonStrict ? input.toLowerCase() : input);
                        if (json.version !== 3) {
                            throw new Error('Not a V3 wallet');
                        }
                        if (!(json.crypto.kdf === 'scrypt')) return [3 /*break*/, 2];
                        kdfparams = json.crypto.kdfparams;
                        return [4 /*yield*/, (0, scrypt_js_1.scrypt)(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen)];
                    case 1:
                        // FIXME: support progress reporting callback
                        derivedKey = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (json.crypto.kdf === 'pbkdf2') {
                            kdfparams = json.crypto.kdfparams;
                            if (kdfparams.prf !== 'hmac-sha256') {
                                throw new Error('Unsupported parameters to PBKDF2');
                            }
                            derivedKey = crypto.pbkdf2Sync(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256');
                        }
                        else {
                            throw new Error('Unsupported key derivation scheme');
                        }
                        _a.label = 3;
                    case 3:
                        ciphertext = Buffer.from(json.crypto.ciphertext, 'hex');
                        mac = (0, ethereumjs_util_1.keccak256)(Buffer.concat([Buffer.from(derivedKey.slice(16, 32)), ciphertext]));
                        if (mac.toString('hex') !== json.crypto.mac) {
                            throw new Error('Key derivation failed - possibly wrong passphrase');
                        }
                        decipher = crypto.createDecipheriv(json.crypto.cipher, derivedKey.slice(0, 16), Buffer.from(json.crypto.cipherparams.iv, 'hex'));
                        seed = runCipherBuffer(decipher, ciphertext);
                        return [2 /*return*/, new Wallet(seed)];
                }
            });
        });
    };
    /*
     * Import an Ethereum Pre Sale wallet.
     * Based on https://github.com/ethereum/pyethsaletool/blob/master/pyethsaletool.py
     * JSON fields: encseed, ethaddr, btcaddr, email
     *
     * @param input A JSON serialized string, or an object representing EthSale Keystore.
     * @param password The keystore password.
     */
    Wallet.fromEthSale = function (input, password) {
        var json = typeof input === 'object' ? input : JSON.parse(input);
        var encseed = Buffer.from(json.encseed, 'hex');
        // key derivation
        var derivedKey = crypto.pbkdf2Sync(password, password, 2000, 32, 'sha256').slice(0, 16);
        // seed decoding (IV is first 16 bytes)
        // NOTE: crypto (derived from openssl) when used with aes-*-cbc will handle PKCS#7 padding internally
        //       see also http://stackoverflow.com/a/31614770/4964819
        var decipher = crypto.createDecipheriv('aes-128-cbc', derivedKey, encseed.slice(0, 16));
        var seed = runCipherBuffer(decipher, encseed.slice(16));
        var wallet = new Wallet((0, ethereumjs_util_1.keccak256)(seed));
        if (wallet.getAddress().toString('hex') !== json.ethaddr) {
            throw new Error('Decoded key mismatch - possibly wrong passphrase');
        }
        return wallet;
    };
    Object.defineProperty(Wallet.prototype, "pubKey", {
        // private getters
        /**
         * Returns the wallet's public key.
         */
        get: function () {
            if (!keyExists(this.publicKey)) {
                this.publicKey = (0, ethereumjs_util_1.privateToPublic)(this.privateKey);
            }
            return this.publicKey;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wallet.prototype, "privKey", {
        /**
         * Returns the wallet's private key.
         */
        get: function () {
            if (!keyExists(this.privateKey)) {
                throw new Error('This is a public key only wallet');
            }
            return this.privateKey;
        },
        enumerable: false,
        configurable: true
    });
    // public instance methods
    /**
     * Returns the wallet's private key.
     *
     */
    // tslint:disable-next-line
    Wallet.prototype.getPrivateKey = function () {
        return this.privKey;
    };
    Wallet.prototype.getPrivateKeyString = function () {
        return (0, ethereumjs_util_1.bufferToHex)(this.privKey);
    };
    /**
     * Returns the wallet's public key.
     */
    // tslint:disable-next-line
    Wallet.prototype.getPublicKey = function () {
        return this.pubKey;
    };
    /**
     * Returns the wallet's public key as a "0x" prefixed hex string
     */
    Wallet.prototype.getPublicKeyString = function () {
        return (0, ethereumjs_util_1.bufferToHex)(this.getPublicKey());
    };
    /**
     * Returns the wallet's address.
     */
    Wallet.prototype.getAddress = function () {
        return (0, ethereumjs_util_1.publicToAddress)(this.pubKey);
    };
    /**
     * Returns the wallet's address as a "0x" prefixed hex string
     */
    Wallet.prototype.getAddressString = function () {
        return (0, ethereumjs_util_1.bufferToHex)(this.getAddress());
    };
    /**
     * Returns the wallet's private key as a "0x" prefixed hex string checksummed
     * according to [EIP 55](https://github.com/ethereum/EIPs/issues/55).
     */
    Wallet.prototype.getChecksumAddressString = function () {
        return (0, ethereumjs_util_1.toChecksumAddress)(this.getAddressString());
    };
    /**
     * Returns an Etherem Version 3 Keystore Format object representing the wallet
     *
     * @param password The password used to encrypt the Keystore.
     * @param opts The options for the keystore. See [its spec](https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition) for more info.
     */
    Wallet.prototype.toV3 = function (password, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var v3Params, kdfParams, derivedKey, _a, cipher, ciphertext, mac;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!keyExists(this.privateKey)) {
                            throw new Error('This is a public key only wallet');
                        }
                        v3Params = mergeToV3ParamsWithDefaults(opts);
                        _a = v3Params.kdf;
                        switch (_a) {
                            case "pbkdf2" /* PBKDF */: return [3 /*break*/, 1];
                            case "scrypt" /* Scrypt */: return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        kdfParams = kdfParamsForPBKDF(v3Params);
                        derivedKey = crypto.pbkdf2Sync(Buffer.from(password), kdfParams.salt, kdfParams.c, kdfParams.dklen, 'sha256');
                        return [3 /*break*/, 5];
                    case 2:
                        kdfParams = kdfParamsForScrypt(v3Params);
                        return [4 /*yield*/, (0, scrypt_js_1.scrypt)(Buffer.from(password), kdfParams.salt, kdfParams.n, kdfParams.r, kdfParams.p, kdfParams.dklen)];
                    case 3:
                        // FIXME: support progress reporting callback
                        derivedKey = _b.sent();
                        return [3 /*break*/, 5];
                    case 4: throw new Error('Unsupported kdf');
                    case 5:
                        cipher = crypto.createCipheriv(v3Params.cipher, derivedKey.slice(0, 16), v3Params.iv);
                        if (!cipher) {
                            throw new Error('Unsupported cipher');
                        }
                        ciphertext = runCipherBuffer(cipher, this.privKey);
                        mac = (0, ethereumjs_util_1.keccak256)(Buffer.concat([Buffer.from(derivedKey.slice(16, 32)), Buffer.from(ciphertext)]));
                        return [2 /*return*/, {
                                version: 3,
                                id: uuidv4({ random: v3Params.uuid }),
                                // @ts-ignore - the official V3 keystore spec omits the address key
                                address: this.getAddress().toString('hex'),
                                crypto: {
                                    ciphertext: ciphertext.toString('hex'),
                                    cipherparams: { iv: v3Params.iv.toString('hex') },
                                    cipher: v3Params.cipher,
                                    kdf: v3Params.kdf,
                                    kdfparams: __assign(__assign({}, kdfParams), { salt: kdfParams.salt.toString('hex') }),
                                    mac: mac.toString('hex'),
                                },
                            }];
                }
            });
        });
    };
    /**
     * Return the suggested filename for V3 keystores.
     */
    Wallet.prototype.getV3Filename = function (timestamp) {
        /*
         * We want a timestamp like 2016-03-15T17-11-33.007598288Z. Date formatting
         * is a pain in Javascript, everbody knows that. We could use moment.js,
         * but decide to do it manually in order to save space.
         *
         * toJSON() returns a pretty close version, so let's use it. It is not UTC though,
         * but does it really matter?
         *
         * Alternative manual way with padding and Date fields: http://stackoverflow.com/a/7244288/4964819
         *
         */
        var ts = timestamp ? new Date(timestamp) : new Date();
        return ['UTC--', ts.toJSON().replace(/:/g, '-'), '--', this.getAddress().toString('hex')].join('');
    };
    Wallet.prototype.toV3String = function (password, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).stringify;
                        return [4 /*yield*/, this.toV3(password, opts)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    return Wallet;
}());
exports.default = Wallet;
// helpers
function runCipherBuffer(cipher, data) {
    return Buffer.concat([cipher.update(data), cipher.final()]);
}
function keyExists(k) {
    return k !== undefined && k !== null;
}
//# sourceMappingURL=index.js.map