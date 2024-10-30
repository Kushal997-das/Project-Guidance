"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailAddress = void 0;
const array_1 = require("./array");
const CharacterRangeArbitraryBuilder_1 = require("./_internals/builders/CharacterRangeArbitraryBuilder");
const domain_1 = require("./domain");
const stringOf_1 = require("./stringOf");
const tuple_1 = require("./tuple");
const AdapterArbitrary_1 = require("./_internals/AdapterArbitrary");
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
function emailAddress(constraints = {}) {
    const others = ['!', '#', '$', '%', '&', "'", '*', '+', '-', '/', '=', '?', '^', '_', '`', '{', '|', '}', '~'];
    const atextArb = (0, CharacterRangeArbitraryBuilder_1.buildLowerAlphaNumericArbitrary)(others);
    const localPartArb = (0, AdapterArbitrary_1.adapter)((0, array_1.array)((0, stringOf_1.stringOf)(atextArb, {
        minLength: 1,
        maxLength: 64,
        size: constraints.size,
    }), { minLength: 1, maxLength: 32, size: constraints.size }), dotAdapter).map(dotMapper, dotUnmapper);
    return (0, tuple_1.tuple)(localPartArb, (0, domain_1.domain)({ size: constraints.size })).map(atMapper, atUnmapper);
}
exports.emailAddress = emailAddress;
