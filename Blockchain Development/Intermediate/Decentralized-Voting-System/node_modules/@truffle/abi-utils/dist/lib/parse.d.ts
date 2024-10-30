import { Parameter, FunctionEntry, ErrorEntry, EventEntry } from "./types";
export declare function parseFunctionSignature(signature: string): FunctionEntry;
export declare function parseErrorSignature(signature: string): ErrorEntry;
export declare function parseEventSignature(signature: string): EventEntry;
export declare function parseSignature(signature: string): {
    name: string;
    inputs: Parameter[];
};
export declare function parseParameterList(parameterList: string): Parameter[];
//# sourceMappingURL=parse.d.ts.map