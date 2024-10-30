import ProviderEngine from "@trufflesuite/web3-provider-engine";
import type { JSONRPCRequestPayload, JSONRPCErrorCallback } from "ethereum-protocol";
import type { Callback, JsonRPCResponse } from "web3/providers";
import type { ConstructorArguments } from "./constructor/ConstructorArguments";
declare class HDWalletProvider {
    private hdwallet?;
    private walletHdpath;
    private wallets;
    private addresses;
    private chainId?;
    private chainSettings;
    private hardfork;
    private initialized;
    engine: ProviderEngine;
    constructor(...args: ConstructorArguments);
    private initialize;
    private checkBIP39Mnemonic;
    private ethUtilValidation;
    send(payload: JSONRPCRequestPayload, callback: JSONRPCErrorCallback | Callback<JsonRPCResponse>): void;
    sendAsync(payload: JSONRPCRequestPayload, callback: JSONRPCErrorCallback | Callback<JsonRPCResponse>): void;
    getAddress(idx?: number): string;
    getAddresses(): string[];
    static isValidProvider(provider: any): boolean;
}
export = HDWalletProvider;
