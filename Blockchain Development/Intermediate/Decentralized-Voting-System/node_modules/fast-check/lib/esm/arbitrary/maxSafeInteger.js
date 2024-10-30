import { IntegerArbitrary } from './_internals/IntegerArbitrary.js';
export function maxSafeInteger() {
    return new IntegerArbitrary(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
}
