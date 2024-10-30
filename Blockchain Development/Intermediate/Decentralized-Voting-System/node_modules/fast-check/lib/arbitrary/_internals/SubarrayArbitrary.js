"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubarrayArbitrary = void 0;
const Arbitrary_1 = require("../../check/arbitrary/definition/Arbitrary");
const Value_1 = require("../../check/arbitrary/definition/Value");
const LazyIterableIterator_1 = require("../../stream/LazyIterableIterator");
const Stream_1 = require("../../stream/Stream");
const IsSubarrayOf_1 = require("./helpers/IsSubarrayOf");
const IntegerArbitrary_1 = require("./IntegerArbitrary");
class SubarrayArbitrary extends Arbitrary_1.Arbitrary {
    constructor(originalArray, isOrdered, minLength, maxLength) {
        super();
        this.originalArray = originalArray;
        this.isOrdered = isOrdered;
        this.minLength = minLength;
        this.maxLength = maxLength;
        if (minLength < 0 || minLength > originalArray.length)
            throw new Error('fc.*{s|S}ubarrayOf expects the minimal length to be between 0 and the size of the original array');
        if (maxLength < 0 || maxLength > originalArray.length)
            throw new Error('fc.*{s|S}ubarrayOf expects the maximal length to be between 0 and the size of the original array');
        if (minLength > maxLength)
            throw new Error('fc.*{s|S}ubarrayOf expects the minimal length to be inferior or equal to the maximal length');
        this.lengthArb = new IntegerArbitrary_1.IntegerArbitrary(minLength, maxLength);
        this.biasedLengthArb =
            minLength !== maxLength
                ? new IntegerArbitrary_1.IntegerArbitrary(minLength, minLength + Math.floor(Math.log(maxLength - minLength) / Math.log(2)))
                : this.lengthArb;
    }
    generate(mrng, biasFactor) {
        const lengthArb = biasFactor !== undefined && mrng.nextInt(1, biasFactor) === 1 ? this.biasedLengthArb : this.lengthArb;
        const size = lengthArb.generate(mrng, undefined);
        const sizeValue = size.value;
        const remainingElements = this.originalArray.map((_v, idx) => idx);
        const ids = [];
        for (let index = 0; index !== sizeValue; ++index) {
            const selectedIdIndex = mrng.nextInt(0, remainingElements.length - 1);
            ids.push(remainingElements[selectedIdIndex]);
            remainingElements.splice(selectedIdIndex, 1);
        }
        if (this.isOrdered) {
            ids.sort((a, b) => a - b);
        }
        return new Value_1.Value(ids.map((i) => this.originalArray[i]), size.context);
    }
    canShrinkWithoutContext(value) {
        if (!Array.isArray(value)) {
            return false;
        }
        if (!this.lengthArb.canShrinkWithoutContext(value.length)) {
            return false;
        }
        return (0, IsSubarrayOf_1.isSubarrayOf)(this.originalArray, value);
    }
    shrink(value, context) {
        if (value.length === 0) {
            return Stream_1.Stream.nil();
        }
        return this.lengthArb
            .shrink(value.length, context)
            .map((newSize) => {
            return new Value_1.Value(value.slice(value.length - newSize.value), newSize.context);
        })
            .join(value.length > this.minLength
            ? (0, LazyIterableIterator_1.makeLazy)(() => this.shrink(value.slice(1), undefined)
                .filter((newValue) => this.minLength <= newValue.value.length + 1)
                .map((newValue) => new Value_1.Value([value[0]].concat(newValue.value), undefined)))
            : Stream_1.Stream.nil());
    }
}
exports.SubarrayArbitrary = SubarrayArbitrary;
