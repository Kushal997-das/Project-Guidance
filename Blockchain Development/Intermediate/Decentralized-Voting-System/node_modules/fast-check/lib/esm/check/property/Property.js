import { assertIsArbitrary } from '../arbitrary/definition/Arbitrary.js';
import { tuple } from '../../arbitrary/tuple.js';
import { Property } from './Property.generic.js';
import { AlwaysShrinkableArbitrary } from '../../arbitrary/_internals/AlwaysShrinkableArbitrary.js';
function property(...args) {
    if (args.length < 2) {
        throw new Error('property expects at least two parameters');
    }
    const arbs = args.slice(0, args.length - 1);
    const p = args[args.length - 1];
    arbs.forEach(assertIsArbitrary);
    const mappedArbs = arbs.map((arb) => new AlwaysShrinkableArbitrary(arb));
    return new Property(tuple(...mappedArbs), (t) => p(...t));
}
export { property };
