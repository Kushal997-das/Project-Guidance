"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSegment = void 0;
const CharacterRangeArbitraryBuilder_1 = require("./_internals/builders/CharacterRangeArbitraryBuilder");
const stringOf_1 = require("./stringOf");
function webSegment(constraints = {}) {
    const others = ['-', '.', '_', '~', '!', '$', '&', "'", '(', ')', '*', '+', ',', ';', '=', ':', '@'];
    return (0, stringOf_1.stringOf)((0, CharacterRangeArbitraryBuilder_1.buildAlphaNumericPercentArbitrary)(others), { size: constraints.size });
}
exports.webSegment = webSegment;
