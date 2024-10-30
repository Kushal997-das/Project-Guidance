"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string16bits = void 0;
const array_1 = require("./array");
const char16bits_1 = require("./char16bits");
const CharsToString_1 = require("./_internals/mappers/CharsToString");
const SlicesForStringBuilder_1 = require("./_internals/helpers/SlicesForStringBuilder");
function string16bits(constraints = {}) {
    const charArbitrary = (0, char16bits_1.char16bits)();
    const experimentalCustomSlices = (0, SlicesForStringBuilder_1.createSlicesForString)(charArbitrary, CharsToString_1.charsToStringUnmapper);
    const enrichedConstraints = Object.assign(Object.assign({}, constraints), { experimentalCustomSlices });
    return (0, array_1.array)(charArbitrary, enrichedConstraints).map(CharsToString_1.charsToStringMapper, CharsToString_1.charsToStringUnmapper);
}
exports.string16bits = string16bits;
