"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infiniteStream = void 0;
const StreamArbitrary_1 = require("./_internals/StreamArbitrary");
function infiniteStream(arb) {
    return new StreamArbitrary_1.StreamArbitrary(arb);
}
exports.infiniteStream = infiniteStream;
