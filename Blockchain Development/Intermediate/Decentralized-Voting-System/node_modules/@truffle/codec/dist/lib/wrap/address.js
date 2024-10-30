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
exports.addressCases = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("codec:wrap:address");
const dispatch_1 = require("./dispatch");
const errors_1 = require("./errors");
const Utils = __importStar(require("./utils"));
const EvmUtils = __importStar(require("../evm/utils"));
const Messages = __importStar(require("./messages"));
const web3_utils_1 = __importDefault(require("web3-utils"));
//no separate cases for contracts; even with loose turned off,
//we consider these interchangeable
const addressFromStringCases = [
    addressFromHexString,
    addressFromPrefixlessHexString,
    addressFromOtherString //Please put after other string cases! Also, can yield
];
const addressCasesBasic = [
    ...addressFromStringCases,
    addressFromBoxedString,
    addressFromContractInput,
    addressFromCodecAddressLikeValue,
    addressFromCodecUdvtValue,
    addressFailureCase
];
exports.addressCases = [addressFromTypeValueInput, ...addressCasesBasic];
function* addressFromHexString(dataType, input, wrapOptions) {
    if (typeof input !== "string") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a string");
    }
    if (!Utils.isHexString(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a 0x-prefixed hex string");
    }
    return validateNormalizeAndWrap(dataType, input, input, wrapOptions.name);
}
function* addressFromPrefixlessHexString(dataType, input, wrapOptions) {
    if (typeof input !== "string") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a string");
    }
    if (!Utils.isPrefixlessHexString(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not an unprefixed hex string");
    }
    return validateNormalizeAndWrap(dataType, "0x" + input, input, wrapOptions.name);
}
function* addressFromOtherString(dataType, input, wrapOptions) {
    if (typeof input !== "string") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a string");
    }
    const request = { kind: "address", name: input };
    const response = yield request;
    if (response.kind !== "address") {
        throw new errors_1.BadResponseTypeError(request, response);
    }
    if (response.address === null) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, response.partiallyRecognized ? 5 : 3, response.reason);
    }
    //we should be able to skip validation & normalization here
    return wrapAsAppropriateType(dataType, response.address);
}
function* addressFromBoxedString(dataType, input, wrapOptions) {
    if (!Utils.isBoxedString(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a boxed string");
    }
    //unbox and try again
    return yield* (0, dispatch_1.wrapWithCases)(dataType, input.valueOf(), wrapOptions, addressFromStringCases);
}
function* addressFromContractInput(dataType, input, wrapOptions) {
    if (!Utils.isContractInput(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a contract-like object");
    }
    return validateNormalizeAndWrap(dataType, input.address, input, wrapOptions.name);
}
function* addressFromCodecAddressLikeValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "address" &&
        input.type.typeClass !== "contract") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    let address;
    switch (input.type.typeClass) {
        case "address":
            address = input.value.asAddress;
            break;
        case "contract":
            address = input.value.address;
            break;
        //other cases are impossible at this point
    }
    //we should be able to skip validation/normalization here
    return wrapAsAppropriateType(dataType, address);
}
function* addressFromCodecUdvtValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "userDefinedValueType") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    return yield* addressFromCodecAddressLikeValue(dataType, input.value, wrapOptions);
}
function* addressFromTypeValueInput(dataType, input, wrapOptions) {
    if (!Utils.isTypeValueInput(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a type/value pair");
    }
    if (input.type !== "address" && input.type !== "contract") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.specifiedTypeMessage(input.type));
    }
    //extract value & try again, with loose option turned on
    return yield* (0, dispatch_1.wrapWithCases)(dataType, input.value, Object.assign(Object.assign({}, wrapOptions), { loose: true }), addressCasesBasic);
}
function* addressFailureCase(dataType, input, wrapOptions) {
    throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 2, "Input was not recognizable as an address");
}
function validateAndNormalize(asAddress, dataType, //for errors
input, //for errors
name //for errors
) {
    if (!Utils.isByteString(asAddress)) {
        throw new errors_1.TypeMismatchError(dataType, input, name, 5, Messages.notABytestringMessage("Address"));
    }
    if (asAddress.length !== 2 * EvmUtils.ADDRESS_SIZE + 2) {
        throw new errors_1.TypeMismatchError(dataType, input, name, 5, Messages.wrongLengthMessage("address", EvmUtils.ADDRESS_SIZE, (asAddress.length - 2) / 2));
    }
    if (!web3_utils_1.default.isAddress(asAddress)) {
        throw new errors_1.TypeMismatchError(dataType, input, name, 6, //to beat the one from the yield case :P
        Messages.checksumFailedMessage);
    }
    //and normalize
    return web3_utils_1.default.toChecksumAddress(asAddress);
}
function wrapAsAppropriateType(dataType, asAddress) {
    //return address or contract value as appropriate
    switch (dataType.typeClass) {
        case "address":
            return {
                type: dataType,
                kind: "value",
                value: {
                    asAddress
                },
                interpretations: {}
            };
        case "contract":
            return {
                type: dataType,
                kind: "value",
                value: {
                    kind: "unknown",
                    address: asAddress
                },
                interpretations: {}
            };
    }
}
function validateNormalizeAndWrap(dataType, asAddress, input, //for errors
name //for errors
) {
    return wrapAsAppropriateType(dataType, validateAndNormalize(asAddress, dataType, input, name));
}
//# sourceMappingURL=address.js.map