"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boxedArbitraryBuilder = void 0;
const UnboxedToBoxed_1 = require("../mappers/UnboxedToBoxed");
function boxedArbitraryBuilder(arb) {
    return arb.map(UnboxedToBoxed_1.unboxedToBoxedMapper, UnboxedToBoxed_1.unboxedToBoxedUnmapper);
}
exports.boxedArbitraryBuilder = boxedArbitraryBuilder;
