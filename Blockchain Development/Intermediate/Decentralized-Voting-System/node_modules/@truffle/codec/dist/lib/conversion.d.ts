import BN from "bn.js";
import Big from "big.js";
import type * as Values from "./format/values";
/**
 * @param bytes - undefined | string | number | BN | Uint8Array | Big
 * @return {BN}
 */
export declare function toBN(bytes: undefined | string | number | BN | Uint8Array | Big | bigint): BN;
export declare function isBig(input: any): input is Big;
/**
 * @param bytes - Uint8Array
 * @return {BN}
 */
export declare function toSignedBN(bytes: Uint8Array): BN;
export declare function toBigInt(value: BN): BigInt;
export declare function toBig(value: BN | number | bigint): Big;
/**
 * @param bytes - Uint8Array | BN | bigint
 * @param padLength - number - minimum desired byte length (left-pad with zeroes)
 * @param padRight - boolean - causes padding to occur on right instead of left
 * @return {string}
 */
export declare function toHexString(bytes: Uint8Array | BN | bigint | number | Big, padLength?: number, padRight?: boolean): string;
export declare function toBytes(data: BN | string | number | Big | bigint, length?: number): Uint8Array;
export declare function stringToBytes(input: string): Uint8Array;
export declare function shiftBigUp(value: Big, decimalPlaces: number): Big;
export declare function shiftBigDown(value: Big, decimalPlaces: number): Big;
export declare function countDecimalPlaces(value: Big): number;
export declare function cleanBool(result: Values.ElementaryResult): Values.ElementaryResult;
