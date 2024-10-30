"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixedCase = void 0;
const MixedCaseArbitrary_1 = require("./_internals/MixedCaseArbitrary");
function defaultToggleCase(rawChar) {
    const upper = rawChar.toUpperCase();
    if (upper !== rawChar)
        return upper;
    return rawChar.toLowerCase();
}
function mixedCase(stringArb, constraints) {
    if (typeof BigInt === 'undefined') {
        throw new Error(`mixedCase requires BigInt support`);
    }
    const toggleCase = (constraints && constraints.toggleCase) || defaultToggleCase;
    const untoggleAll = constraints && constraints.untoggleAll;
    return new MixedCaseArbitrary_1.MixedCaseArbitrary(stringArb, toggleCase, untoggleAll);
}
exports.mixedCase = mixedCase;
