/// <reference types="node" />
import Wallet from './index';
export default class EthereumHDKey {
    private readonly _hdkey?;
    /**
     * Creates an instance based on a seed.
     *
     * For the seed we suggest to use [bip39](https://npmjs.org/package/bip39) to
     * create one from a BIP39 mnemonic.
     */
    static fromMasterSeed(seedBuffer: Buffer): EthereumHDKey;
    /**
     * Create an instance based on a BIP32 extended private or public key.
     */
    static fromExtendedKey(base58Key: string): EthereumHDKey;
    constructor(_hdkey?: any);
    /**
     * Returns a BIP32 extended private key (xprv)
     */
    privateExtendedKey(): Buffer;
    /**
     * Return a BIP32 extended public key (xpub)
     */
    publicExtendedKey(): Buffer;
    /**
     * Derives a node based on a path (e.g. m/44'/0'/0/1)
     */
    derivePath(path: string): EthereumHDKey;
    /**
     * Derive a node based on a child index
     */
    deriveChild(index: number): EthereumHDKey;
    /**
     * Return a `Wallet` instance as seen above
     */
    getWallet(): Wallet;
}
