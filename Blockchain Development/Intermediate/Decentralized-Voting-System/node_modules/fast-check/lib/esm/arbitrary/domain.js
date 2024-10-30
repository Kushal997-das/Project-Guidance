import { array } from './array.js';
import { buildLowerAlphaArbitrary, buildLowerAlphaNumericArbitrary, } from './_internals/builders/CharacterRangeArbitraryBuilder.js';
import { option } from './option.js';
import { stringOf } from './stringOf.js';
import { tuple } from './tuple.js';
import { filterInvalidSubdomainLabel } from './_internals/helpers/InvalidSubdomainLabelFiIter.js';
import { resolveSize, relativeSizeToSize } from './_internals/helpers/MaxLengthFromMinLength.js';
import { adapter } from './_internals/AdapterArbitrary.js';
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
    const alphaNumericArb = buildLowerAlphaNumericArbitrary([]);
    const alphaNumericHyphenArb = buildLowerAlphaNumericArbitrary(['-']);
    return tuple(alphaNumericArb, option(tuple(stringOf(alphaNumericHyphenArb, { size, maxLength: 61 }), alphaNumericArb)))
        .map(toSubdomainLabelMapper, toSubdomainLabelUnmapper)
        .filter(filterInvalidSubdomainLabel);
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
export function domain(constraints = {}) {
    const resolvedSize = resolveSize(constraints.size);
    const resolvedSizeMinusOne = relativeSizeToSize('-1', resolvedSize);
    const alphaNumericArb = buildLowerAlphaArbitrary([]);
    const publicSuffixArb = stringOf(alphaNumericArb, { minLength: 2, maxLength: 63, size: resolvedSizeMinusOne });
    return (adapter(tuple(array(subdomainLabel(resolvedSize), { size: resolvedSizeMinusOne, minLength: 1, maxLength: 127 }), publicSuffixArb), labelsAdapter).map(labelsMapper, labelsUnmapper));
}
