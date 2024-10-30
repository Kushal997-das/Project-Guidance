"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dictionary = void 0;
const tuple_1 = require("./tuple");
const uniqueArray_1 = require("./uniqueArray");
const KeyValuePairsToObject_1 = require("./_internals/mappers/KeyValuePairsToObject");
function dictionaryKeyExtractor(entry) {
    return entry[0];
}
function dictionary(keyArb, valueArb, constraints = {}) {
    return (0, uniqueArray_1.uniqueArray)((0, tuple_1.tuple)(keyArb, valueArb), {
        minLength: constraints.minKeys,
        maxLength: constraints.maxKeys,
        size: constraints.size,
        selector: dictionaryKeyExtractor,
    }).map(KeyValuePairsToObject_1.keyValuePairsToObjectMapper, KeyValuePairsToObject_1.keyValuePairsToObjectUnmapper);
}
exports.dictionary = dictionary;
