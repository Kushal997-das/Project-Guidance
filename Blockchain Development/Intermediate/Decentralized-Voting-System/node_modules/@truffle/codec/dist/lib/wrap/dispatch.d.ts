import * as Format from "../format";
import type { WrapResponse } from "../types";
import type { Case, WrapOptions } from "./types";
export declare function wrapWithCases<TypeType extends Format.Types.Type, ValueType, RequestType>(dataType: TypeType, input: unknown, wrapOptions: WrapOptions, cases: Case<TypeType, ValueType, RequestType>[]): Generator<RequestType, ValueType, WrapResponse>;
