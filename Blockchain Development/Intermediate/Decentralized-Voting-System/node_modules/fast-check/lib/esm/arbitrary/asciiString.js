import { array } from './array.js';
import { ascii } from './ascii.js';
import { codePointsToStringMapper, codePointsToStringUnmapper } from './_internals/mappers/CodePointsToString.js';
import { createSlicesForString } from './_internals/helpers/SlicesForStringBuilder.js';
export function asciiString(constraints = {}) {
    const charArbitrary = ascii();
    const experimentalCustomSlices = createSlicesForString(charArbitrary, codePointsToStringUnmapper);
    const enrichedConstraints = Object.assign(Object.assign({}, constraints), { experimentalCustomSlices });
    return array(charArbitrary, enrichedConstraints).map(codePointsToStringMapper, codePointsToStringUnmapper);
}
