"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxSafeNat = void 0;
const IntegerArbitrary_1 = require("./_internals/IntegerArbitrary");
function maxSafeNat() {
    return new IntegerArbitrary_1.IntegerArbitrary(0, Number.MAX_SAFE_INTEGER);
}
exports.maxSafeNat = maxSafeNat;
