import { MixedCaseArbitrary } from './_internals/MixedCaseArbitrary.js';
function defaultToggleCase(rawChar) {
    const upper = rawChar.toUpperCase();
    if (upper !== rawChar)
        return upper;
    return rawChar.toLowerCase();
}
export function mixedCase(stringArb, constraints) {
    if (typeof BigInt === 'undefined') {
        throw new Error(`mixedCase requires BigInt support`);
    }
    const toggleCase = (constraints && constraints.toggleCase) || defaultToggleCase;
    const untoggleAll = constraints && constraints.untoggleAll;
    return new MixedCaseArbitrary(stringArb, toggleCase, untoggleAll);
}
