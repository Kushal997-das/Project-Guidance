import * as Format from "../format";
import type { WrapRequest, WrapResponse } from "../types";
import type { Case, TupleLikeType, TupleLikeValue, WrapOptions } from "./types";
export declare const arrayCases: Case<Format.Types.ArrayType, Format.Values.ArrayValue, WrapRequest>[];
export declare const tupleCases: Case<TupleLikeType, TupleLikeValue, WrapRequest>[];
export declare const txOptionsCases: Case<Format.Types.OptionsType, Format.Values.OptionsValue, WrapRequest>[];
export declare const udvtCases: Case<Format.Types.UserDefinedValueTypeType, Format.Values.UserDefinedValueTypeValue, WrapRequest>[];
export declare function wrap(dataType: Format.Types.Type, input: unknown, wrapOptions: WrapOptions): Generator<WrapRequest, Format.Values.Value, WrapResponse>;
