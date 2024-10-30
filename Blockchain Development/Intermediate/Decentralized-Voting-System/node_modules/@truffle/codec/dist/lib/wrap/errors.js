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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadResponseTypeError = exports.TypeMismatchError = exports.NoUniqueBestOverloadError = exports.NoOverloadsMatchedError = void 0;
const Format = __importStar(require("../format"));
/**
 * This error indicates that no overloads matched when performing
 * overload resolution.  If there was only one plausible match,
 * a [[TypeMismatchError]] will be thrown instead.
 * @category Errors
 */
class NoOverloadsMatchedError extends Error {
    constructor(methods, inputs, userDefinedTypes) {
        const message = "Arguments provided did not match any overload";
        super(message);
        this.methods = methods;
        this.inputs = inputs;
        this.userDefinedTypes = userDefinedTypes;
        this.name = "NoOverloadsMatchedError";
    }
}
exports.NoOverloadsMatchedError = NoOverloadsMatchedError;
/**
 * This error indicates that multiple overloads matched during
 * overload resolution, but none of them was the unique best
 * overload.
 * @category Errors
 */
class NoUniqueBestOverloadError extends Error {
    constructor(resolutions) {
        const message = "Could not determine a unique best overload for the given arguments.  " +
            "Please specify the overload explicitly or give the arguments more explicit types.";
        super(message);
        this.resolutions = resolutions;
        this.name = "NoUniqueBestOverloadError";
    }
}
exports.NoUniqueBestOverloadError = NoUniqueBestOverloadError;
/**
 * This error indicates that the given input could not be recognized as the
 * type it was supposed to be.
 * @category Errors
 */
class TypeMismatchError extends Error {
    constructor(dataType, input, variableName, specificity, reason) {
        const message = `Could not interpret input for ${variableName} as type ${Format.Types.typeString(dataType)}.  Reason: ${reason}`;
        super(message);
        this.variableName = variableName;
        this.dataType = dataType;
        this.input = input;
        this.reason = reason;
        this.specificity = specificity;
        this.name = "TypeMismatchError";
    }
}
exports.TypeMismatchError = TypeMismatchError;
class BadResponseTypeError extends Error {
    constructor(request, response) {
        const message = `Got response type ${response.kind} to request type ${request.kind}`;
        super(message);
        this.request = request;
        this.response = response;
        this.name = "BadResponseTypeError";
    }
}
exports.BadResponseTypeError = BadResponseTypeError;
//# sourceMappingURL=errors.js.map