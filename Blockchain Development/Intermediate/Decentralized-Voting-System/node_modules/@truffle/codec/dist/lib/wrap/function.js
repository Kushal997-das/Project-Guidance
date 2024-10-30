"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionExternalCases = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("codec:wrap:function");
const dispatch_1 = require("./dispatch");
const errors_1 = require("./errors");
const Messages = __importStar(require("./messages"));
const Utils = __importStar(require("./utils"));
const EvmUtils = __importStar(require("../evm/utils"));
const web3_utils_1 = __importDefault(require("web3-utils"));
const address_1 = require("./address");
const bytes_1 = require("./bytes");
const functionExternalCasesBasic = [
    functionFromFunctionExternalInput,
    functionFromHexString,
    functionFromCodecFunctionExternalValue,
    functionFailureCase
];
exports.functionExternalCases = [functionFromTypeValueInput, ...functionExternalCasesBasic];
function* functionFromFunctionExternalInput(dataType, input, wrapOptions) {
    if (!Utils.isFunctionExternalInput(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not an object with address & selector");
    }
    const wrappedAddress = (yield* (0, dispatch_1.wrapWithCases)({ typeClass: "address", kind: "general" }, input.address, Object.assign(Object.assign({}, wrapOptions), { name: `${wrapOptions.name}.address`, specificityFloor: 5 }), address_1.addressCases));
    const address = wrappedAddress.value.asAddress;
    const wrappedSelector = yield* (0, dispatch_1.wrapWithCases)({ typeClass: "bytes", kind: "static", length: 4 }, input.selector, Object.assign(Object.assign({}, wrapOptions), { name: `${wrapOptions.name}.selector`, specificityFloor: 5 }), bytes_1.bytesCases);
    const selector = wrappedSelector.value.asHex;
    //note validation & normalization have already been performed
    return {
        type: dataType,
        kind: "value",
        value: {
            kind: "unknown",
            contract: {
                kind: "unknown",
                address
            },
            selector
        },
        interpretations: {}
    };
}
function* functionFromCodecFunctionExternalValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "function" ||
        input.type.visibility !== "external") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    const coercedInput = input;
    const address = coercedInput.value.contract.address;
    const selector = coercedInput.value.selector;
    //we can skip validation & normalization here
    return {
        type: dataType,
        kind: "value",
        value: {
            kind: "unknown",
            contract: {
                kind: "unknown",
                address
            },
            selector
        },
        interpretations: {}
    };
}
function* functionFromHexString(dataType, input, wrapOptions) {
    if (typeof input !== "string") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a string");
    }
    if (!Utils.isByteString(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, "Input was a string, but not a valid even-length hex string");
    }
    if (input.length !==
        2 + 2 * (EvmUtils.ADDRESS_SIZE + EvmUtils.SELECTOR_SIZE)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrongLengthMessage("external function was given as a string but", EvmUtils.ADDRESS_SIZE + EvmUtils.SELECTOR_SIZE, (input.length - 2) / 2));
    }
    let address = input
        .slice(0, EvmUtils.ADDRESS_SIZE * 2 + 2)
        .toLowerCase();
    const selector = "0x" + input.slice(EvmUtils.ADDRESS_SIZE * 2 + 2).toLowerCase();
    //address & selector must now have the correct length, and we are deliberately *not*
    //checking the checksum on address in this case.  So, the only thing remaining
    //to do is to normalize address.
    address = web3_utils_1.default.toChecksumAddress(address);
    //...and return
    return {
        type: dataType,
        kind: "value",
        value: {
            kind: "unknown",
            contract: {
                kind: "unknown",
                address
            },
            selector
        },
        interpretations: {}
    };
}
function* functionFromTypeValueInput(dataType, input, wrapOptions) {
    if (!Utils.isTypeValueInput(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a type/value pair");
    }
    if (input.type !== "function") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.specifiedTypeMessage(input.type));
    }
    //extract value & try again, with loose option turned on
    return yield* (0, dispatch_1.wrapWithCases)(dataType, input.value, Object.assign(Object.assign({}, wrapOptions), { loose: true }), functionExternalCasesBasic);
}
function* functionFailureCase(dataType, input, wrapOptions) {
    throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 2, "Input should be one of: an object with address and selector; a 24-byte hex string; a type/value pair; or a wrapped external function");
}
//# sourceMappingURL=function.js.map