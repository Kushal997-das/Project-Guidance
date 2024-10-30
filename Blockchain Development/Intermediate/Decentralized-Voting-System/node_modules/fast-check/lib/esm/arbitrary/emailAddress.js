import { array } from './array.js';
import { buildLowerAlphaNumericArbitrary } from './_internals/builders/CharacterRangeArbitraryBuilder.js';
import { domain } from './domain.js';
import { stringOf } from './stringOf.js';
import { tuple } from './tuple.js';
import { adapter } from './_internals/AdapterArbitrary.js';
function dotAdapter(a) {
    let currentLength = a[0].length;
    for (let index = 1; index !== a.length; ++index) {
        currentLength += 1 + a[index].length;
        if (currentLength > 64) {
            return { adapted: true, value: a.slice(0, index) };
        }
    }
    return { adapted: false, value: a };
}
function dotMapper(a) {
    return a.join('.');
}
function dotUnmapper(value) {
    if (typeof value !== 'string') {
        throw new Error('Unsupported');
    }
    return value.split('.');
}
function atMapper(data) {
    return `${data[0]}@${data[1]}`;
}
function atUnmapper(value) {
    if (typeof value !== 'string') {
        throw new Error('Unsupported');
    }
    return value.split('@', 2);
}
export function emailAddress(constraints = {}) {
    const others = ['!', '#', '$', '%', '&', "'", '*', '+', '-', '/', '=', '?', '^', '_', '`', '{', '|', '}', '~'];
    const atextArb = buildLowerAlphaNumericArbitrary(others);
    const localPartArb = adapter(array(stringOf(atextArb, {
        minLength: 1,
        maxLength: 64,
        size: constraints.size,
    }), { minLength: 1, maxLength: 32, size: constraints.size }), dotAdapter).map(dotMapper, dotUnmapper);
    return tuple(localPartArb, domain({ size: constraints.size })).map(atMapper, atUnmapper);
}
