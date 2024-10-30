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
exports.fromQuorumWallet = exports.fromKryptoKit = exports.fromEtherCamp = exports.fromEtherWallet = void 0;
var crypto = __importStar(require("crypto"));
var ethereumjs_util_1 = require("ethereumjs-util");
var scrypt_js_1 = require("scrypt-js");
var index_1 = __importDefault(require("./index"));
var utf8 = require('utf8');
var aesjs = require('aes-js');
function runCipherBuffer(cipher, data) {
    return Buffer.concat([cipher.update(data), cipher.final()]);
}
var evpKdfDefaults = {
    count: 1,
    keysize: 16,
    ivsize: 16,
    digest: 'md5',
};
function mergeEvpKdfOptsWithDefaults(opts) {
    if (!opts) {
        return evpKdfDefaults;
    }
    return {
        count: opts.count || evpKdfDefaults.count,
        keysize: opts.keysize || evpKdfDefaults.keysize,
        ivsize: opts.ivsize || evpKdfDefaults.ivsize,
        digest: opts.digest || evpKdfDefaults.digest,
    };
}
/*
 * opts:
 * - digest - digest algorithm, defaults to md5
 * - count - hash iterations
 * - keysize - desired key size
 * - ivsize - desired IV size
 *
 * Algorithm form https://www.openssl.org/docs/manmaster/crypto/EVP_BytesToKey.html
 *
 * FIXME: not optimised at all
 */
function evp_kdf(data, salt, opts) {
    var params = mergeEvpKdfOptsWithDefaults(opts);
    // A single EVP iteration, returns `D_i`, where block equlas to `D_(i-1)`
    function iter(block) {
        var hash = crypto.createHash(params.digest);
        hash.update(block);
        hash.update(data);
        hash.update(salt);
        block = hash.digest();
        for (var i_1 = 1, len = params.count; i_1 < len; i_1++) {
            hash = crypto.createHash(params.digest);
            hash.update(block);
            block = hash.digest();
        }
        return block;
    }
    var ret = [];
    var i = 0;
    while (Buffer.concat(ret).length < params.keysize + params.ivsize) {
        ret[i] = iter(i === 0 ? Buffer.alloc(0) : ret[i - 1]);
        i++;
    }
    var tmp = Buffer.concat(ret);
    return {
        key: tmp.slice(0, params.keysize),
        iv: tmp.slice(params.keysize, params.keysize + params.ivsize),
    };
}
// http://stackoverflow.com/questions/25288311/cryptojs-aes-pattern-always-ends-with
function decodeCryptojsSalt(input) {
    var ciphertext = Buffer.from(input, 'base64');
    if (ciphertext.slice(0, 8).toString() === 'Salted__') {
        return {
            salt: ciphertext.slice(8, 16),
            ciphertext: ciphertext.slice(16),
        };
    }
    return { ciphertext: ciphertext };
}
/*
 * Third Party API: Import a wallet generated by EtherWallet
 * This wallet format is created by https://github.com/SilentCicero/ethereumjs-accounts
 * and used on https://www.myetherwallet.com/
 */
function fromEtherWallet(input, password) {
    var json = typeof input === 'object' ? input : JSON.parse(input);
    var privateKey;
    if (!json.locked) {
        if (json.private.length !== 64) {
            throw new Error('Invalid private key length');
        }
        privateKey = Buffer.from(json.private, 'hex');
    }
    else {
        if (typeof password !== 'string') {
            throw new Error('Password required');
        }
        if (password.length < 7) {
            throw new Error('Password must be at least 7 characters');
        }
        // the "encrypted" version has the low 4 bytes
        // of the hash of the address appended
        var hash = json.encrypted ? json.private.slice(0, 128) : json.private;
        // decode openssl ciphertext + salt encoding
        var cipher = decodeCryptojsSalt(hash);
        if (!cipher.salt) {
            throw new Error('Unsupported EtherWallet key format');
        }
        // derive key/iv using OpenSSL EVP as implemented in CryptoJS
        var evp = evp_kdf(Buffer.from(password), cipher.salt, { keysize: 32, ivsize: 16 });
        var decipher = crypto.createDecipheriv('aes-256-cbc', evp.key, evp.iv);
        privateKey = runCipherBuffer(decipher, Buffer.from(cipher.ciphertext));
        // NOTE: yes, they've run it through UTF8
        privateKey = Buffer.from(utf8.decode(privateKey.toString()), 'hex');
    }
    var wallet = new index_1.default(privateKey);
    if (wallet.getAddressString() !== json.address) {
        throw new Error('Invalid private key or address');
    }
    return wallet;
}
exports.fromEtherWallet = fromEtherWallet;
/**
 * Third Party API: Import a brain wallet used by Ether.Camp
 */
