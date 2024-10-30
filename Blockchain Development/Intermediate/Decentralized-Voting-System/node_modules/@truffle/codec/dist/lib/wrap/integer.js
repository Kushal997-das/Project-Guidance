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
exports.integerCases = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("codec:wrap:integer");
const Format = __importStar(require("../format"));
const dispatch_1 = require("./dispatch");
const errors_1 = require("./errors");
const Conversion = __importStar(require("../conversion"));
const Utils = __importStar(require("./utils"));
const Messages = __importStar(require("./messages"));
const bn_js_1 = __importDefault(require("bn.js"));
const big_js_1 = __importDefault(require("big.js"));
const bytes_1 = require("./bytes");
//NOTE: all cases called "integerFrom..." also work for enums.
//The cases labeled "enumFrom..." work only for enums.
//there are no cases that work only for integers and not enums,
//because we always want input for integers to also be valid for enums.
const integerFromStringCases = [
    integerFromIntegerString,
    enumFromNameString,
    integerFromScientificOrUnits,
    integerFromNegatedBaseString,
    integerFromStringFailureCase
];
//note: doesn't include UDVT case,
//or error case
const integerFromWrappedValueCases = [
    integerFromCodecIntegerValue,
    integerFromCodecEnumValue,
    integerFromCodecDecimalValue
];
const integerCasesBasic = [
    ...integerFromStringCases,
    integerFromNumber,
    integerFromBoxedNumber,
    integerFromBoxedString,
    integerFromBigint,
    integerFromBN,
    integerFromBig,
    integerFromUint8ArrayLike,
    ...integerFromWrappedValueCases,
    integerFromCodecEnumError,
    integerFromCodecUdvtValue,
    integerFromOther //must go last!
];
exports.integerCases = [
    integerFromIntegerTypeValueInput,
    enumFromEnumTypeValueInput,
    ...integerCasesBasic
];
function* integerFromIntegerString(dataType, input, wrapOptions) {
    if (typeof input !== "string") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a string");
    }
    if (input.trim() === "") {
        //bigint accepts this but we shouldn't
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, dataType.typeClass === "enum"
            ? Messages.badEnumMessage
            : Messages.nonNumericMessage);
    }
    const stripped = Utils.removeUnderscoresNumeric(input);
    let asBN;
    try {
        //we'll use BigInt to parse integer strings, as it's pretty good at it.
        //Note that it accepts hex/octal/binary with prefixes 0x, 0o, 0b.
        const asBigInt = BigInt(stripped);
        asBN = Conversion.toBN(asBigInt);
    }
    catch (_a) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input string was not an integer string");
    }
    return validateAndWrap(dataType, asBN, wrapOptions, input);
}
//this case handles both scientific notation, and numbers with units
function* integerFromScientificOrUnits(dataType, input, wrapOptions) {
    if (typeof input !== "string") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a string");
    }
    if (input.trim() === "") {
        //the code below accepts this but we shouldn't
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, //only specificity 1 since it's already specificity 5 above
        dataType.typeClass === "enum"
            ? Messages.badEnumMessage
            : Messages.nonNumericMessage);
    }
    const stripped = Utils.removeUnderscoresNoHex(input);
    let [_, quantityString, unit] = stripped.match(/^(.*?)(|wei|gwei|shannon|finney|szabo|ether)\s*$/i); //units will be case insensitive; note this always matches
    quantityString = quantityString.trim(); //Big rejects whitespace, let's allow it
    const unitPlacesTable = {
        //we could accept all of web3's units here, but, that's a little much;
        //we'll just accept the most common ones
        "": 0,
        "wei": 0,
        "gwei": 9,
        "shannon": 9,
        "szabo": 12,
        "finney": 15,
        "ether": 18
    };
    let quantity;
    try {
        quantity = quantityString.match(/^\s*$/)
            ? new big_js_1.default(1) //allow just "ether" e.g.
            : new big_js_1.default(quantityString);
    }
    catch (_a) {
        quantity = null;
    }
    if (quantity === null) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a string using scientific notation or units");
    }
    const places = unitPlacesTable[unit.toLowerCase()];
    const asBig = Conversion.shiftBigUp(quantity, places);
    if (Conversion.countDecimalPlaces(asBig) !== 0) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, unit !== ""
            ? "Input numeric value was not an integral number of wei"
            : Messages.nonIntegerMessage);
    }
    const asBN = Conversion.toBN(asBig);
    return validateAndWrap(dataType, asBN, wrapOptions, input);
}
function* integerFromNegatedBaseString(dataType, input, wrapOptions) {
    if (typeof input !== "string") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a string");
    }
    if (!input.match(/^\s*-/)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a negated numeric string");
    }
    const stripped = Utils.removeUnderscoresNumeric(input);
    let positiveAsBN;
    const [_, positiveString] = stripped.match(/^\s*-(.*)$/);
    try {
        const positive = BigInt(positiveString);
        positiveAsBN = Conversion.toBN(positive);
    }
    catch (_a) {
        positiveAsBN = null;
    }
    if (positiveAsBN === null ||
        positiveString === "" ||
        positiveString.match(/^(-|\s)/)) {
        //no double negation, no bare "-", and no space after the minus!
        //(we do this as a string check, rather than checking if
        //positiveAsBN is >=0, in order to prevent entering e.g. "--" or "- 2")
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, Messages.nonNumericMessage);
    }
    const asBN = positiveAsBN.neg();
    return validateAndWrap(dataType, asBN, wrapOptions, input);
}
function* enumFromNameString(dataType, input, wrapOptions) {
    if (typeof input !== "string") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a string");
    }
    if (dataType.typeClass !== "enum") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, Messages.nonNumericMessage);
    }
    const fullType = (Format.Types.fullType(dataType, wrapOptions.userDefinedTypes));
    const options = fullType.options;
    const components = input.split(".");
    const finalComponent = components[components.length - 1];
    debug("components: %O", components);
    debug("dataType: %O", dataType);
    debug("options: %O", options);
    //the enum can be qualified.  if it's qualified, does the type match?
    let matchingType;
    switch (components.length) {
        case 1:
            //not qualified, automatically matches
            matchingType = true;
            break;
        case 2:
            //qualified by type name, does it match?
            matchingType = components[0] === dataType.typeName;
            break;
        case 3:
            //qualified by type name and contract name, does it match?
            matchingType =
                dataType.kind === "local" &&
                    components[0] === dataType.definingContractName &&
                    components[1] === dataType.typeName;
            break;
        default:
            //no valid reason to have 3 or more periods
            //(and split cannot return an empty array)
            matchingType = false;
    }
    debug("matchingType: %O", matchingType);
    const numeric = matchingType ? options.indexOf(finalComponent) : -1; //if type doesn't match, just indicate error
    debug("numeric: %d", numeric);
    if (numeric === -1) {
        //-1 comes from either our setting it manually above to indicate error,
        //or from a failed indexOf call
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, Messages.badEnumMessage);
    }
    const asBN = new bn_js_1.default(numeric); //whew!
    //now: unlike in every other case, we can skip validation!
    //so let's just wrap and return!
    return {
        type: dataType,
        kind: "value",
        value: {
            numericAsBN: asBN,
            name: finalComponent //we know it matches!
        },
        interpretations: {}
    };
}
function* integerFromStringFailureCase(dataType, input, wrapOptions) {
    if (typeof input !== "string") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a string");
    }
    throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 4, dataType.typeClass === "enum"
        ? Messages.badEnumMessage
        : Messages.nonNumericMessage);
}
function* integerFromBN(dataType, input, wrapOptions) {
    if (!bn_js_1.default.isBN(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a BN");
    }
    const asBN = input.clone();
    return validateAndWrap(dataType, asBN, wrapOptions, input);
}
function* integerFromBigint(dataType, input, wrapOptions) {
    if (typeof input !== "bigint") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a bigint");
    }
    const asBN = Conversion.toBN(input);
    return validateAndWrap(dataType, asBN, wrapOptions, input);
}
function* integerFromNumber(dataType, input, wrapOptions) {
    if (typeof input !== "number") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a number");
    }
    if (!Number.isInteger(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.nonIntegerMessage);
    }
    if (!Number.isSafeInteger(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.nonSafeMessage);
    }
    const asBN = new bn_js_1.default(input);
    return validateAndWrap(dataType, asBN, wrapOptions, input);
}
function* integerFromBig(dataType, input, wrapOptions) {
    if (!Conversion.isBig(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a Big");
    }
    if (Conversion.countDecimalPlaces(input) !== 0) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.nonIntegerMessage);
    }
    const asBN = Conversion.toBN(input);
    return validateAndWrap(dataType, asBN, wrapOptions, input);
}
function* integerFromUint8ArrayLike(dataType, input, wrapOptions) {
    if (!Utils.isUint8ArrayLike(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a Uint8Array-like");
    }
    //the next series of checks is delegated to a helper fn
    (0, bytes_1.validateUint8ArrayLike)(input, dataType, wrapOptions.name); //(this fn just throws an appropriate error if something's bad)
    const asBN = Conversion.toBN(new Uint8Array(input)); //I am surprised TS accepts this!
    return validateAndWrap(dataType, asBN, wrapOptions, input);
}
function* integerFromBoxedNumber(dataType, input, wrapOptions) {
    if (!Utils.isBoxedNumber(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a boxed number");
    }
    //unbox and try again
    return yield* integerFromNumber(dataType, input.valueOf(), wrapOptions);
}
function* integerFromBoxedString(dataType, input, wrapOptions) {
    if (!Utils.isBoxedString(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a boxed string");
    }
    //unbox and try again
    return yield* (0, dispatch_1.wrapWithCases)(dataType, input.valueOf(), wrapOptions, integerFromStringCases);
}
function* integerFromCodecIntegerValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "int" && input.type.typeClass !== "uint") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    if (!wrapOptions.loose &&
        (input.type.typeClass !== dataType.typeClass ||
            input.type.bits !== dataType.bits)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    const asBN = input.value.asBN.clone();
    return validateAndWrap(dataType, asBN, wrapOptions, input);
}
function* integerFromCodecDecimalValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "fixed" && input.type.typeClass !== "ufixed") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    if (!wrapOptions.loose) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    const asBN = Conversion.toBN(input.value.asBig);
    return validateAndWrap(dataType, asBN, wrapOptions, input);
}
function* integerFromCodecEnumValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "enum") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, //only specificity 1 due to EnumError case
        Messages.errorResultMessage);
    }
    if (!wrapOptions.loose &&
        (dataType.typeClass !== "enum" || input.type.id !== dataType.id)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    const asBN = input.value.numericAsBN.clone();
    return validateAndWrap(dataType, asBN, wrapOptions, input);
}
function* integerFromCodecEnumError(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "enum") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "error") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Wrapped result was a value rather than an error");
    }
    if (!wrapOptions.loose &&
        (dataType.typeClass !== "enum" || input.type.id !== dataType.id)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    const coercedInput = input;
    //only one specific kind of error will be allowed
    if (coercedInput.error.kind !== "EnumOutOfRangeError") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    const asBN = coercedInput.error.rawAsBN.clone();
    return validateAndWrap(dataType, asBN, wrapOptions, input);
}
function* integerFromCodecUdvtValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "userDefinedValueType") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    return yield* (0, dispatch_1.wrapWithCases)(dataType, input.value, wrapOptions, integerFromWrappedValueCases);
}
function* integerFromIntegerTypeValueInput(dataType, input, wrapOptions) {
    if (!Utils.isTypeValueInput(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a type/value pair");
    }
    if (!input.type.match(/^u?int\d*$/)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, dataType.typeClass === "enum" ? 1 : 5, 
        //use specificity 5 when getting an integer (which have no alternative),
        //but specificity 1 when getting an enum (which have enum type/value input also)
        Messages.specifiedTypeMessage(input.type));
    }
    const [_, typeClass, bitsAsString] = input.type.match(/^(u?int)(\d*)$/);
    const bits = bitsAsString ? Number(bitsAsString) : 256; //defaults to 256
    //(not using the WORD_SIZE constant due to fixed types bringing its applicability
    //here into question)
    const requiredTypeClass = dataType.typeClass !== "enum" ? dataType.typeClass : "uint"; //allow underlying uint type to work for enums
    //(we handle "enum" given as type in a separate case below)
    const requiredBits = dataType.typeClass !== "enum"
        ? dataType.bits
        : 8 *
            Math.ceil(Math.log2((Format.Types.fullType(dataType, wrapOptions.userDefinedTypes)).options.length) / 8); //compute required bits for enum type (sorry)
    if (requiredTypeClass !== typeClass || requiredBits !== bits) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.specifiedTypeMessage(input.type));
    }
    //extract value & try again, with loose option turned on
    return yield* (0, dispatch_1.wrapWithCases)(dataType, input.value, Object.assign(Object.assign({}, wrapOptions), { loose: true }), integerCasesBasic);
}
function* enumFromEnumTypeValueInput(dataType, input, wrapOptions) {
    if (!Utils.isTypeValueInput(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a type/value pair");
    }
    if (input.type !== "enum") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, dataType.typeClass === "enum" ? 5 : 1, 
        //use specificity 5 when getting an enum (which will have also failed integer type/value input),
        //but specificity 1 when getting an integer (to which this doesn't really apply)
        Messages.specifiedTypeMessage(input.type));
    }
    if (dataType.typeClass !== "enum") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.specifiedTypeMessage(input.type));
    }
    //extract value & try again, with loose option turned on
    //(we'll also coerce the type on this one since we know it's
    //going to be an enum value :P )
    return (yield* (0, dispatch_1.wrapWithCases)(dataType, input.value, Object.assign(Object.assign({}, wrapOptions), { loose: true }), integerCasesBasic));
}
function* integerFromOther(dataType, input, wrapOptions) {
    const request = { kind: "integer", input };
    const response = yield request;
    if (response.kind !== "integer") {
        throw new errors_1.BadResponseTypeError(request, response);
    }
    if (response.value === null) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, response.partiallyRecognized ? 5 : 3, response.reason || Messages.unrecognizedNumberMessage(dataType));
    }
    const asBN = Conversion.toBN(response.value);
    return validateAndWrap(dataType, asBN, wrapOptions, input);
}
function validateAndWrap(dataType, asBN, wrapOptions, input //just for erroring
) {
    switch (dataType.typeClass) {
        case "uint":
            if (asBN.isNeg() || asBN.bitLength() > dataType.bits) {
                throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.outOfRangeMessage);
            }
            return {
                type: dataType,
                kind: "value",
                value: {
                    asBN
                },
                interpretations: {}
            };
        case "int":
            if ((!asBN.isNeg() && asBN.bitLength() >= dataType.bits) || //>= since signed
                (asBN.isNeg() && asBN.neg().subn(1).bitLength() >= dataType.bits)
            //bitLength doesn't work great for negatives so we do this instead
            ) {
                throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.outOfRangeMessage);
            }
            return {
                type: dataType,
                kind: "value",
                value: {
                    asBN
                },
                interpretations: {}
            };
        case "enum":
            const fullType = (Format.Types.fullType(dataType, wrapOptions.userDefinedTypes));
            if (asBN.isNeg() || asBN.gten(fullType.options.length)) {
                throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.outOfRangeEnumMessage);
            }
            return {
                type: dataType,
                kind: "value",
                value: {
                    numericAsBN: asBN,
                    name: fullType.options[asBN.toNumber()]
                },
                interpretations: {}
            };
    }
}
//# sourceMappingURL=integer.js.map