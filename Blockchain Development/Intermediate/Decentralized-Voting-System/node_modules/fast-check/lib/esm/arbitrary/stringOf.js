import { array } from './array.js';
import { patternsToStringMapper, patternsToStringUnmapperFor } from './_internals/mappers/PatternsToString.js';
import { createSlicesForString } from './_internals/helpers/SlicesForStringBuilder.js';
export function stringOf(charArb, constraints = {}) {
    const unmapper = patternsToStringUnmapperFor(charArb, constraints);
    const experimentalCustomSlices = createSlicesForString(charArb, unmapper);
    const enrichedConstraints = Object.assign(Object.assign({}, constraints), { experimentalCustomSlices });
    return array(charArb, enrichedConstraints).map(patternsToStringMapper, unmapper);
}
