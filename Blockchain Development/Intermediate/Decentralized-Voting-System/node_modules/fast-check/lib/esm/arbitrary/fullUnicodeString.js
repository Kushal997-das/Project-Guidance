import { array } from './array.js';
import { fullUnicode } from './fullUnicode.js';
import { codePointsToStringMapper, codePointsToStringUnmapper } from './_internals/mappers/CodePointsToString.js';
import { createSlicesForString } from './_internals/helpers/SlicesForStringBuilder.js';
export function fullUnicodeString(constraints = {}) {
    const charArbitrary = fullUnicode();
    const experimentalCustomSlices = createSlicesForString(charArbitrary, codePointsToStringUnmapper);
    const enrichedConstraints = Object.assign(Object.assign({}, constraints), { experimentalCustomSlices });
    return array(charArbitrary, enrichedConstraints).map(codePointsToStringMapper, codePointsToStringUnmapper);
}
