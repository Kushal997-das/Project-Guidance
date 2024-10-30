"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUriPathArbitrary = void 0;
const webSegment_1 = require("../../webSegment");
const array_1 = require("../../array");
const SegmentsToPath_1 = require("../mappers/SegmentsToPath");
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
function buildUriPathArbitrary(resolvedSize) {
    const [segmentSize, numSegmentSize] = sqrtSize(resolvedSize);
    return (0, array_1.array)((0, webSegment_1.webSegment)({ size: segmentSize }), { size: numSegmentSize }).map(SegmentsToPath_1.segmentsToPathMapper, SegmentsToPath_1.segmentsToPathUnmapper);
}
exports.buildUriPathArbitrary = buildUriPathArbitrary;
