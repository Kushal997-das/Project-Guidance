import * as Format from "../../format";
import { AbiAllocations } from "../allocate";
/**
 * @Category Encoding (low-level)
 */
export declare function encodeAbi(input: Format.Values.Result, allocations?: AbiAllocations): Uint8Array | undefined;
/**
 * @Category Encoding (low-level)
 */
export declare function encodeTupleAbi(tuple: Format.Values.Result[], allocations?: AbiAllocations): Uint8Array | undefined;
/**
 * @Category Encoding (low-level)
 */
export declare function encodeTupleAbiWithSelector(tuple: Format.Values.Result[], selector: Uint8Array, allocations?: AbiAllocations): Uint8Array | undefined;
