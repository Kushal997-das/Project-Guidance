import type * as Format from "../format";
import type { IntegerWrapRequest } from "../types";
import type { Case, Uint8ArrayLike } from "./types";
export declare const bytesCases: Case<Format.Types.BytesType, Format.Values.BytesValue, IntegerWrapRequest>[];
export declare function validateUint8ArrayLike(input: Uint8ArrayLike, dataType: Format.Types.Type, //for error information
name: string): void;
