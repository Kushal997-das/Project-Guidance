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
exports.toAddress = exports.equalData = exports.keccak256 = exports.ZERO_ADDRESS = exports.MAX_WORD = exports.PC_SIZE = exports.SELECTOR_SIZE = exports.ADDRESS_SIZE = exports.WORD_SIZE = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("codec:evm:utils");
const bn_js_1 = __importDefault(require("bn.js"));
const web3_utils_1 = __importDefault(require("web3-utils"));
const Conversion = __importStar(require("../conversion"));
const abi_utils_1 = require("@truffle/abi-utils");
exports.WORD_SIZE = 0x20;
exports.ADDRESS_SIZE = 20;
exports.SELECTOR_SIZE = abi_utils_1.ShortSelectorSize; //equals 4; function & error selectors, not event selectors
exports.PC_SIZE = 4;
exports.MAX_WORD = new bn_js_1.default(-1).toTwos(exports.WORD_SIZE * 8);
exports.ZERO_ADDRESS = "0x" + "00".repeat(exports.ADDRESS_SIZE);
//beware of using this for generic strings! (it's fine for bytestrings, or
//strings representing numbers) if you want to use this on a generic string,
//you should pass in {type: "string", value: theString} instead of the string
//itself.
//(maybe I should add a rawKeccak256 function, using sha3 instead of
//soliditysha3?  not seeing the need atm though)
function keccak256(...args) {
    // debug("args %o", args);
    const rawSha = web3_utils_1.default.soliditySha3(...args);
    debug("rawSha %o", rawSha);
    let sha;
    if (rawSha === null) {
        sha = ""; //HACK, I guess?
    }
    else {
        sha = rawSha.replace(/0x/, "");
    }
    return Conversion.toBN(sha);
}
exports.keccak256 = keccak256;
//checks if two bytearrays (which may be undefined) are equal.
//does not consider undefined to be equal to itself.
function equalData(bytes1, bytes2) {
    if (!bytes1 || !bytes2) {
        return false;
    }
    if (bytes1.length !== bytes2.length) {
        return false;
    }
    for (let i = 0; i < bytes1.length; i++) {
        if (bytes1[i] !== bytes2[i]) {
            return false;
        }
    }
    return true;
}
exports.equalData = equalData;
function toAddress(bytes) {
    if (typeof bytes === "string") {
        //in this case, we can do some simple string manipulation and
        //then pass to web3
        let hex = bytes; //just renaming for clarity
        if (hex.startsWith("0x")) {
            hex = hex.slice(2);
        }
        if (hex.length < 2 * exports.ADDRESS_SIZE) {
            hex = hex.padStart(2 * exports.ADDRESS_SIZE, "0");
        }
        if (hex.length > 2 * exports.ADDRESS_SIZE) {
            hex = "0x" + hex.slice(hex.length - 2 * exports.ADDRESS_SIZE);
        }
        return web3_utils_1.default.toChecksumAddress(hex);
    }
    //otherwise, we're in the Uint8Array case, which we can't fully handle ourself
    //truncate *on left* to 20 bytes
    if (bytes.length > exports.ADDRESS_SIZE) {
        bytes = bytes.slice(bytes.length - exports.ADDRESS_SIZE, bytes.length);
    }
    //now, convert to hex string and apply checksum case that second argument
    //(which ensures it's padded to 20 bytes) shouldn't actually ever be
    //needed, but I'll be safe and include it
    return web3_utils_1.default.toChecksumAddress(Conversion.toHexString(bytes, exports.ADDRESS_SIZE));
}
exports.toAddress = toAddress;
//# sourceMappingURL=utils.js.map