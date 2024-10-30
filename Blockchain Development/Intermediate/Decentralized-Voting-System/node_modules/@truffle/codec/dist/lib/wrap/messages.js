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
exports.unrecognizedNumberMessage = exports.wrongLengthMessage = exports.notABytestringMessage = exports.tooPreciseMessage = exports.overlongMessage = exports.specifiedTypeMessage = exports.wrappedTypeMessage = exports.negativeBytesMessage = exports.looseModeOnlyMessage = exports.invalidUtf16Message = exports.checksumFailedMessage = exports.outOfRangeEnumMessage = exports.outOfRangeMessage = exports.badEnumMessage = exports.nonSafeMessage = exports.nonNumericMessage = exports.nonIntegerMessage = exports.notAStringMessage = exports.errorResultMessage = exports.wrongArrayLengthMessage = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("codec:wrap:messages");
const Format = __importStar(require("../format"));
function wrongArrayLengthMessage(expected, got) {
    return `Incorrect array length (expected ${expected.toString()} entries, got ${got})`;
}
exports.wrongArrayLengthMessage = wrongArrayLengthMessage;
exports.errorResultMessage = "Input is a wrapped result representing an error rather than a value";
exports.notAStringMessage = "Input was not a string, type/value pair, or wrapped or boxed string";
exports.nonIntegerMessage = "Input numeric value was not an integer";
exports.nonNumericMessage = "Input string was not numeric";
exports.nonSafeMessage = "Input number is not a Javascript safe integer";
exports.badEnumMessage = "Input string was neither numeric nor a valid enum value";
exports.outOfRangeMessage = "Input is outside the range of this numeric type";
exports.outOfRangeEnumMessage = "Input is outside the range of this enum type";
exports.checksumFailedMessage = "Address checksum failed (use all lowercase or all uppercase to circumvent)";
exports.invalidUtf16Message = "Input string was not valid UTF-16";
exports.looseModeOnlyMessage = "Numeric input for bytes is only allowed in loose mode and only for dynamic-length bytestrings";
exports.negativeBytesMessage = "Input for bytes cannot be negative";
function wrappedTypeMessage(dataType) {
    return `Input is a wrapped value of type ${Format.Types.typeString(dataType)}`;
}
exports.wrappedTypeMessage = wrappedTypeMessage;
function specifiedTypeMessage(dataType) {
    return `Input had type explicitly specified as ${dataType}`;
}
exports.specifiedTypeMessage = specifiedTypeMessage;
function overlongMessage(expected, got) {
    return `Input is too long for type (expected ${expected} bytes, got ${got} bytes)`;
}
exports.overlongMessage = overlongMessage;
function tooPreciseMessage(expected, got) {
    return `Input has too many decimal places for type (expected ${expected} decimal places, got ${got} decimal places)`;
}
exports.tooPreciseMessage = tooPreciseMessage;
function notABytestringMessage(what) {
    return `${what} is not a valid bytestring (even-length hex string)`;
}
exports.notABytestringMessage = notABytestringMessage;
function wrongLengthMessage(what, expected, got) {
    return `Input ${what} was ${got} bytes instead of ${expected} bytes`;
}
exports.wrongLengthMessage = wrongLengthMessage;
function unrecognizedNumberMessage(dataType) {
    const enumMessage = dataType.typeClass === "enum"
        ? "enum value name, "
        : "";
    const byteArrayMessage = dataType.typeClass !== "fixed" && dataType.typeClass !== "ufixed"
        ? "byte-array-like, "
        : "";
    return `Input was not a number, big integer, numeric string, ${enumMessage}type/value pair, boxed number, ${byteArrayMessage}wrapped number or enum, or recognized big number class`;
}
exports.unrecognizedNumberMessage = unrecognizedNumberMessage;
//# sourceMappingURL=messages.js.map