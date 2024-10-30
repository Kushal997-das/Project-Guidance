"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tuple = void 0;
const TupleArbitrary_1 = require("./_internals/TupleArbitrary");
function tuple(...arbs) {
    return new TupleArbitrary_1.TupleArbitrary(arbs);
}
exports.tuple = tuple;
