import { IntegerArbitrary } from './_internals/IntegerArbitrary.js';
export function maxSafeNat() {
    return new IntegerArbitrary(0, Number.MAX_SAFE_INTEGER);
}
