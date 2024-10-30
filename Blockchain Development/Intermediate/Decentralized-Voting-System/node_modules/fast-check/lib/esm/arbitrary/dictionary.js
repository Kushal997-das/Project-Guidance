import { tuple } from './tuple.js';
import { uniqueArray } from './uniqueArray.js';
import { keyValuePairsToObjectMapper, keyValuePairsToObjectUnmapper } from './_internals/mappers/KeyValuePairsToObject.js';
function dictionaryKeyExtractor(entry) {
    return entry[0];
}
export function dictionary(keyArb, valueArb, constraints = {}) {
    return uniqueArray(tuple(keyArb, valueArb), {
        minLength: constraints.minKeys,
        maxLength: constraints.maxKeys,
        size: constraints.size,
        selector: dictionaryKeyExtractor,
    }).map(keyValuePairsToObjectMapper, keyValuePairsToObjectUnmapper);
}
