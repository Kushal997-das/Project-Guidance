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
exports.wrap = exports.udvtCases = exports.txOptionsCases = exports.tupleCases = exports.arrayCases = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("codec:wrap:wrap");
const Format = __importStar(require("../format"));
const errors_1 = require("./errors");
const dispatch_1 = require("./dispatch");
const Messages = __importStar(require("./messages"));
const Conversion = __importStar(require("../conversion"));
const Utils = __importStar(require("./utils"));
const integer_1 = require("./integer");
const decimal_1 = require("./decimal");
const bool_1 = require("./bool");
const bytes_1 = require("./bytes");
const address_1 = require("./address");
const string_1 = require("./string");
const function_1 = require("./function");
//this file contains the main wrap function, as well as the cases
//for arrays, tuples, udvts, and tx options.  all other types get their
//own file.
const arrayCasesBasic = [
    arrayFromArray,
    arrayFromCodecArrayValue,
    arrayFromJson,
    arrayFailureCase
];
exports.arrayCases = [arrayFromTypeValueInput, ...arrayCasesBasic];
const tupleCasesBasic = [
    tupleFromArray,
    tupleFromCodecTupleLikeValue,
    tupleFromObject,
    tupleFromJson,
    tupleFailureCase
];
exports.tupleCases = [
    tupleFromTypeValueInput,
    ...tupleCasesBasic
];
const txOptionsCasesBasic = [optionsFromCodecOptionsValue, optionsFromObject, optionsFailureCase];
exports.txOptionsCases = [optionsFromTypeValueInput, ...txOptionsCasesBasic];
exports.udvtCases = [
    //no separate case for udvtFromUdvtValue,
    //since underlying already handles this
    udvtFromUnderlying
];
function* wrap(dataType, input, wrapOptions) {
    if (!wrapOptions.name) {
        wrapOptions = Object.assign(Object.assign({}, wrapOptions), { name: "<input>" });
    }
    switch (dataType.typeClass) {
        case "uint":
        case "int":
        case "enum":
            return yield* (0, dispatch_1.wrapWithCases)(dataType, input, wrapOptions, integer_1.integerCases);
        case "fixed":
        case "ufixed":
            return yield* (0, dispatch_1.wrapWithCases)(dataType, input, wrapOptions, decimal_1.decimalCases);
        case "bool":
            return yield* (0, dispatch_1.wrapWithCases)(dataType, input, wrapOptions, bool_1.boolCases);
        case "bytes":
            return yield* (0, dispatch_1.wrapWithCases)(dataType, input, wrapOptions, bytes_1.bytesCases);
        case "address":
        case "contract":
            //these are treated the same
            return yield* (0, dispatch_1.wrapWithCases)(dataType, input, wrapOptions, address_1.addressCases);
        case "string":
            return yield* (0, dispatch_1.wrapWithCases)(dataType, input, wrapOptions, string_1.stringCases);
        case "function":
            //special check: weed out internal functions
            if (dataType.visibility === "internal") {
                throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, //it doesn't matter, but we'll make this error high specificity
                `Wrapping/encoding for internal function pointers is not supported`);
            }
            //otherwise, go ahead
            return yield* (0, dispatch_1.wrapWithCases)(dataType, input, wrapOptions, function_1.functionExternalCases);
        case "array":
            return yield* (0, dispatch_1.wrapWithCases)(dataType, input, wrapOptions, exports.arrayCases);
        case "struct":
        case "tuple":
            //these are treated the same as well
            return yield* (0, dispatch_1.wrapWithCases)(dataType, input, wrapOptions, exports.tupleCases);
        case "userDefinedValueType":
            return yield* (0, dispatch_1.wrapWithCases)(dataType, input, wrapOptions, exports.udvtCases);
        case "options":
            return yield* (0, dispatch_1.wrapWithCases)(dataType, input, wrapOptions, exports.txOptionsCases);
        default:
            throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, //it doesn't matter, but we'll make this error high specificity
            `Wrapping/encoding for type ${Format.Types.typeStringWithoutLocation(dataType)} is not supported`);
    }
}
exports.wrap = wrap;
//array cases
function* arrayFromArray(dataType, input, wrapOptions) {
    if (!Array.isArray(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not an array");
    }
    if (dataType.kind === "static" && !dataType.length.eqn(input.length)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrongArrayLengthMessage(dataType.length, input.length));
    }
    //can't do yield in a map, so manual loop here
    let value = [];
    for (let index = 0; index < input.length; index++) {
        value.push(yield* wrap(dataType.baseType, input[index], Object.assign(Object.assign({}, wrapOptions), { name: `${wrapOptions.name}[${index}]`, specificityFloor: 5 //errors in components are quite specific!
         })));
    }
    return {
        type: dataType,
        kind: "value",
        value,
        interpretations: {}
    };
}
function* arrayFromCodecArrayValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "array") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    //we won't bother with detailed typechecking as much of it is handled
    //either in the call to arrayFromArray or in the wrapping of the
    //individual elements; we will check dynamic vs static though as that
    //isn't handled elsewhere
    if (!wrapOptions.loose && input.type.kind === dataType.kind) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    //note that we do *not* just copy over input.value, but rather we
    //defer to arrayFromArray; this is because there might be some elements
    //where the type is not the same but is compatible
    const value = input.value;
    return yield* arrayFromArray(dataType, value, wrapOptions);
}
function* arrayFromJson(dataType, input, wrapOptions) {
    if (!wrapOptions.allowJson) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "JSON input must be explicitly enabled");
    }
    if (typeof input !== "string") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a string");
    }
    let parsedInput;
    try {
        parsedInput = JSON.parse(input);
    }
    catch (error) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, `Input was not valid JSON: ${error.message}`);
    }
    return yield* arrayFromArray(dataType, parsedInput, wrapOptions);
}
function* arrayFromTypeValueInput(dataType, input, wrapOptions) {
    if (!Utils.isTypeValueInput(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a type/value pair");
    }
    if (input.type !== "array") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.specifiedTypeMessage(input.type));
    }
    //don't turn on loose here, only do that for non-container types!
    return yield* (0, dispatch_1.wrapWithCases)(dataType, input.value, wrapOptions, arrayCasesBasic);
}
function* arrayFailureCase(dataType, input, wrapOptions) {
    throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 2, "Input was not an array, type/value pair or wrapped array");
}
//tuple/struct cases;
//note even with loose turned off, we won't distinguish
//between tuples and structs
function* tupleFromArray(dataType, input, wrapOptions) {
    //first: obtain the types of the members
    if (!Array.isArray(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not an array");
    }
    debug("input is array");
    const memberTypes = memberTypesForType(dataType, wrapOptions.userDefinedTypes);
    if (memberTypes.length !== input.length) {
        debug("input is wrong-length array");
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrongArrayLengthMessage(memberTypes.length, input.length));
    }
    //can't do yield in a map, so manual loop here
    let value = [];
    for (let index = 0; index < input.length; index++) {
        const memberName = memberTypes[index].name;
        debug("wrapping %s", memberName);
        value.push({
            name: memberName,
            value: yield* wrap(memberTypes[index].type, input[index], Object.assign(Object.assign({}, wrapOptions), { name: memberName
                    ? wrapOptions.name.match(/^<.*>$/) //hack?
                        ? memberName
                        : `${wrapOptions.name}.${memberName}`
                    : `${wrapOptions.name}[${index}]`, specificityFloor: 5 }))
        });
    }
    //we need to coerce here because TS doesn't know that if it's a struct
    //then everything has a name
    return {
        type: dataType,
        kind: "value",
        value,
        interpretations: {}
    };
}
function* tupleFromObject(dataType, input, wrapOptions) {
    if (!Utils.isPlainObject(input)) {
        //just checks that it's an object & not null
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a non-null object");
    }
    if (!wrapOptions.loose && Utils.isTypeValueInput(input)) {
        //let's exclude these unless loose is turned on
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was a type/value pair");
    }
    if (!wrapOptions.loose && Utils.isWrappedResult(input)) {
        //similarly here
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was a wrapped result");
    }
    const memberTypes = memberTypesForType(dataType, wrapOptions.userDefinedTypes);
    if (memberTypes.some(({ name }) => !name)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 4, "Plain object input is allowed only when all elements of tuple are named");
    }
    let unusedKeys = new Set(Object.keys(input));
    let value = [];
    for (let index = 0; index < memberTypes.length; index++) {
        //note we had better process these in order!
        const memberName = memberTypes[index].name;
        if (!(memberName in input)) {
            throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 4, `Missing key from tuple or struct: ${memberName}`);
        }
        unusedKeys.delete(memberName);
        value.push({
            name: memberName,
            value: yield* wrap(memberTypes[index].type, input[memberName], Object.assign(Object.assign({}, wrapOptions), { name: `${wrapOptions.name}.${memberName}`, specificityFloor: 4 //not sure this warrants a 5
             }))
        });
    }
    if (!wrapOptions.loose) {
        if (unusedKeys.size > 0) {
            //choose one arbitrarily
            const exampleKey = unusedKeys.values().next().value;
            throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 4, `Unknown key ${exampleKey} included`);
        }
    }
    //we need to coerce here because TS doesn't know that if it's a struct
    //then everything has a name
    return {
        type: dataType,
        kind: "value",
        value
    };
}
function* tupleFromJson(dataType, input, wrapOptions) {
    if (!wrapOptions.allowJson) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "JSON input must be explicitly enabled");
    }
    if (typeof input !== "string") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a string");
    }
    let parsedInput;
    try {
        parsedInput = JSON.parse(input);
    }
    catch (error) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, `Input was not valid JSON: ${error.message}`);
    }
    debug("input is JSON");
    debug("parses to: %O", parsedInput);
    return yield* (0, dispatch_1.wrapWithCases)(dataType, parsedInput, wrapOptions, [
        tupleFromObject,
        tupleFromArray
    ]);
}
function* tupleFromCodecTupleLikeValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "tuple" && input.type.typeClass !== "struct") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    //not going to do much typechecking here as it'll be handled in the call
    //to tupleFromArray
    //Typescript complains if I try to say it can be either struct or
    //tuple, so, uh, let's just tell it it's a tuple <shrug>
    const coercedInput = input; //HACK!
    //note that we do *not* just copy over input.value, but rather we
    //defer to tupleFromArray; this is because there might be some elements
    //where the type is not the same but is compatible
    return yield* tupleFromArray(dataType, coercedInput.value.map(({ value }) => value), wrapOptions);
}
function* tupleFromTypeValueInput(dataType, input, wrapOptions) {
    if (!Utils.isTypeValueInput(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a type/value pair");
    }
    if (input.type !== "tuple" && input.type !== "struct") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.specifiedTypeMessage(input.type));
    }
    //don't turn on loose here, only do that for non-container types!
    return yield* (0, dispatch_1.wrapWithCases)(dataType, input.value, wrapOptions, tupleCasesBasic);
}
function* tupleFailureCase(dataType, input, wrapOptions) {
    throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 2, "Input was not an array, plain object, type/value pair or wrapped tuple or struct");
}
function memberTypesForType(dataType, userDefinedTypes) {
    switch (dataType.typeClass) {
        case "tuple":
            return dataType.memberTypes;
            break;
        case "struct":
            debug("wrapping for struct %s", dataType.typeName);
            return (Format.Types.fullType(dataType, userDefinedTypes)).memberTypes;
    }
}
//udvt cases
function* udvtFromUnderlying(dataType, input, wrapOptions) {
    const { underlyingType } = (Format.Types.fullType(dataType, wrapOptions.userDefinedTypes));
    const value = yield* wrap(underlyingType, input, wrapOptions);
    return {
        type: dataType,
        kind: "value",
        value: value,
        interpretations: {}
    };
}
//tx options cases
function* optionsFromObject(dataType, input, wrapOptions) {
    if (!Utils.isPlainObject(input)) {
        //just checks that it's an object & not null
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a non-null object");
    }
    debug("options input is object: %O", input);
    debug("wrapOptions: %O", wrapOptions);
    if (!wrapOptions.loose && Utils.isWrappedResult(input)) {
        //similarly here
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was a wrapped result");
    }
    //now... the main case
    let value = {};
    const uintKeys = [
        "gas",
        "gasPrice",
        "value",
        "nonce",
        "maxFeePerGas",
        "maxPriorityFeePerGas"
    ];
    const uint8Keys = ["type"];
    const addressKeys = ["from", "to"];
    const bytesKeys = ["data"];
    const boolKeys = ["overwrite"];
    const accessListKeys = ["accessList"];
    const specialKeys = ["privateFor"];
    const allKeys = [
        ...uintKeys,
        ...uint8Keys,
        ...addressKeys,
        ...bytesKeys,
        ...boolKeys,
        ...accessListKeys,
        ...specialKeys
    ];
    const badKey = Object.keys(input).find(key => !allKeys.includes(key));
    const goodKey = Object.keys(input).find(key => allKeys.includes(key));
    if (badKey !== undefined && !wrapOptions.oldOptionsBehavior) {
        //note we allow extra keys if oldOptionsBehavior is on -- this is a HACK
        //to preserve existing behavior of Truffle Contract (perhaps we can
        //change this in Truffle 6)
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 4, `Transaction options included unknown option ${badKey}`);
    }
    if (wrapOptions.oldOptionsBehavior && goodKey === undefined) {
        //similarly, if oldOptionsBehavior is on, we require at least
        //one *legit* key (again, HACK to preserve existing behavior,
        //maybe remove this in Truffle 6)
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 4, `Transaction options included no recognized options`);
    }
    //otherwise, if all keys are transaction options, let's process them...
    //part 1: uint options
    for (const key of uintKeys) {
        //note we check input[key] !== undefined, rather than key in input,
        //because if one of them is undefined we want to just allow that but ignore it
        if (input[key] !== undefined) {
            const wrappedOption = (yield* (0, dispatch_1.wrapWithCases)({ typeClass: "uint", bits: 256 }, input[key], Object.assign(Object.assign({}, wrapOptions), { name: `${wrapOptions.name}.${key}` }), integer_1.integerCases));
            value[key] = wrappedOption.value.asBN;
        }
    }
    //part 2: uint8 options (just type for now)
    for (const key of uint8Keys) {
        if (input[key] !== undefined) {
            const wrappedOption = (yield* (0, dispatch_1.wrapWithCases)({ typeClass: "uint", bits: 8 }, input[key], Object.assign(Object.assign({}, wrapOptions), { name: `${wrapOptions.name}.${key}` }), integer_1.integerCases));
            const asBN = wrappedOption.value.asBN;
            //since this is just type right now, we're going to reject illegal types
            if (asBN.gten(0xc0)) {
                //not making a constant for this, this is its only use here
                throw new errors_1.TypeMismatchError(dataType, input, `${wrapOptions.name}.type`, 4, "Transaction types must be less than 0xc0");
            }
            //for compatibility, we give type as a hex string rather than
            //leaving it as a BN.  Since it's unsigned we don't have to
            //worry about negatives.
            value[key] = Conversion.toHexString(asBN);
        }
    }
    //part 3: address options
    for (const key of addressKeys) {
        if (input[key] !== undefined) {
            const wrappedOption = (yield* (0, dispatch_1.wrapWithCases)({ typeClass: "address", kind: "general" }, input[key], Object.assign(Object.assign({}, wrapOptions), { name: `${wrapOptions.name}.${key}` }), address_1.addressCases));
            value[key] = wrappedOption.value.asAddress;
        }
    }
    //part 4: bytestring options
    for (const key of bytesKeys) {
        if (input[key] !== undefined) {
            const wrappedOption = yield* (0, dispatch_1.wrapWithCases)({ typeClass: "bytes", kind: "dynamic" }, input[key], Object.assign(Object.assign({}, wrapOptions), { name: `${wrapOptions.name}.${key}` }), bytes_1.bytesCases);
            value[key] = wrappedOption.value.asHex;
        }
    }
    //part 5: boolean options
    for (const key of boolKeys) {
        if (input[key] !== undefined) {
            const wrappedOption = yield* (0, dispatch_1.wrapWithCases)({ typeClass: "bool" }, input[key], Object.assign(Object.assign({}, wrapOptions), { name: `${wrapOptions.name}.${key}` }), bool_1.boolCases);
            value[key] = wrappedOption.value.asBoolean;
        }
    }
    //part 6: the access list
    for (const key of accessListKeys) {
        if (input[key] !== undefined) {
            const wrappedOption = yield* (0, dispatch_1.wrapWithCases)({
                typeClass: "array",
                kind: "dynamic",
                baseType: {
                    typeClass: "tuple",
                    memberTypes: [
                        {
                            name: "address",
                            type: {
                                typeClass: "address",
                                kind: "general"
                            }
                        },
                        {
                            name: "storageKeys",
                            type: {
                                typeClass: "array",
                                kind: "dynamic",
                                baseType: {
                                    //we use uint256 rather than bytes32 to allow
                                    //abbreviating and left-padding
                                    typeClass: "uint",
                                    bits: 256
                                }
                            }
                        }
                    ]
                }
            }, input[key], Object.assign(Object.assign({}, wrapOptions), { name: `${wrapOptions.name}.${key}` }), exports.arrayCases);
            value[key] = Format.Utils.Inspect.nativizeAccessList(wrappedOption);
        }
    }
    //part 7: the special case of privateFor
    if (input.privateFor !== undefined) {
        //this doesn't correspond to any of our usual types, so we have to handle it specially
        if (!Array.isArray(input.privateFor)) {
            throw new errors_1.TypeMismatchError(dataType, input, `${wrapOptions.name}.privateFor`, 4, "Transaction option privateFor should be an array of base64-encoded bytestrings of 32 bytes");
        }
        value.privateFor = input.privateFor.map((publicKey, index) => {
            if (Utils.isBoxedString(publicKey)) {
                publicKey = publicKey.valueOf();
            }
            if (typeof publicKey !== "string") {
                throw new errors_1.TypeMismatchError(dataType, input, `${wrapOptions.name}.privateFor`, 4, `Public key at index ${index} is not a string`);
            }
            if (!Utils.isBase64(publicKey)) {
                throw new errors_1.TypeMismatchError(dataType, input, `${wrapOptions.name}.privateFor`, 4, `Public key at index ${index} is not base64-encoded`);
            }
            const length = Utils.base64Length(publicKey);
            if (length !== 32) {
                throw new errors_1.TypeMismatchError(dataType, input, `${wrapOptions.name}.privateFor`, 4, `Public key at index ${index} should encode a bytestring of 32 bytes; got ${length} bytes instead`);
            }
            return publicKey;
        });
    }
    return {
        type: dataType,
        kind: "value",
        value,
        interpretations: {}
    };
}
function* optionsFromCodecOptionsValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "options") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    const value = input.value;
    //unlike in the array or tuple cases, here should not have
    //to worry about compatible-but-not-identical types, so it's
    //safe to just copy value over
    return {
        type: dataType,
        kind: "value",
        value,
        interpretations: {}
    };
}
function* optionsFromTypeValueInput(dataType, input, wrapOptions) {
    if (!Utils.isTypeValueInput(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a type/value pair");
    }
    if (input.type !== "options") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.specifiedTypeMessage(input.type));
    }
    //because options, unlike other containers, has specific types, we *will* turn on loose
    return yield* (0, dispatch_1.wrapWithCases)(dataType, input.value, Object.assign(Object.assign({}, wrapOptions), { loose: true }), txOptionsCasesBasic);
}
function* optionsFailureCase(dataType, input, wrapOptions) {
    throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 2, "Transaction options input was not a plain object, type/value pair or wrapped options object");
}
//# sourceMappingURL=wrap.js.map