"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abiSelector = exports.abiTypeSignature = exports.abiTupleSignature = exports.abiSignature = exports.ShortSelectorSize = void 0;
const web3_utils_1 = require("web3-utils");
exports.ShortSelectorSize = 4;
//NOTE: this function returns the written out SIGNATURE, not the SELECTOR
function abiSignature(abiEntry) {
    return abiEntry.name + abiTupleSignature(abiEntry.inputs);
}
exports.abiSignature = abiSignature;
function abiTupleSignature(parameters) {
    const components = parameters.map(abiTypeSignature);
    return "(" + components.join(",") + ")";
}
exports.abiTupleSignature = abiTupleSignature;
function abiTypeSignature(parameter) {
    const tupleMatch = parameter.type.match(/^tuple(.*)/);
    if (tupleMatch === null) {
        //does not start with "tuple"
        return parameter.type;
    }
    else {
        const tail = tupleMatch[1]; //everything after "tuple"
        const tupleSignature = abiTupleSignature(parameter.components); //it won't be undefined
        return tupleSignature + tail;
    }
}
exports.abiTypeSignature = abiTypeSignature;
function abiSelector(abiEntry) {
    const signature = abiSignature(abiEntry);
    //NOTE: web3's soliditySha3 has a problem if the empty
    //string is passed in.  Fortunately, that should never happen here.
    const hash = (0, web3_utils_1.soliditySha3)({ type: "string", value: signature });
    switch (abiEntry.type) {
        case "event":
            return hash;
        case "function":
        case "error":
            return hash.slice(0, 2 + 2 * exports.ShortSelectorSize); //arithmetic to account for hex string
    }
}
exports.abiSelector = abiSelector;
//# sourceMappingURL=signature.js.map