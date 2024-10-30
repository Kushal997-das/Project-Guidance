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
exports.boolCases = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("codec:wrap:bool");
const dispatch_1 = require("./dispatch");
const errors_1 = require("./errors");
const Utils = __importStar(require("./utils"));
const Messages = __importStar(require("./messages"));
const boolCasesBasic = [
    boolFromBoolean,
    boolFromString,
    boolFromBoxedPrimitive,
    boolFromCodecBoolValue,
    boolFromCodecBoolError,
    boolFromCodecUdvtValue,
    boolFromCodecUdvtError,
    boolFromOther //must go last!
];
exports.boolCases = [boolFromTypeValueInput, ...boolCasesBasic];
function* boolFromBoolean(dataType, input, wrapOptions) {
    if (typeof input !== "boolean") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a boolean");
    }
    return {
        type: dataType,
        kind: "value",
        value: {
            asBoolean: input
        },
        interpretations: {}
    };
}
function* boolFromString(dataType, input, wrapOptions) {
    if (typeof input !== "string") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a string");
    }
    const lowerCasedInput = input.toLowerCase();
    if (wrapOptions.strictBooleans &&
        !["true", "false", "1", "0"].includes(lowerCasedInput)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, "Input was not 'true', 'false', '1', or '0'");
    }
    //strings are true unless they're falsy or the case-insensitive strings "false" or "0"
    const asBoolean = Boolean(input) && !["false", "0"].includes(lowerCasedInput);
    return {
        type: dataType,
        kind: "value",
        value: {
            asBoolean
        },
        interpretations: {}
    };
}
function* boolFromBoxedPrimitive(dataType, input, wrapOptions) {
    if (!Utils.isBoxedPrimitive(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a boxed primitive");
    }
    //unbox and try again
    return yield* (0, dispatch_1.wrapWithCases)(dataType, input.valueOf(), wrapOptions, exports.boolCases);
}
function* boolFromCodecBoolValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "bool") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, //only specificity 1 due to BoolError case
        Messages.errorResultMessage);
    }
    const asBoolean = input.value.asBoolean;
    return {
        type: dataType,
        kind: "value",
        value: {
            asBoolean
        },
        interpretations: {}
    };
}
function* boolFromCodecBoolError(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "bool") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "error") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was a value rather than an error");
    }
    //these two error types will be regarded as true
    const allowedErrors = ["BoolOutOfRangeError", "BoolPaddingError"];
    if (!allowedErrors.includes(input.error.kind)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    return {
        type: dataType,
        kind: "value",
        value: {
            asBoolean: true
        },
        interpretations: {}
    };
}
function* boolFromTypeValueInput(dataType, input, wrapOptions) {
    if (!Utils.isTypeValueInput(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a type/value pair");
    }
    if (input.type !== "bool") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.specifiedTypeMessage(input.type));
    }
    //extract value & try again, disallowing type/value input
    return yield* (0, dispatch_1.wrapWithCases)(dataType, input.value, Object.assign(Object.assign({}, wrapOptions), { loose: true }), boolCasesBasic);
}
function* boolFromCodecUdvtValue(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "userDefinedValueType") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "value") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    return yield* boolFromCodecBoolValue(dataType, input.value, wrapOptions);
}
function* boolFromCodecUdvtError(dataType, input, wrapOptions) {
    if (!Utils.isWrappedResult(input)) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was not a wrapped result");
    }
    if (input.type.typeClass !== "userDefinedValueType") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, Messages.wrappedTypeMessage(input.type));
    }
    if (input.kind !== "error") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was a value rather than an error");
    }
    //wrapped errors will have to be unwrapped, others can be rejected
    if (input.error.kind !== "WrappedError") {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 5, Messages.errorResultMessage);
    }
    return yield* boolFromCodecBoolError(dataType, input.error.error, wrapOptions);
}
function* boolFromOther(dataType, input, wrapOptions) {
    //fallback case: just go by truthiness/falsiness
    //(this case has to be last because there are various other
    //cases we do not want to go by truthiness/falsiness!)
    if (Utils.isWrappedResult(input)) {
        //...except for these, which may error
        //(note that we do this even when loose is on!)
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was a wrapped result");
    }
    if (Utils.isTypeValueInput(input)) {
        //...and these, which also may error
        //(note that we do this even when loose is on!)
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 1, "Input was a type/value pair");
    }
    //...and also we don't do this case if strictBooleans is turned on
    if (wrapOptions.strictBooleans) {
        throw new errors_1.TypeMismatchError(dataType, input, wrapOptions.name, 2, "Input was neither a boolean nor a boolean string");
    }
    const asBoolean = Boolean(input);
    return {
        type: dataType,
        kind: "value",
        value: {
            asBoolean
        },
        interpretations: {}
    };
}
//# sourceMappingURL=bool.js.map