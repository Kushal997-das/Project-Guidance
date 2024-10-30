"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanBool = exports.countDecimalPlaces = exports.shiftBigDown = exports.shiftBigUp = exports.stringToBytes = exports.toBytes = exports.toHexString = exports.toBig = exports.toBigInt = exports.toSignedBN = exports.isBig = exports.toBN = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("codec:conversion");
const bn_js_1 = __importDefault(require("bn.js"));
const big_js_1 = __importDefault(require("big.js"));
const utf8_1 = __importDefault(require("utf8"));
/**
 * @param bytes - undefined | string | number | BN | Uint8Array | Big
 * @return {BN}
 */
function toBN(bytes) {
    if (bytes === undefined) {
        return undefined;
    }
    else if (typeof bytes === "string") {
        return new bn_js_1.default(bytes, 16);
    }
    else if (typeof bytes === "bigint") {
        return new bn_js_1.default(bytes.toString(16), 16);
    }
    else if (typeof bytes == "number" || bn_js_1.default.isBN(bytes)) {
        return new bn_js_1.default(bytes);
    }
    else if (isBig(bytes)) {
        return new bn_js_1.default(bytes.toFixed()); //warning, better hope input is integer!
        //note: going through string may seem silly but it's actually not terrible here,
        //since BN is binary-based and Big is decimal-based
        //[toFixed is like toString except it guarantees scientific notation is not used]
    }
    else if (typeof bytes.reduce === "function") {
        return bytes.reduce((num, byte) => num.shln(8).addn(byte), new bn_js_1.default(0));
    }
}
exports.toBN = toBN;
//Big doesnt provide this function, so we'll make one ourselves
//HACK
function isBig(input) {
    return (typeof input === "object" &&
        input !== null &&
        (input.s === 1 || input.s === -1) &&
        typeof input.e === "number" &&
        Array.isArray(input.c) &&
        //we want to be sure this is *not* a BigNumber instead,
        //but we can't use isBigNumber here because we don't want
        //to import that library here, so, HACK, we'll check that
        //it lacks a particular BigNumber method that would be meaningless
        //for Bigs
        !input.isFinite);
    //(BigNumbers have this method because it supports Infinity and NaN,
    //but Big doesn't, so this method doesn't exist, because it would
    //be pointless)
}
exports.isBig = isBig;
/**
 * @param bytes - Uint8Array
 * @return {BN}
 */
function toSignedBN(bytes) {
    if (bytes[0] < 0x80) {
        // if first bit is 0
        return toBN(bytes);
    }
    else {
        return toBN(bytes.map(b => 0xff - b))
            .addn(1)
            .neg();
    }
}
exports.toSignedBN = toSignedBN;
function toBigInt(value) {
    //BN is binary-based, so we convert by means of a hex string in order
    //to avoid having to do a binary-decimal conversion and back :P
    return !value.isNeg()
        ? BigInt("0x" + value.toString(16))
        : -BigInt("0x" + value.neg().toString(16)); //can't directly make negative BigInt from hex string
}
exports.toBigInt = toBigInt;
function toBig(value) {
    //note: going through string may seem silly but it's actually not terrible here,
    //since BN (& number) is binary-based and Big is decimal-based
    return new big_js_1.default(value.toString());
}
exports.toBig = toBig;
/**
 * @param bytes - Uint8Array | BN | bigint
 * @param padLength - number - minimum desired byte length (left-pad with zeroes)
 * @param padRight - boolean - causes padding to occur on right instead of left
 * @return {string}
 */
