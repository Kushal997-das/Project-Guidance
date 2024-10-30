"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domain = void 0;
const array_1 = require("./array");
const CharacterRangeArbitraryBuilder_1 = require("./_internals/builders/CharacterRangeArbitraryBuilder");
const option_1 = require("./option");
const stringOf_1 = require("./stringOf");
const tuple_1 = require("./tuple");
const InvalidSubdomainLabelFiIter_1 = require("./_internals/helpers/InvalidSubdomainLabelFiIter");
const MaxLengthFromMinLength_1 = require("./_internals/helpers/MaxLengthFromMinLength");
const AdapterArbitrary_1 = require("./_internals/AdapterArbitrary");
function toSubdomainLabelMapper([f, d]) {
    return d === null ? f : `${f}${d[0]}${d[1]}`;
}
function toSubdomainLabelUnmapper(value) {
    if (typeof value !== 'string' || value.length === 0) {
        throw new Error('Unsupported');
    }
    if (value.length === 1) {
        return [value[0], null];
    }
    return [value[0], [value.substring(1, value.length - 1), value[value.length - 1]]];
}
function subdomainLabel(size) {
    const alphaNumericArb = (0, CharacterRangeArbitraryBuilder_1.buildLowerAlphaNumericArbitrary)([]);
    const alphaNumericHyphenArb = (0, CharacterRangeArbitraryBuilder_1.buildLowerAlphaNumericArbitrary)(['-']);
    return (0, tuple_1.tuple)(alphaNumericArb, (0, option_1.option)((0, tuple_1.tuple)((0, stringOf_1.stringOf)(alphaNumericHyphenArb, { size, maxLength: 61 }), alphaNumericArb)))
        .map(toSubdomainLabelMapper, toSubdomainLabelUnmapper)
        .filter(InvalidSubdomainLabelFiIter_1.filterInvalidSubdomainLabel);
}
function labelsMapper(elements) {
    return `${elements[0].join('.')}.${elements[1]}`;
}
function labelsUnmapper(value) {
    if (typeof value !== 'string') {
        throw new Error('Unsupported type');
    }
    const lastDotIndex = value.lastIndexOf('.');
    return [value.substring(0, lastDotIndex).split('.'), value.substring(lastDotIndex + 1)];
}
function labelsAdapter(labels) {
    const [subDomains, suffix] = labels;
    let lengthNotIncludingIndex = suffix.length;
    for (let index = 0; index !== subDomains.length; ++index) {
        lengthNotIncludingIndex += 1 + subDomains[index].length;
        if (lengthNotIncludingIndex > 255) {
            return { adapted: true, value: [subDomains.slice(0, index), suffix] };
        }
    }
    return { adapted: false, value: labels };
}
function domain(constraints = {}) {
    const resolvedSize = (0, MaxLengthFromMinLength_1.resolveSize)(constraints.size);
    const resolvedSizeMinusOne = (0, MaxLengthFromMinLength_1.relativeSizeToSize)('-1', resolvedSize);
    const alphaNumericArb = (0, CharacterRangeArbitraryBuilder_1.buildLowerAlphaArbitrary)([]);
    const publicSuffixArb = (0, stringOf_1.stringOf)(alphaNumericArb, { minLength: 2, maxLength: 63, size: resolvedSizeMinusOne });
    return ((0, AdapterArbitrary_1.adapter)((0, tuple_1.tuple)((0, array_1.array)(subdomainLabel(resolvedSize), { size: resolvedSizeMinusOne, minLength: 1, maxLength: 127 }), publicSuffixArb), labelsAdapter).map(labelsMapper, labelsUnmapper));
}
exports.domain = domain;
