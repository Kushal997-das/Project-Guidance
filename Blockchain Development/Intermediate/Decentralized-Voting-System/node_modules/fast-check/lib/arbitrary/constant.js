"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constant = void 0;
const ConstantArbitrary_1 = require("./_internals/ConstantArbitrary");
function constant(value) {
    return new ConstantArbitrary_1.ConstantArbitrary([value]);
}
exports.constant = constant;
