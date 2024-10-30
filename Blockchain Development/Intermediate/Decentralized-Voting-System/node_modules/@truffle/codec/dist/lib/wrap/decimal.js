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
exports.decimalCases = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("codec:wrap:decimal");
const dispatch_1 = require("./dispatch");
const errors_1 = require("./errors");
const Conversion = __importStar(require("../conversion"));
const Utils = __importStar(require("./utils"));
const Messages = __importStar(require("./messages"));
const bn_js_1 = __importDefault(require("bn.js"));
const big_js_1 = __importDefault(require("big.js"));
//note: doesn't include UDVT case,
//or error case
const decimalFromWrappedValueCases = [
    decimalFromCodecDecimalValue,
    decimalFromCodecIntegerValue,
    decimalFromCodecEnumValue
];
const decimalCasesBasic = [
    decimalFromNumber,
    decimalFromString,
    decimalFromBoxedNumber,
    decimalFromBoxedString,
    decimalFromBigint,
    decimalFromBN,
    decimalFromBig,
    ...decimalFromWrappedValueCases,
    decimalFromCodecUdvtValue,
    decimalFromCodecEnumError,
    decimalFromOther //must go last!
];
exports.decimalCases = [decimalFromTypeValueInput, ...decimalCasesBasic];
function* decimalFromBig(dataType, input, wrapOptions) {
    if (!Conversion.isBig(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a Big");
    }
    const asBig = input.plus(0); //clone
    validate(dataType, asBig, input, wrapOptions.name);
    return {
        //IDK why TS is screwing up here
        type: dataType,
        kind: "value",
        value: {
            asBig
        }
    };
}
function* decimalFromBN(dataType, input, wrapOptions) {
    if (!bn_js_1.default.isBN(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a BN");
    }
    const asBig = Conversion.toBig(input);
    validate(dataType, asBig, input, wrapOptions.name);
    return {
        //IDK why TS is screwing up here
        type: dataType,
        kind: "value",
        value: {
            asBig
        }
    };
}
function* decimalFromBigint(dataType, input, wrapOptions) {
    if (typeof input !== "bigint") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a bigint");
    }
    const asBig = Conversion.toBig(input);
    validate(dataType, asBig, input, wrapOptions.name);
    return {
        //IDK why TS is screwing up here
        type: dataType,
        kind: "value",
        value: {
            asBig
        }
    };
}
function* decimalFromString(dataType, input, wrapOptions) {
    if (typeof input !== "string") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a string");
    }
    const trimmed = input.trim(); //allow whitespace
    const stripped = Utils.removeUnderscoresNoHex(trimmed);
    let asBig;
    try {
        asBig = new big_js_1.default(stripped);
    }
    catch (_a) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.nonNumericMessage);
    }
    validate(dataType, asBig, input, wrapOptions.name);
    return {
        //IDK why TS is screwing up here
        type: dataType,
        kind: "value",
        value: {
            asBig
        }
    };
}
function* decimalFromNumber(dataType, input, wrapOptions) {
    if (typeof input !== "number") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a number");
    }
    if (!Number.isFinite(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, "Numeric value is not finite");
    }
    if (!Utils.isSafeNumber(dataType, input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, "Given number is outside the safe range for this data type (possible loss of precision); use a numeric string, bigint, or big number class instead");
    }
    const asBig = new big_js_1.default(input);
    validate(dataType, asBig, input, wrapOptions.name);
    return {
        //IDK why TS is screwing up here
        type: dataType,
        kind: "value",
        value: {
            asBig
        }
    };
}
function* decimalFromBoxedString(dataType, input, wrapOptions) {
    if (!Utils.isBoxedString(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a boxed string");
    }
    //unbox and try again
    return yield* decimalFromString(dataType, input.valueOf(), wrapOptions);
}
function* decimalFromBoxedNumber(dataType, input, wrapOptions) {
    if (!Utils.isBoxedNumber(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a boxed number");
    }
    //unbox and try again
    return yield* decimalFromNumber(dataType, input.valueOf(), wrapOptions);
}
function* decimalFromCodecDecimalValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "fixed" && input.type.typeClass !== "ufixed") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    if (!wrapOptions.loose &&
        (input.type.typeClass !== dataType.typeClass ||
            input.type.bits !== dataType.bits ||
            input.type.places !== dataType.places)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    const asBig = input.value.asBig.plus(0); //clone
    validate(dataType, asBig, input, wrapOptions.name);
    return {
        //IDK why TS is screwing up here
        type: dataType,
        kind: "value",
        value: {
            asBig
        }
    };
}
function* decimalFromCodecIntegerValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "int" && input.type.typeClass !== "uint") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    if (!wrapOptions.loose) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    const asBig = Conversion.toBig(input.value.asBN);
    validate(dataType, asBig, input, wrapOptions.name);
    return {
        //IDK why TS is screwing up here
        type: dataType,
        kind: "value",
        value: {
            asBig
        }
    };
}
function* decimalFromCodecEnumValue(dataType, input, wrapOptions) {
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
    if (!wrapOptions.loose) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    const asBig = Conversion.toBig(input.value.numericAsBN);
    validate(dataType, asBig, input, wrapOptions.name);
    return {
        //IDK why TS is screwing up here
        type: dataType,
        kind: "value",
        value: {
            asBig
        }
    };
}
function* decimalFromCodecEnumError(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "enum") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "error") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Wrapped result was a value rather than an error");
    }
    if (!wrapOptions.loose) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    const coercedInput = input;
    //only one specific kind of error will be allowed
    if (coercedInput.error.kind !== "EnumOutOfRangeError") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    const asBig = Conversion.toBig(coercedInput.error.rawAsBN);
    validate(dataType, asBig, input, wrapOptions.name);
    return {
        //IDK why TS is screwing up here
        type: dataType,
        kind: "value",
        value: {
            asBig
        }
    };
}
function* decimalFromCodecUdvtValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "userDefinedValueType") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    return yield* (0, dispatch_1.wrapWithCases)(dataType, input.value, wrapOptions, decimalFromWrappedValueCases);
}
function* decimalFromTypeValueInput(dataType, input, wrapOptions) {
    if (!Utils.isTypeValueInput(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a type/value pair");
    }
    if (!input.type.match(/^u?fixed(\d+(x\d+)?)?$/) && input.type !== "decimal") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.specifiedTypeMessage(input.type));
    }
    let bits, places;
    let typeClass;
    if (input.type === "decimal") {
        //vyper's decimal type corresponds to fixed168x10
        typeClass = "fixed";
        bits = 168;
        places = 10;
    }
    else {
        const [_0, typeClassTemporary, _2, bitsAsString, _4, placesAsString] = input.type.match(/^(u?fixed)((\d+)(x(\d+))?)?$/);
        //not all of the fields in this match are used, so we discard them into _n variables
        bits = bitsAsString ? Number(bitsAsString) : 128; //defaults to 128
        places = placesAsString ? Number(placesAsString) : 18; //defaults to 18
        typeClass = typeClassTemporary;
    }
    if (dataType.typeClass !== typeClass ||
        dataType.bits !== bits ||
        dataType.places !== places) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.specifiedTypeMessage(input.type));
    }
    //extract value & try again, with loose option turned on
    return yield* (0, dispatch_1.wrapWithCases)(dataType, input.value, Object.assign(Object.assign({}, wrapOptions), { loose: true }), decimalCasesBasic);
}
function* decimalFromOther(dataType, input, wrapOptions) {
    const request = { kind: "decimal", input };
    const response = yield request;
    if (response.kind !== "decimal") {
        throw new errors_1.BadResponseTypeError(request, response);
    }
    if (response.value === null) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, response.partiallyRecognized ? 5 : 3, response.reason || Messages.unrecognizedNumberMessage(dataType));
    }
    const asBig = response.value.plus(0); //clone
    validate(dataType, asBig, input, wrapOptions.name);
    return {
        //IDK why TS is screwing up here
        type: dataType,
        kind: "value",
        value: {
            asBig
        }
    };
}
function validate(dataType, asBig, input, //just for errors
name //for errors
) {
    if (Conversion.countDecimalPlaces(asBig) > dataType.places) {
        throw new errors_1.TypeMismatchError(dataType, input, name, 5, Messages.tooPreciseMessage(dataType.places, Conversion.countDecimalPlaces(asBig)));
    }
    if (asBig.gt(Utils.maxValue(dataType)) ||
        asBig.lt(Utils.minValue(dataType))) {
        throw new errors_1.TypeMismatchError(dataType, input, name, 5, Messages.outOfRangeMessage);
    }
}
//# sourceMappingURL=decimal.js.map