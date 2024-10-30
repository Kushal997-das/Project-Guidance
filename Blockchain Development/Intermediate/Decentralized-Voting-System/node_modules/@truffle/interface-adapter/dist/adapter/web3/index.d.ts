import BN from "bn.js";
import { Web3Shim } from "../../shim";
import type { InterfaceAdapter, EvmBlockType, Provider, Transaction, TransactionReceipt, TransactionCostReport } from "../types";
export interface Web3InterfaceAdapterOptions {
    provider?: Provider;
    networkType?: string;
}
export declare class Web3InterfaceAdapter implements InterfaceAdapter {
    web3: Web3Shim;
    constructor({ provider, networkType }?: Web3InterfaceAdapterOptions);
    getNetworkId(): Promise<number>;
    getBlock(block: EvmBlockType): Promise<import("web3-eth").BlockTransactionString>;
    getTransaction(tx: string): Promise<import("web3-core").Transaction>;
    getTransactionReceipt(tx: string): Promise<import("web3-core").TransactionReceipt>;
    getBalance(address: string): Promise<string>;
    getCode(address: string): Promise<string>;
    getAccounts(): Promise<string[]>;
    estimateGas(transactionConfig: Transaction, stacktrace?: boolean): Promise<number>;
    getBlockNumber(): Promise<number>;
    getTransactionCostReport(receipt: TransactionReceipt): Promise<TransactionCostReport>;
    displayCost(value: BN): string;
}
