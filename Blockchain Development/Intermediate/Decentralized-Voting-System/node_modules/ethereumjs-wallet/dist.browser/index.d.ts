/// <reference types="node" />
export { default as hdkey } from './hdkey';
export { default as thirdparty } from './thirdparty';
interface V3Params {
    kdf: string;
    cipher: string;
    salt: string | Buffer;
    iv: string | Buffer;
    uuid: string | Buffer;
    dklen: number;
    c: number;
    n: number;
    r: number;
    p: number;
}
interface ScryptKDFParamsOut {
    dklen: number;
    n: number;
    p: number;
    r: number;
    salt: string;
}
interface PBKDFParamsOut {
    c: number;
    dklen: number;
    prf: string;
    salt: string;
}
declare type KDFParamsOut = ScryptKDFParamsOut | PBKDFParamsOut;
interface V1Keystore {
    Address: string;
    Crypto: {
        CipherText: string;
        IV: string;
        KeyHeader: {
            Kdf: string;
            KdfParams: {
                DkLen: number;
                N: number;
                P: number;
                R: number;
                SaltLen: number;
            };
            Version: string;
        };
        MAC: string;
        Salt: string;
    };
    Id: string;
    Version: string;
}
interface V3Keystore {
    crypto: {
        cipher: string;
        cipherparams: {
            iv: string;
        };
        ciphertext: string;
        kdf: string;
        kdfparams: KDFParamsOut;
        mac: string;
    };
    id: string;
    version: number;
}
interface EthSaleKeystore {
    encseed: string;
    ethaddr: string;
    btcaddr: string;
    email: string;
}
export default class Wallet {
    private readonly privateKey?;
    private publicKey;
    constructor(privateKey?: Buffer | undefined, publicKey?: Buffer | undefined);
    /**
     * Create an instance based on a new random key.
     *
     * @param icapDirect setting this to `true` will generate an address suitable for the `ICAP Direct mode`
     */
    static generate(icapDirect?: boolean): Wallet;
    /**
     * Create an instance where the address is valid against the supplied pattern (**this will be very slow**)
     */
    static generateVanityAddress(pattern: RegExp | string): Wallet;
    /**
     * Create an instance based on a public key (certain methods will not be available)
     *
     * This method only accepts uncompressed Ethereum-style public keys, unless
     * the `nonStrict` flag is set to true.
     */
    static fromPublicKey(publicKey: Buffer, nonStrict?: boolean): Wallet;
    /**
     * Create an instance based on a BIP32 extended public key (xpub)
     */
    static fromExtendedPublicKey(extendedPublicKey: string): Wallet;
    /**
     * Create an instance based on a raw private key
     */
    static fromPrivateKey(privateKey: Buffer): Wallet;
    /**
     * Create an instance based on a BIP32 extended private key (xprv)
     */
    static fromExtendedPrivateKey(extendedPrivateKey: string): Wallet;
    /**
     * Import a wallet (Version 1 of the Ethereum wallet format).
     *
     * @param input A JSON serialized string, or an object representing V1 Keystore.
     * @param password The keystore password.
     */
    static fromV1(input: string | V1Keystore, password: string): Promise<Wallet>;
    /**
     * Import a wallet (Version 3 of the Ethereum wallet format). Set `nonStrict` true to accept files with mixed-caps.
     *
     * @param input A JSON serialized string, or an object representing V3 Keystore.
     * @param password The keystore password.
     */
    static fromV3(input: string | V3Keystore, password: string, nonStrict?: boolean): Promise<Wallet>;
    static fromEthSale(input: string | EthSaleKeystore, password: string): Wallet;
    /**
     * Returns the wallet's public key.
     */
    private get pubKey();
    /**
     * Returns the wallet's private key.
     */
    private get privKey();
    /**
     * Returns the wallet's private key.
     *
     */
    getPrivateKey(): Buffer;
    getPrivateKeyString(): string;
    /**
     * Returns the wallet's public key.
     */
    getPublicKey(): Buffer;
    /**
     * Returns the wallet's public key as a "0x" prefixed hex string
     */
    getPublicKeyString(): string;
    /**
     * Returns the wallet's address.
     */
    getAddress(): Buffer;
    /**
     * Returns the wallet's address as a "0x" prefixed hex string
     */
    getAddressString(): string;
    /**
     * Returns the wallet's private key as a "0x" prefixed hex string checksummed
     * according to [EIP 55](https://github.com/ethereum/EIPs/issues/55).
     */
    getChecksumAddressString(): string;
    /**
     * Returns an Etherem Version 3 Keystore Format object representing the wallet
     *
     * @param password The password used to encrypt the Keystore.
     * @param opts The options for the keystore. See [its spec](https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition) for more info.
     */
    toV3(password: string, opts?: Partial<V3Params>): Promise<V3Keystore>;
    /**
     * Return the suggested filename for V3 keystores.
     */
    getV3Filename(timestamp?: number): string;
    toV3String(password: string, opts?: Partial<V3Params>): Promise<string>;
}
