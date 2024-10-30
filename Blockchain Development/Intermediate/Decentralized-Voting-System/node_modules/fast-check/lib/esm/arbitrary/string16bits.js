import { array } from './array.js';
import { char16bits } from './char16bits.js';
import { charsToStringMapper, charsToStringUnmapper } from './_internals/mappers/CharsToString.js';
import { createSlicesForString } from './_internals/helpers/SlicesForStringBuilder.js';
export function string16bits(constraints = {}) {
    const charArbitrary = char16bits();
    const experimentalCustomSlices = createSlicesForString(charArbitrary, charsToStringUnmapper);
    const enrichedConstraints = Object.assign(Object.assign({}, constraints), { experimentalCustomSlices });
    return array(charArbitrary, enrichedConstraints).map(charsToStringMapper, charsToStringUnmapper);
}
