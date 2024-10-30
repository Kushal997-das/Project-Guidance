import { buildAlphaNumericPercentArbitrary } from './_internals/builders/CharacterRangeArbitraryBuilder.js';
import { stringOf } from './stringOf.js';
export function webSegment(constraints = {}) {
    const others = ['-', '.', '_', '~', '!', '$', '&', "'", '(', ')', '*', '+', ',', ';', '=', ':', '@'];
    return stringOf(buildAlphaNumericPercentArbitrary(others), { size: constraints.size });
}
