"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxSafeInteger = void 0;
const IntegerArbitrary_1 = require("./_internals/IntegerArbitrary");
function maxSafeInteger() {
    return new IntegerArbitrary_1.IntegerArbitrary(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
}
exports.maxSafeInteger = maxSafeInteger;
