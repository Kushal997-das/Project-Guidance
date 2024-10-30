"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = void 0;
const array_1 = require("./array");
const char_1 = require("./char");
const CodePointsToString_1 = require("./_internals/mappers/CodePointsToString");
const SlicesForStringBuilder_1 = require("./_internals/helpers/SlicesForStringBuilder");
function string(constraints = {}) {
    const charArbitrary = (0, char_1.char)();
    const experimentalCustomSlices = (0, SlicesForStringBuilder_1.createSlicesForString)(charArbitrary, CodePointsToString_1.codePointsToStringUnmapper);
    const enrichedConstraints = Object.assign(Object.assign({}, constraints), { experimentalCustomSlices });
    return (0, array_1.array)(charArbitrary, enrichedConstraints).map(CodePointsToString_1.codePointsToStringMapper, CodePointsToString_1.codePointsToStringUnmapper);
}
exports.string = string;
