"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveSize = exports.depthBiasFromSizeForArbitrary = exports.maxGeneratedLengthFromSizeForArbitrary = exports.relativeSizeToSize = exports.maxLengthFromMinLength = exports.DefaultSize = exports.MaxLengthUpperBound = void 0;
const GlobalParameters_1 = require("../../../check/runner/configuration/GlobalParameters");
exports.MaxLengthUpperBound = 0x7fffffff;
const orderedSize = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
const orderedRelativeSize = ['-4', '-3', '-2', '-1', '=', '+1', '+2', '+3', '+4'];
exports.DefaultSize = 'small';
function maxLengthFromMinLength(minLength, size) {
    switch (size) {
        case 'xsmall':
            return Math.floor(1.1 * minLength) + 1;
        case 'small':
            return 2 * minLength + 10;
        case 'medium':
            return 11 * minLength + 100;
        case 'large':
            return 101 * minLength + 1000;
        case 'xlarge':
            return 1001 * minLength + 10000;
        default:
            throw new Error(`Unable to compute lengths based on received size: ${size}`);
    }
}
exports.maxLengthFromMinLength = maxLengthFromMinLength;
function relativeSizeToSize(size, defaultSize) {
    const sizeInRelative = orderedRelativeSize.indexOf(size);
    if (sizeInRelative === -1) {
        return size;
    }
    const defaultSizeInSize = orderedSize.indexOf(defaultSize);
    if (defaultSizeInSize === -1) {
        throw new Error(`Unable to offset size based on the unknown defaulted one: ${defaultSize}`);
    }
    const resultingSizeInSize = defaultSizeInSize + sizeInRelative - 4;
    return resultingSizeInSize < 0
        ? orderedSize[0]
        : resultingSizeInSize >= orderedSize.length
            ? orderedSize[orderedSize.length - 1]
            : orderedSize[resultingSizeInSize];
}
exports.relativeSizeToSize = relativeSizeToSize;
function maxGeneratedLengthFromSizeForArbitrary(size, minLength, maxLength, specifiedMaxLength) {
    const { baseSize: defaultSize = exports.DefaultSize, defaultSizeToMaxWhenMaxSpecified } = (0, GlobalParameters_1.readConfigureGlobal)() || {};
    const definedSize = size !== undefined ? size : specifiedMaxLength && defaultSizeToMaxWhenMaxSpecified ? 'max' : defaultSize;
    if (definedSize === 'max') {
        return maxLength;
    }
    const finalSize = relativeSizeToSize(definedSize, defaultSize);
    return Math.min(maxLengthFromMinLength(minLength, finalSize), maxLength);
}
exports.maxGeneratedLengthFromSizeForArbitrary = maxGeneratedLengthFromSizeForArbitrary;
function depthBiasFromSizeForArbitrary(depthSizeOrSize, specifiedMaxDepth) {
    if (typeof depthSizeOrSize === 'number') {
        return 1 / depthSizeOrSize;
    }
    const { baseSize: defaultSize = exports.DefaultSize, defaultSizeToMaxWhenMaxSpecified } = (0, GlobalParameters_1.readConfigureGlobal)() || {};
    const definedSize = depthSizeOrSize !== undefined
        ? depthSizeOrSize
        : specifiedMaxDepth && defaultSizeToMaxWhenMaxSpecified
            ? 'max'
            : defaultSize;
    if (definedSize === 'max') {
        return 0;
    }
    const finalSize = relativeSizeToSize(definedSize, defaultSize);
    switch (finalSize) {
        case 'xsmall':
            return 1;
        case 'small':
            return 0.5;
        case 'medium':
            return 0.25;
        case 'large':
            return 0.125;
        case 'xlarge':
            return 0.0625;
    }
}
exports.depthBiasFromSizeForArbitrary = depthBiasFromSizeForArbitrary;
function resolveSize(size) {
    const { baseSize: defaultSize = exports.DefaultSize } = (0, GlobalParameters_1.readConfigureGlobal)() || {};
    if (size === undefined) {
        return defaultSize;
    }
    return relativeSizeToSize(size, defaultSize);
}
exports.resolveSize = resolveSize;
