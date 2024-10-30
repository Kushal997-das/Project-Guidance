import { Parameter, FunctionEntry, EventEntry, ErrorEntry } from "./types";
export declare const ShortSelectorSize = 4;
export declare function abiSignature(abiEntry: FunctionEntry | EventEntry | ErrorEntry): string;
export declare function abiTupleSignature(parameters: Parameter[]): string;
export declare function abiTypeSignature(parameter: Parameter): string;
export declare function abiSelector(abiEntry: FunctionEntry | EventEntry | ErrorEntry): string;
//# sourceMappingURL=signature.d.ts.map