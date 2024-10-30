"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigUint64Array = void 0;
const bigInt_1 = require("./bigInt");
const TypedIntArrayArbitraryBuilder_1 = require("./_internals/builders/TypedIntArrayArbitraryBuilder");
function bigUint64Array(constraints = {}) {
    return (0, TypedIntArrayArbitraryBuilder_1.typedIntArrayArbitraryArbitraryBuilder)(constraints, BigInt(0), BigInt('18446744073709551615'), BigUint64Array, bigInt_1.bigInt);
}
exports.bigUint64Array = bigUint64Array;
