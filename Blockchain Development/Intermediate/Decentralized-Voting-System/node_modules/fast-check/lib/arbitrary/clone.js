"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
const CloneArbitrary_1 = require("./_internals/CloneArbitrary");
function clone(arb, numValues) {
    return new CloneArbitrary_1.CloneArbitrary(arb, numValues);
}
exports.clone = clone;
