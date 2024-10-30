import Web3 from "web3";
import type { provider as Provider } from "web3-core/types";
export type NetworkType = string;
export interface Web3ShimOptions {
    provider?: Provider;
    networkType?: NetworkType;
}
export type InitNetworkType = (web3Shim: Web3Shim) => Promise<void>;
export interface NetworkTypeDefinition {
    initNetworkType: InitNetworkType;
}
export type NetworkTypesConfig = Map<NetworkType, NetworkTypeDefinition>;
export declare class Web3Shim extends Web3 {
    networkType: NetworkType;
    constructor(options?: Web3ShimOptions);
    setNetworkType(networkType: NetworkType): void;
}
