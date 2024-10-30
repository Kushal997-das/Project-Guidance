export declare type MnemonicPhrase = string;
export declare type MnemonicPassword = string;
export interface Mnemonic {
    phrase: MnemonicPhrase;
    password?: MnemonicPassword;
}
import type { Provider as LegacyProvider } from "web3/providers";
declare type Eip1193Provider = {
    request: (options: {
        method: string;
        params?: unknown[] | object;
    }) => Promise<any>;
};
export declare type PrivateKey = string;
export declare type Provider = LegacyProvider | Eip1193Provider;
export declare type ProviderUrl = string;
export declare type ProviderOrUrl = Provider | ProviderUrl;
export declare type AddressIndex = number;
export declare type NumberOfAddresses = number;
export declare type PollingInterval = number;
export declare type ShareNonce = boolean;
export declare type DerivationPath = string;
export declare type ChainId = number;
export declare type Hardfork = string;
export declare type ChainSettings = {
    hardfork?: Hardfork;
    chainId?: ChainId;
};
export {};