function fromEtherCamp(passphrase) {
    return new index_1.default((0, ethereumjs_util_1.keccak256)(Buffer.from(passphrase)));
}
exports.fromEtherCamp = fromEtherCamp;
/**
 * Third Party API: Import a wallet from a KryptoKit seed
 */
function fromKryptoKit(entropy, password) {
    return __awaiter(this, void 0, void 0, function () {
        function kryptoKitBrokenScryptSeed(buf) {
            // js-scrypt calls `Buffer.from(String(salt), 'utf8')` on the seed even though it is a buffer
            //
            // The `buffer`` implementation used does the below transformation (doesn't matches the current version):
            // https://github.com/feross/buffer/blob/67c61181b938b17d10dbfc0a545f713b8bd59de8/index.js
            function decodeUtf8Char(str) {
                try {
                    return decodeURIComponent(str);
                }
                catch (err) {
                    return String.fromCharCode(0xfffd); // UTF 8 invalid char
                }
            }
            var res = '', tmp = '';
            for (var i = 0; i < buf.length; i++) {
                if (buf[i] <= 0x7f) {
                    res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
                    tmp = '';
                }
                else {
                    tmp += '%' + buf[i].toString(16);
                }
            }
            return Buffer.from(res + decodeUtf8Char(tmp));
        }
        var type, privateKey, encryptedSeed, checksum, salt, aesKey, decipher;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (entropy[0] === '#') {
                        entropy = entropy.slice(1);
                    }
                    type = entropy[0];
                    entropy = entropy.slice(1);
                    if (!(type === 'd')) return [3 /*break*/, 1];
                    privateKey = (0, ethereumjs_util_1.sha256)((0, ethereumjs_util_1.toBuffer)(entropy));
                    return [3 /*break*/, 4];
                case 1:
                    if (!(type === 'q')) return [3 /*break*/, 3];
                    if (typeof password !== 'string') {
                        throw new Error('Password required');
                    }
                    encryptedSeed = (0, ethereumjs_util_1.sha256)(Buffer.from(entropy.slice(0, 30)));
                    checksum = entropy.slice(30, 46);
                    salt = kryptoKitBrokenScryptSeed(encryptedSeed);
                    return [4 /*yield*/, (0, scrypt_js_1.scrypt)(Buffer.from(password, 'utf8'), salt, 16384, 8, 1, 32)
                        /* FIXME: try to use `crypto` instead of `aesjs`
                    
                        // NOTE: ECB doesn't use the IV, so it can be anything
                        var decipher = crypto.createDecipheriv("aes-256-ecb", aesKey, Buffer.from(0))
                    
                        // FIXME: this is a clear abuse, but seems to match how ECB in aesjs works
                        privKey = Buffer.concat([
                          decipher.update(encryptedSeed).slice(0, 16),
                          decipher.update(encryptedSeed).slice(0, 16),
                        ])
                        */
                    ];
                case 2:
                    aesKey = _a.sent();
                    decipher = new aesjs.ModeOfOperation.ecb(aesKey);
                    /* decrypt returns an Uint8Array, perhaps there is a better way to concatenate */
                    privateKey = Buffer.concat([
                        Buffer.from(decipher.decrypt(encryptedSeed.slice(0, 16))),
                        Buffer.from(decipher.decrypt(encryptedSeed.slice(16, 32))),
                    ]);
                    if (checksum.length > 0) {
                        if (checksum !== (0, ethereumjs_util_1.sha256)((0, ethereumjs_util_1.sha256)(privateKey)).slice(0, 8).toString('hex')) {
                            throw new Error('Failed to decrypt input - possibly invalid passphrase');
                        }
                    }
                    return [3 /*break*/, 4];
                case 3: throw new Error('Unsupported or invalid entropy type');
                case 4: return [2 /*return*/, new index_1.default(privateKey)];
            }
        });
    });
}
exports.fromKryptoKit = fromKryptoKit;
/**
 * Third Party API: Import a brain wallet used by Quorum Wallet
 */
function fromQuorumWallet(passphrase, userid) {
    if (passphrase.length < 10) {
        throw new Error('Passphrase must be at least 10 characters');
    }
    if (userid.length < 10) {
        throw new Error('User id must be at least 10 characters');
    }
    var merged = passphrase + userid;
    var seed = crypto.pbkdf2Sync(merged, merged, 2000, 32, 'sha256');
    return new index_1.default(seed);
}
exports.fromQuorumWallet = fromQuorumWallet;
var Thirdparty = {
    fromEtherWallet: fromEtherWallet,
    fromEtherCamp: fromEtherCamp,
    fromKryptoKit: fromKryptoKit,
    fromQuorumWallet: fromQuorumWallet,
};
exports.default = Thirdparty;
//# sourceMappingURL=thirdparty.js.map