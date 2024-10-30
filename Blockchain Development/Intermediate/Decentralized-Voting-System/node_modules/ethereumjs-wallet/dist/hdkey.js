"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const hdkey_1 = require("ethereum-cryptography/hdkey");
class EthereumHDKey {
    constructor(_hdkey) {
        this._hdkey = _hdkey;
    }
    /**
     * Creates an instance based on a seed.
     *
     * For the seed we suggest to use [bip39](https://npmjs.org/package/bip39) to
     * create one from a BIP39 mnemonic.
     */
    static fromMasterSeed(seedBuffer) {
        return new EthereumHDKey(hdkey_1.HDKey.fromMasterSeed(seedBuffer));
    }
    /**
     * Create an instance based on a BIP32 extended private or public key.
     */
    static fromExtendedKey(base58Key) {
        return new EthereumHDKey(hdkey_1.HDKey.fromExtendedKey(base58Key));
    }
    /**
     * Returns a BIP32 extended private key (xprv)
     */
    privateExtendedKey() {
        if (!this._hdkey.privateExtendedKey) {
            throw new Error('This is a public key only wallet');
        }
        return this._hdkey.privateExtendedKey;
    }
    /**
     * Return a BIP32 extended public key (xpub)
     */
    publicExtendedKey() {
        return this._hdkey.publicExtendedKey;
    }
    /**
     * Derives a node based on a path (e.g. m/44'/0'/0/1)
     */
    derivePath(path) {
        return new EthereumHDKey(this._hdkey.derive(path));
    }
    /**
     * Derive a node based on a child index
     */
    deriveChild(index) {
        return new EthereumHDKey(this._hdkey.deriveChild(index));
    }
    /**
     * Return a `Wallet` instance as seen above
     */
    getWallet() {
        if (this._hdkey._privateKey) {
            return index_1.default.fromPrivateKey(this._hdkey._privateKey);
        }
        return index_1.default.fromPublicKey(this._hdkey._publicKey, true);
    }
}
exports.default = EthereumHDKey;
//# sourceMappingURL=hdkey.js.map