"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigUintN = void 0;
const BigIntArbitrary_1 = require("./_internals/BigIntArbitrary");
function bigUintN(n) {
    if (n < 0) {
        throw new Error('fc.bigUintN expects requested number of bits to be superior or equal to 0');
    }
    const min = BigInt(0);
    const max = (BigInt(1) << BigInt(n)) - BigInt(1);
    return new BigIntArbitrary_1.BigIntArbitrary(min, max);
}
exports.bigUintN = bigUintN;
