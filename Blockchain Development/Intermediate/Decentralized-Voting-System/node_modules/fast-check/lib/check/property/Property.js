"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.property = void 0;
const Arbitrary_1 = require("../arbitrary/definition/Arbitrary");
const tuple_1 = require("../../arbitrary/tuple");
const Property_generic_1 = require("./Property.generic");
const AlwaysShrinkableArbitrary_1 = require("../../arbitrary/_internals/AlwaysShrinkableArbitrary");
function property(...args) {
    if (args.length < 2) {
        throw new Error('property expects at least two parameters');
    }
    const arbs = args.slice(0, args.length - 1);
    const p = args[args.length - 1];
    arbs.forEach(Arbitrary_1.assertIsArbitrary);
    const mappedArbs = arbs.map((arb) => new AlwaysShrinkableArbitrary_1.AlwaysShrinkableArbitrary(arb));
    return new Property_generic_1.Property((0, tuple_1.tuple)(...mappedArbs), (t) => p(...t));
}
exports.property = property;
