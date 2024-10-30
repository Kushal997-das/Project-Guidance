"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneof = void 0;
const Arbitrary_1 = require("../check/arbitrary/definition/Arbitrary");
const FrequencyArbitrary_1 = require("./_internals/FrequencyArbitrary");
function isOneOfContraints(param) {
    return (param != null &&
        typeof param === 'object' &&
        !('generate' in param) &&
        !('arbitrary' in param) &&
        !('weight' in param));
}
function toWeightedArbitrary(maybeWeightedArbitrary) {
    if ((0, Arbitrary_1.isArbitrary)(maybeWeightedArbitrary)) {
        return { arbitrary: maybeWeightedArbitrary, weight: 1 };
    }
    return maybeWeightedArbitrary;
}
function oneof(...args) {
    const constraints = args[0];
    if (isOneOfContraints(constraints)) {
        const weightedArbs = args.slice(1).map(toWeightedArbitrary);
        return FrequencyArbitrary_1.FrequencyArbitrary.from(weightedArbs, constraints, 'fc.oneof');
    }
    const weightedArbs = args.map(toWeightedArbitrary);
    return FrequencyArbitrary_1.FrequencyArbitrary.from(weightedArbs, {}, 'fc.oneof');
}
exports.oneof = oneof;
