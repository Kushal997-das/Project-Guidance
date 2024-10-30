import { constant } from './constant.js';
import { FrequencyArbitrary } from './_internals/FrequencyArbitrary.js';
export function option(arb, constraints = {}) {
    const freq = constraints.freq == null ? 5 : constraints.freq;
    const nilValue = Object.prototype.hasOwnProperty.call(constraints, 'nil') ? constraints.nil : null;
    const nilArb = constant(nilValue);
    const weightedArbs = [
        { arbitrary: nilArb, weight: 1, fallbackValue: { default: nilValue } },
        { arbitrary: arb, weight: freq },
    ];
    const frequencyConstraints = {
        withCrossShrink: true,
        depthSize: constraints.depthSize,
        maxDepth: constraints.maxDepth,
        depthIdentifier: constraints.depthIdentifier,
    };
    return FrequencyArbitrary.from(weightedArbs, frequencyConstraints, 'fc.option');
}
