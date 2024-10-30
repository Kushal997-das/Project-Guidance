import { float } from './float.js';
import { array } from './array.js';
function toTypedMapper(data) {
    return Float32Array.from(data);
}
function fromTypedUnmapper(value) {
    if (!(value instanceof Float32Array))
        throw new Error('Unexpected type');
    return [...value];
}
export function float32Array(constraints = {}) {
    return array(float(constraints), constraints).map(toTypedMapper, fromTypedUnmapper);
}
