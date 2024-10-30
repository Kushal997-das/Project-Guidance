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
exports.checkPaddingLeft = exports.decodeExternalFunction = exports.decodeContract = exports.decodeBasic = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("codec:basic:decode");
const read_1 = __importDefault(require("../../read"));
const Conversion = __importStar(require("../../conversion"));
const Format = __importStar(require("../../format"));
const Contexts = __importStar(require("../../contexts"));
const Evm = __importStar(require("../../evm"));
const errors_1 = require("../../errors");
const allocate_1 = require("../allocate");
const decode_1 = require("../../bytes/decode");
function* decodeBasic(dataType, pointer, info, options = {}) {
    const { state } = info;
    const { strictAbiMode: strict } = options; //if this is undefined it'll still be falsy so it's OK
    const paddingMode = options.paddingMode || "default";
    let bytes;
    let rawBytes;
    try {
        bytes = yield* (0, read_1.default)(pointer, state);
    }
    catch (error) {
        debug("segfault, pointer %o, state: %O", pointer, state);
        return (0, errors_1.handleDecodingError)(dataType, error, strict);
    }
    rawBytes = bytes;
    debug("type %O", dataType);
    debug("pointer %o", pointer);
    switch (dataType.typeClass) {
        case "userDefinedValueType": {
            const fullType = (Format.Types.fullType(dataType, info.userDefinedTypes));
            if (!fullType.underlyingType) {
                const error = {
                    kind: "UserDefinedTypeNotFoundError",
                    type: fullType
                };
                if (strict || options.allowRetry) {
                    throw new errors_1.StopDecodingError(error, true);
                    //note that we allow a retry if we couldn't locate the underlying type!
                }
                return {
                    type: fullType,
                    kind: "error",
                    error
                };
            }
            const underlyingResult = yield* decodeBasic(fullType.underlyingType, pointer, info, options);
            switch (underlyingResult.kind //yes this switch is a little unnecessary :P
            ) {
                case "value":
                    //wrap the value and return
                    return {
                        //no idea why need coercion here
                        type: fullType,
                        kind: "value",
                        value: underlyingResult,
                        interpretations: {}
                    };
                case "error":
                    //wrap the error and return an error result!
                    //this is inconsistent with how we handle other container types
                    //(structs, arrays, mappings), where having an error in one element
                    //does not cause an error in the whole thing, but to do that here
                    //would cause problems for the type system :-/
                    //so we'll just be inconsistent
                    return {
                        //TS is being bad again :-/
                        type: fullType,
                        kind: "error",
                        error: {
                            kind: "WrappedError",
                            error: underlyingResult
                        }
                    };
            }
            break; //to satisfy TS :P
        }
        case "bool": {
            if (!checkPadding(bytes, dataType, paddingMode)) {
                let error = {
                    kind: "BoolPaddingError",
                    paddingType: getPaddingType(dataType, paddingMode),
                    raw: Conversion.toHexString(bytes)
                };
                if (strict) {
                    throw new errors_1.StopDecodingError(error);
                }
                return {
                    type: dataType,
                    kind: "error",
                    error
                };
            }
            bytes = removePadding(bytes, dataType, paddingMode);
            //note: the use of the BN is a little silly here,
            //but, kind of stuck with it for now
            const numeric = Conversion.toBN(bytes);
            if (numeric.eqn(0)) {
                return {
                    type: dataType,
                    kind: "value",
                    value: { asBoolean: false },
                    interpretations: {}
                };
            }
            else if (numeric.eqn(1)) {
                return {
                    type: dataType,
                    kind: "value",
                    value: { asBoolean: true },
                    interpretations: {}
                };
            }
            else {
                let error = {
                    kind: "BoolOutOfRangeError",
                    rawAsBN: numeric
                };
                if (strict) {
                    throw new errors_1.StopDecodingError(error);
                }
                return {
                    type: dataType,
                    kind: "error",
                    error
                };
            }
        }
        case "uint":
            //first, check padding (if needed)
            if (!checkPadding(bytes, dataType, paddingMode)) {
                let error = {
                    kind: "UintPaddingError",
                    paddingType: getPaddingType(dataType, paddingMode),
                    raw: Conversion.toHexString(bytes)
                };
                if (strict) {
                    throw new errors_1.StopDecodingError(error);
                }
                return {
                    type: dataType,
                    kind: "error",
                    error
                };
            }
            //now, truncate to appropriate length
            bytes = removePadding(bytes, dataType, paddingMode);
            return {
                type: dataType,
                kind: "value",
                value: {
                    asBN: Conversion.toBN(bytes),
                    rawAsBN: Conversion.toBN(rawBytes)
                },
                interpretations: {}
            };
        case "int":
            //first, check padding (if needed)
            if (!checkPadding(bytes, dataType, paddingMode)) {
                let error = {
                    kind: "IntPaddingError",
                    paddingType: getPaddingType(dataType, paddingMode),
                    raw: Conversion.toHexString(bytes)
                };
                if (strict) {
                    throw new errors_1.StopDecodingError(error);
                }
                return {
                    type: dataType,
                    kind: "error",
                    error
                };
            }
            //now, truncate to appropriate length (keeping the bytes on the right)
            bytes = removePadding(bytes, dataType, paddingMode);
            return {
                type: dataType,
                kind: "value",
                value: {
                    asBN: Conversion.toSignedBN(bytes),
                    rawAsBN: Conversion.toSignedBN(rawBytes)
                },
                interpretations: {}
            };
        case "address": {
            if (!checkPadding(bytes, dataType, paddingMode)) {
                let error = {
                    kind: "AddressPaddingError",
                    paddingType: getPaddingType(dataType, paddingMode),
                    raw: Conversion.toHexString(bytes)
                };
                if (strict) {
                    throw new errors_1.StopDecodingError(error);
                }
                return {
                    type: dataType,
                    kind: "error",
                    error
                };
            }
            bytes = removePadding(bytes, dataType, paddingMode);
            const address = Evm.Utils.toAddress(bytes);
            let decoded = {
                type: dataType,
                kind: "value",
                value: {
                    asAddress: address,
                    rawAsHex: Conversion.toHexString(rawBytes)
                },
                interpretations: {}
            };
            //now: attach interpretations
            const ensName = yield* reverseEnsResolve(address);
            if (ensName !== null) {
                decoded.interpretations.ensName = ensName;
            }
            //yes, this makes the contract/address distinction a little silly
            const contractValueInfo = yield* decodeContract(bytes, info);
            if (contractValueInfo.kind === "known") {
                decoded.interpretations.contractClass = contractValueInfo.class;
            }
            return decoded;
        }
        case "contract": {
            if (!checkPadding(bytes, dataType, paddingMode)) {
                let error = {
                    kind: "ContractPaddingError",
                    paddingType: getPaddingType(dataType, paddingMode),
                    raw: Conversion.toHexString(bytes)
                };
                if (strict) {
                    throw new errors_1.StopDecodingError(error);
                }
                return {
                    type: dataType,
                    kind: "error",
                    error
                };
            }
            bytes = removePadding(bytes, dataType, paddingMode);
            const fullType = (Format.Types.fullType(dataType, info.userDefinedTypes));
            const contractValueInfo = yield* decodeContract(bytes, info);
            let decoded = {
                type: fullType,
                kind: "value",
                value: contractValueInfo,
                interpretations: {}
            };
            //now: attach interpretations
            const ensName = yield* reverseEnsResolve(contractValueInfo.address);
            if (ensName !== null) {
                decoded.interpretations = { ensName };
            }
            return decoded;
        }
        case "bytes":
            //NOTE: we assume this is a *static* bytestring,
            //because this is decodeBasic! dynamic ones should
            //go to decodeBytes!
            let coercedDataType = dataType;
            //first, check padding (if needed)
            if (!checkPadding(bytes, dataType, paddingMode)) {
                let error = {
                    kind: "BytesPaddingError",
                    paddingType: getPaddingType(dataType, paddingMode),
                    raw: Conversion.toHexString(bytes)
                };
                if (strict) {
                    throw new errors_1.StopDecodingError(error);
                }
                return {
                    type: coercedDataType,
                    kind: "error",
                    error
                };
            }
            //now, truncate to appropriate length
            bytes = removePadding(bytes, dataType, paddingMode);
            return {
                type: coercedDataType,
                kind: "value",
                value: {
                    asHex: Conversion.toHexString(bytes),
                    rawAsHex: Conversion.toHexString(rawBytes)
                },
                interpretations: {}
            };
        case "function":
            switch (dataType.visibility) {
                case "external":
                    if (!checkPadding(bytes, dataType, paddingMode)) {
                        const error = {
                            kind: "FunctionExternalNonStackPaddingError",
                            paddingType: getPaddingType(dataType, paddingMode),
                            raw: Conversion.toHexString(bytes)
                        };
                        if (strict) {
                            throw new errors_1.StopDecodingError(error);
                        }
                        return {
                            type: dataType,
                            kind: "error",
                            error
                        };
                    }
                    bytes = removePadding(bytes, dataType, paddingMode);
                    const address = bytes.slice(0, Evm.Utils.ADDRESS_SIZE);
                    const selector = bytes.slice(Evm.Utils.ADDRESS_SIZE, Evm.Utils.ADDRESS_SIZE + Evm.Utils.SELECTOR_SIZE);
                    const valueInfo = yield* decodeExternalFunction(address, selector, info);
                    let decoded = {
                        type: dataType,
                        kind: "value",
                        value: valueInfo,
                        interpretations: {}
                    };
                    //now: attach interpretations
                    const contractEnsName = yield* reverseEnsResolve(valueInfo.contract.address);
                    if (contractEnsName !== null) {
                        decoded.interpretations = { contractEnsName };
                    }
                    return decoded;
                case "internal":
                    //note: we used to error if we hit this point with strict === true,
                    //since internal function pointers don't go in the ABI, and strict
                    //mode is intended for ABI decoding.  however, there are times when
                    //we want to use strict mode to decode immutables, and immutables can
                    //include internal function pointers.  so now we allow this.  yes,
                    //this is a bit of an abuse of strict mode, which was after all meant
                    //for ABI decoding, but oh well.
                    if (!checkPadding(bytes, dataType, paddingMode)) {
                        const error = {
                            kind: "FunctionInternalPaddingError",
                            paddingType: getPaddingType(dataType, paddingMode),
                            raw: Conversion.toHexString(bytes)
                        };
                        if (strict) {
                            throw new errors_1.StopDecodingError(error);
                        }
                        return {
                            type: dataType,
                            kind: "error",
                            error
                        };
                    }
                    bytes = removePadding(bytes, dataType, paddingMode);
                    return decodeInternalFunction(dataType, bytes, info, strict);
            }
            break; //to satisfy TypeScript
        case "enum": {
            let numeric = Conversion.toBN(bytes);
            const fullType = (Format.Types.fullType(dataType, info.userDefinedTypes));
            if (!fullType.options) {
                let error = {
                    kind: "EnumNotFoundDecodingError",
                    type: fullType,
                    rawAsBN: numeric
                };
                if (strict || options.allowRetry) {
                    throw new errors_1.StopDecodingError(error, true);
                    //note that we allow a retry if we couldn't locate the enum type!
                }
                return {
                    type: fullType,
                    kind: "error",
                    error
                };
            }
            //note: I'm doing the padding checks a little more manually on this one
            //so that we can have the right type of error
            const numOptions = fullType.options.length;
            const numBytes = Math.ceil(Math.log2(numOptions) / 8);
            const paddingType = getPaddingType(dataType, paddingMode);
            if (!checkPaddingDirect(bytes, numBytes, paddingType)) {
                let error = {
                    kind: "EnumPaddingError",
                    type: fullType,
                    paddingType,
                    raw: Conversion.toHexString(bytes)
                };
                if (strict) {
                    throw new errors_1.StopDecodingError(error);
                }
                return {
                    type: dataType,
                    kind: "error",
                    error
                };
            }
            bytes = removePaddingDirect(bytes, numBytes, paddingType);
            numeric = Conversion.toBN(bytes); //alter numeric!
            if (numeric.ltn(numOptions)) {
                const name = fullType.options[numeric.toNumber()];
                //NOTE: despite the use of toNumber(), I'm NOT catching exceptions here and returning an
                //error value like elsewhere; I'm just letting this one fail.  Why?  Because if we have
                //an enum with that many options in the first place, we have bigger problems!
                return {
                    type: fullType,
                    kind: "value",
                    value: {
                        name,
                        numericAsBN: numeric
                    },
                    interpretations: {}
                };
            }
            else {
                let error = {
                    kind: "EnumOutOfRangeError",
                    type: fullType,
                    rawAsBN: numeric
                };
                if (strict) {
                    //note:
                    //if the enum is merely out of range rather than out of the ABI range,
                    //we do NOT throw an error here!  instead we simply return an error value,
                    //which we normally avoid doing in strict mode.  (the error will be caught
                    //later at the re-encoding step instead.)  why?  because we might be running
                    //in ABI mode, so we may need to abify this "value" rather than just throwing
                    //it out.
                    throw new errors_1.StopDecodingError(error);
                    //note that we do NOT allow a retry here!
                    //if we *can* find the enum type but the value is out of range,
                    //we *know* that it is invalid!
                }
                return {
                    type: fullType,
                    kind: "error",
                    error
                };
            }
        }
        case "fixed": {
            //first, check padding (if needed)
            if (!checkPadding(bytes, dataType, paddingMode)) {
                let error = {
                    kind: "FixedPaddingError",
                    paddingType: getPaddingType(dataType, paddingMode),
                    raw: Conversion.toHexString(bytes)
                };
                if (strict) {
                    throw new errors_1.StopDecodingError(error);
                }
                return {
                    type: dataType,
                    kind: "error",
                    error
                };
            }
            //now, truncate to appropriate length (keeping the bytes on the right)
            bytes = removePadding(bytes, dataType, paddingMode);
            let asBN = Conversion.toSignedBN(bytes);
            let rawAsBN = Conversion.toSignedBN(rawBytes);
            let asBig = Conversion.shiftBigDown(Conversion.toBig(asBN), dataType.places);
            let rawAsBig = Conversion.shiftBigDown(Conversion.toBig(rawAsBN), dataType.places);
            return {
                type: dataType,
                kind: "value",
                value: {
                    asBig,
                    rawAsBig
                },
                interpretations: {}
            };
        }
        case "ufixed": {
            //first, check padding (if needed)
            if (!checkPadding(bytes, dataType, paddingMode)) {
                let error = {
                    kind: "UfixedPaddingError",
                    paddingType: getPaddingType(dataType, paddingMode),
                    raw: Conversion.toHexString(bytes)
                };
                if (strict) {
                    throw new errors_1.StopDecodingError(error);
                }
                return {
                    type: dataType,
                    kind: "error",
                    error
                };
            }
            //now, truncate to appropriate length (keeping the bytes on the right)
            bytes = removePadding(bytes, dataType, paddingMode);
            let asBN = Conversion.toBN(bytes);
            let rawAsBN = Conversion.toBN(rawBytes);
            let asBig = Conversion.shiftBigDown(Conversion.toBig(asBN), dataType.places);
            let rawAsBig = Conversion.shiftBigDown(Conversion.toBig(rawAsBN), dataType.places);
            return {
                type: dataType,
                kind: "value",
                value: {
                    asBig,
                    rawAsBig
                },
                interpretations: {}
            };
        }
    }
}
exports.decodeBasic = decodeBasic;
//NOTE that this function returns a ContractValueInfo, not a ContractResult
function* decodeContract(addressBytes, info) {
    return (yield* decodeContractAndContext(addressBytes, info)).contractInfo;
}
exports.decodeContract = decodeContract;
function* decodeContractAndContext(addressBytes, info) {
    let address = Evm.Utils.toAddress(addressBytes);
    let rawAddress = Conversion.toHexString(addressBytes);
    let codeBytes = yield {
        type: "code",
        address
    };
    let code = Conversion.toHexString(codeBytes);
    let context = Contexts.Utils.findContext(info.contexts, code);
    if (context !== null) {
        return {
            context,
            contractInfo: {
                kind: "known",
                address,
                rawAddress,
                class: Contexts.Import.contextToType(context)
            }
        };
    }
    else {
        return {
            context,
            contractInfo: {
                kind: "unknown",
                address,
                rawAddress
            }
        };
    }
}
//note: address can have extra zeroes on the left like elsewhere, but selector should be exactly 4 bytes
//NOTE this again returns a FunctionExternalValueInfo, not a FunctionExternalResult
function* decodeExternalFunction(addressBytes, selectorBytes, info) {
    let { contractInfo: contract, context } = yield* decodeContractAndContext(addressBytes, info);
    let selector = Conversion.toHexString(selectorBytes);
    if (contract.kind === "unknown") {
        return {
            kind: "unknown",
            contract,
            selector
        };
    }
    let abiEntry = context.abi !== undefined ? context.abi[selector] : undefined;
    if (abiEntry === undefined) {
        return {
            kind: "invalid",
            contract,
            selector
        };
    }
    return {
        kind: "known",
        contract,
        selector,
        abi: abiEntry
    };
}
exports.decodeExternalFunction = decodeExternalFunction;
//this one works a bit differently -- in order to handle errors, it *does* return a FunctionInternalResult
function decodeInternalFunction(dataType, bytes, info, strict) {
    const rawInfoFormat = info.internalFunctionsTableKind || "index";
    //we'll default to "index" if it's not specified, not because that's
    //a reasonable default (we want to avoid ever hitting a default here,
    //debugger/decoder will set their own defaults as appropriate), but because
    //index doesn't attempt to, like, parse things, so it's better for reporting
    //errors if we have no clue what's going on
    let raw;
    switch (rawInfoFormat) {
        case "pcpair":
            const deployedPcBytes = bytes.slice(-Evm.Utils.PC_SIZE);
            const constructorPcBytes = bytes.slice(-Evm.Utils.PC_SIZE * 2, -Evm.Utils.PC_SIZE);
            const deployedPc = Conversion.toBN(deployedPcBytes).toNumber();
            const constructorPc = Conversion.toBN(constructorPcBytes).toNumber();
            raw = {
                kind: "pcpair",
                deployedProgramCounter: deployedPc,
                constructorProgramCounter: constructorPc
            };
            break;
        case "index":
            const index = Conversion.toBN(bytes).toNumber();
            raw = {
                kind: "index",
                functionIndex: index
            };
            break;
    }
    const context = Contexts.Import.contextToType(info.currentContext);
    //before anything else: do we even have an internal functions table?
    //if not, we'll just return the info we have without really attemting to decode
    if (!info.internalFunctionsTable || !info.internalFunctionsTableKind) {
        //note we end up here if the table kind wasn't set; the "index" default above
        //is *only* for error handling
        return {
            type: dataType,
            kind: "value",
            value: {
                kind: "unknown",
                context,
                rawInformation: raw
            },
            interpretations: {}
        };
    }
    //this switch block handles exceptional cases that are only relevant in the pcpair case
    if (raw.kind === "pcpair") {
        //defining these for convenience
        const { deployedProgramCounter: deployedPc, constructorProgramCounter: constructorPc } = raw;
        //also before we continue: is the PC zero? if so let's just return that
        if (deployedPc === 0 && constructorPc === 0) {
            return {
                type: dataType,
                kind: "value",
                value: {
                    kind: "exception",
                    context,
                    rawInformation: raw
                },
                interpretations: {}
            };
        }
        //another check: is only the deployed PC zero?
        if (deployedPc === 0 && constructorPc !== 0) {
            const error = {
                kind: "MalformedInternalFunctionError",
                context,
                rawInformation: raw
            };
            if (strict) {
                throw new errors_1.StopDecodingError(error);
            }
            return {
                type: dataType,
                kind: "error",
                error
            };
        }
        //one last pre-check: is this a deployed-format pointer in a constructor?
        if (info.currentContext.isConstructor && constructorPc === 0) {
            const error = {
                kind: "DeployedFunctionInConstructorError",
                context,
                rawInformation: raw
            };
            if (strict) {
                throw new errors_1.StopDecodingError(error);
            }
            return {
                type: dataType,
                kind: "error",
                error
            };
        }
    }
    //if we didn't hit any of those exceptional cases, we now attempt to look
    //up the function in the table
    let functionEntry;
    switch (raw.kind) {
        case "pcpair":
            const pc = info.currentContext.isConstructor
                ? raw.constructorProgramCounter
                : raw.deployedProgramCounter;
            functionEntry = info.internalFunctionsTable[pc];
            break;
        case "index":
            functionEntry = info.internalFunctionsTable[raw.functionIndex];
            break;
    }
    if (!functionEntry) {
        //If we didn't find an entry, this is an error
        const error = {
            kind: "NoSuchInternalFunctionError",
            context,
            rawInformation: raw
        };
        if (strict) {
            throw new errors_1.StopDecodingError(error);
        }
        return {
            type: dataType,
            kind: "error",
            error
        };
    }
    //finally, the rest of this handles the case where we did find an entry,
    //and doesn't need to switch on the raw info type anymore :)
    if (functionEntry.isDesignatedInvalid) {
        return {
            type: dataType,
            kind: "value",
            value: {
                kind: "exception",
                context,
                rawInformation: raw
            },
            interpretations: {}
        };
    }
    const name = functionEntry.name;
    const mutability = functionEntry.mutability;
    const definedIn = Evm.Import.functionTableEntryToType(functionEntry); //may be null
    const id = Evm.Import.makeInternalFunctionId(functionEntry);
    return {
        type: dataType,
        kind: "value",
        value: {
            kind: "function",
            context,
            rawInformation: raw,
            name,
            id,
            definedIn,
            mutability
        },
        interpretations: {}
    };
}
function checkPadding(bytes, dataType, paddingMode, userDefinedTypes) {
    const length = (0, allocate_1.byteLength)(dataType, userDefinedTypes);
    const paddingType = getPaddingType(dataType, paddingMode);
    if (paddingMode === "permissive") {
        switch (dataType.typeClass) {
            case "bool":
            case "enum":
            case "function":
                //these three types are checked even in permissive mode
                return checkPaddingDirect(bytes, length, paddingType);
            default:
                return true;
        }
    }
    else {
        return checkPaddingDirect(bytes, length, paddingType);
    }
}
function removePadding(bytes, dataType, paddingMode, userDefinedTypes) {
    const length = (0, allocate_1.byteLength)(dataType, userDefinedTypes);
    const paddingType = getPaddingType(dataType, paddingMode);
    return removePaddingDirect(bytes, length, paddingType);
}
function removePaddingDirect(bytes, length, paddingType) {
    switch (paddingType) {
        case "right":
            return bytes.slice(0, length);
        default:
            return bytes.slice(-length);
    }
}
function checkPaddingDirect(bytes, length, paddingType) {
    switch (paddingType) {
        case "left":
            return checkPaddingLeft(bytes, length);
        case "right":
            return checkPaddingRight(bytes, length);
        case "signed":
            return checkPaddingSigned(bytes, length);
        case "signedOrLeft":
            return (checkPaddingSigned(bytes, length) || checkPaddingLeft(bytes, length));
    }
}
function getPaddingType(dataType, paddingMode) {
    switch (paddingMode) {
        case "right":
            return "right";
        case "default":
        case "permissive":
            return defaultPaddingType(dataType);
        case "zero": {
            const defaultType = defaultPaddingType(dataType);
            return defaultType === "signed" ? "left" : defaultType;
        }
        case "defaultOrZero": {
            const defaultType = defaultPaddingType(dataType);
            return defaultType === "signed" ? "signedOrLeft" : defaultType;
        }
    }
}
function defaultPaddingType(dataType) {
    switch (dataType.typeClass) {
        case "bytes":
            return "right";
        case "int":
        case "fixed":
            return "signed";
        case "function":
            if (dataType.visibility === "external") {
                return "right";
            }
        //otherwise, fall through to default
        default:
            return "left";
    }
}
function checkPaddingRight(bytes, length) {
    let padding = bytes.slice(length); //cut off the first length bytes
    return padding.every(paddingByte => paddingByte === 0);
}
//exporting this one for use in stack.ts
function checkPaddingLeft(bytes, length) {
    let padding = bytes.slice(0, -length); //cut off the last length bytes
    return padding.every(paddingByte => paddingByte === 0);
}
exports.checkPaddingLeft = checkPaddingLeft;
function checkPaddingSigned(bytes, length) {
    let padding = bytes.slice(0, -length); //padding is all but the last length bytes
    let value = bytes.slice(-length); //meanwhile the actual value is those last length bytes
    let signByte = value[0] & 0x80 ? 0xff : 0x00;
    return padding.every(paddingByte => paddingByte === signByte);
}
function* reverseEnsResolve(address) {
    const nameAsBytes = yield { type: "ens-primary-name", address };
    return nameAsBytes !== null ? (0, decode_1.decodeString)(nameAsBytes) : null;
}
//# sourceMappingURL=index.js.map