"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigInt64Array = void 0;
const bigInt_1 = require("./bigInt");
const TypedIntArrayArbitraryBuilder_1 = require("./_internals/builders/TypedIntArrayArbitraryBuilder");
function bigInt64Array(constraints = {}) {
    return (0, TypedIntArrayArbitraryBuilder_1.typedIntArrayArbitraryArbitraryBuilder)(constraints, BigInt('-9223372036854775808'), BigInt('9223372036854775807'), BigInt64Array, bigInt_1.bigInt);
}
exports.bigInt64Array = bigInt64Array;