function toHexString(bytes, padLength = 0, padRight = false) {
    if (bn_js_1.default.isBN(bytes) ||
        typeof bytes === "bigint" ||
        typeof bytes === "number" ||
        isBig(bytes)) {
        bytes = toBytes(bytes);
    }
    const pad = (s) => `${"00".slice(0, 2 - s.length)}${s}`;
    //                                          0  1  2  3  4
    //                                 0  1  2  3  4  5  6  7
    // bytes.length:        5  -  0x(          e5 c2 aa 09 11 )
    // length (preferred):  8  -  0x( 00 00 00 e5 c2 aa 09 11 )
    //                                `--.---'
    //                                     offset 3
    if (bytes.length < padLength) {
        let prior = bytes;
        bytes = new Uint8Array(padLength);
        if (padRight) {
            //unusual case: pad on right
            bytes.set(prior);
        }
        else {
            //usual case
            bytes.set(prior, padLength - prior.length);
        }
    }
    debug("bytes: %o", bytes);
    let string = bytes.reduce((str, byte) => `${str}${pad(byte.toString(16))}`, "");
    return `0x${string}`;
}
exports.toHexString = toHexString;
function toBytes(data, length = 0) {
    //note that length is a minimum output length
    //strings will be 0-padded on left
    //numbers/BNs will be sign-padded on left
    //NOTE: if a number/BN is passed in that is too big for the given length,
    //you will get an error!
    //(note that strings passed in should be hex strings; this is not for converting
    //generic strings to hex)
    if (typeof data === "bigint") {
        data = data.toString(16);
    }
    if (typeof data === "string") {
        let hex = data; //renaming for clarity
        if (hex.startsWith("0x")) {
            hex = hex.slice(2);
        }
        if (hex === "") {
            //this special case is necessary because the match below will return null,
            //not an empty array, when given an empty string
            return new Uint8Array(0);
        }
        if (hex.length % 2 == 1) {
            hex = `0${hex}`;
        }
        let bytes = new Uint8Array(hex.match(/.{2}/g).map(byte => parseInt(byte, 16)));
        if (bytes.length < length) {
            let prior = bytes;
            bytes = new Uint8Array(length);
            bytes.set(prior, length - prior.length);
        }
        return bytes;
    }
    else {
        // BN/Big/number case
        if (typeof data === "number") {
            data = new bn_js_1.default(data);
        }
        else if (isBig(data)) {
            //note: going through string may seem silly but it's actually not terrible here,
            //since BN is binary-based and Big is decimal-based
            data = new bn_js_1.default(data.toFixed());
            //[toFixed is like toString except it guarantees scientific notation is not used]
        }
        //note that the argument for toTwos is given in bits
        return data.toTwos(length * 8).toArrayLike(Uint8Array, "be", length);
        //big-endian
    }
}
exports.toBytes = toBytes;
function stringToBytes(input) {
    input = utf8_1.default.encode(input);
    let bytes = new Uint8Array(input.length);
    for (let i = 0; i < input.length; i++) {
        bytes[i] = input.charCodeAt(i);
    }
    return bytes;
    //NOTE: this will throw an error if the string contained malformed UTF-16!
    //but, well, it shouldn't contain that...
}
exports.stringToBytes = stringToBytes;
//computes value * 10**decimalPlaces
function shiftBigUp(value, decimalPlaces) {
    let newValue = new big_js_1.default(value);
    newValue.e += decimalPlaces;
    return newValue;
}
exports.shiftBigUp = shiftBigUp;
//computes value * 10**-decimalPlaces
function shiftBigDown(value, decimalPlaces) {
    let newValue = new big_js_1.default(value);
    newValue.e -= decimalPlaces;
    return newValue;
}
exports.shiftBigDown = shiftBigDown;
function countDecimalPlaces(value) {
    return Math.max(0, value.c.length - value.e - 1);
}
exports.countDecimalPlaces = countDecimalPlaces;
//converts out of range booleans to true; something of a HACK
//NOTE: does NOT do this recursively inside structs, arrays, etc!
//I mean, those aren't elementary and therefore aren't in the domain
//anyway, but still
function cleanBool(result) {
    switch (result.kind) {
        case "value":
            return result;
        case "error":
            switch (result.error.kind) {
                case "BoolOutOfRangeError":
                    //return true
                    return {
                        type: result.type,
                        kind: "value",
                        value: {
                            asBoolean: true
                        },
                        interpretations: {}
                    };
                default:
                    return result;
            }
    }
}
exports.cleanBool = cleanBool;
//# sourceMappingURL=conversion.js.map