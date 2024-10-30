import { webSegment } from '../../webSegment.js';
import { array } from '../../array.js';
import { segmentsToPathMapper, segmentsToPathUnmapper } from '../mappers/SegmentsToPath.js';
function sqrtSize(size) {
    switch (size) {
        case 'xsmall':
            return ['xsmall', 'xsmall'];
        case 'small':
            return ['small', 'xsmall'];
        case 'medium':
            return ['small', 'small'];
        case 'large':
            return ['medium', 'small'];
        case 'xlarge':
            return ['medium', 'medium'];
    }
}
export function buildUriPathArbitrary(resolvedSize) {
    const [segmentSize, numSegmentSize] = sqrtSize(resolvedSize);
    return array(webSegment({ size: segmentSize }), { size: numSegmentSize }).map(segmentsToPathMapper, segmentsToPathUnmapper);
}
