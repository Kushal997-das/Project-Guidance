"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigIntN = void 0;
const BigIntArbitrary_1 = require("./_internals/BigIntArbitrary");
function bigIntN(n) {
    if (n < 1) {
        throw new Error('fc.bigIntN expects requested number of bits to be superior or equal to 1');
    }
    const min = BigInt(-1) << BigInt(n - 1);
    const max = (BigInt(1) << BigInt(n - 1)) - BigInt(1);
    return new BigIntArbitrary_1.BigIntArbitrary(min, max);
}
exports.bigIntN = bigIntN;
