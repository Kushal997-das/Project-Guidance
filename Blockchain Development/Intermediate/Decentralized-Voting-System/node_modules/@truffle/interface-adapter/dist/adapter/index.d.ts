import { Web3InterfaceAdapterOptions } from "./web3";
import type { InterfaceAdapter } from "./types";
export type InterfaceAdapterOptions = Web3InterfaceAdapterOptions;
export declare const createInterfaceAdapter: (options: InterfaceAdapterOptions) => InterfaceAdapter;
