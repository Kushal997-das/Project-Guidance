import { tuple } from './tuple.js';
import { uniqueArray } from './uniqueArray.js';
import { restrictedIntegerArbitraryBuilder } from './_internals/builders/RestrictedIntegerArbitraryBuilder.js';
import { maxGeneratedLengthFromSizeForArbitrary, MaxLengthUpperBound, } from './_internals/helpers/MaxLengthFromMinLength.js';
function extractMaxIndex(indexesAndValues) {
    let maxIndex = -1;
    for (let index = 0; index !== indexesAndValues.length; ++index) {
        maxIndex = Math.max(maxIndex, indexesAndValues[index][0]);
    }
    return maxIndex;
}
function arrayFromItems(length, indexesAndValues) {
    const array = Array(length);
    for (let index = 0; index !== indexesAndValues.length; ++index) {
        const it = indexesAndValues[index];
        if (it[0] < length)
            array[it[0]] = it[1];
    }
    return array;
}
export function sparseArray(arb, constraints = {}) {
    const { size, minNumElements = 0, maxLength = MaxLengthUpperBound, maxNumElements = maxLength, noTrailingHole, depthIdentifier, } = constraints;
    const maxGeneratedNumElements = maxGeneratedLengthFromSizeForArbitrary(size, minNumElements, maxNumElements, constraints.maxNumElements !== undefined);
    const maxGeneratedLength = maxGeneratedLengthFromSizeForArbitrary(size, maxGeneratedNumElements, maxLength, constraints.maxLength !== undefined);
    if (minNumElements > maxLength) {
        throw new Error(`The minimal number of non-hole elements cannot be higher than the maximal length of the array`);
    }
    if (minNumElements > maxNumElements) {
        throw new Error(`The minimal number of non-hole elements cannot be higher than the maximal number of non-holes`);
    }
    const resultedMaxNumElements = Math.min(maxNumElements, maxLength);
    const resultedSizeMaxNumElements = constraints.maxNumElements !== undefined || size !== undefined ? size : '=';
    const maxGeneratedIndexAuthorized = Math.max(maxGeneratedLength - 1, 0);
    const maxIndexAuthorized = Math.max(maxLength - 1, 0);
    const sparseArrayNoTrailingHole = uniqueArray(tuple(restrictedIntegerArbitraryBuilder(0, maxGeneratedIndexAuthorized, maxIndexAuthorized), arb), {
        size: resultedSizeMaxNumElements,
        minLength: minNumElements,
        maxLength: resultedMaxNumElements,
        selector: (item) => item[0],
        depthIdentifier,
    }).map((items) => {
        const lastIndex = extractMaxIndex(items);
        return arrayFromItems(lastIndex + 1, items);
    }, (value) => {
        if (!Array.isArray(value)) {
            throw new Error('Not supported entry type');
        }
        if (noTrailingHole && value.length !== 0 && !(value.length - 1 in value)) {
            throw new Error('No trailing hole');
        }
        return Object.entries(value).map((entry) => [Number(entry[0]), entry[1]]);
    });
    if (noTrailingHole || maxLength === minNumElements) {
        return sparseArrayNoTrailingHole;
    }
    return tuple(sparseArrayNoTrailingHole, restrictedIntegerArbitraryBuilder(minNumElements, maxGeneratedLength, maxLength)).map((data) => {
        const sparse = data[0];
        const targetLength = data[1];
        if (sparse.length >= targetLength) {
            return sparse;
        }
        const longerSparse = sparse.slice();
        longerSparse.length = targetLength;
        return longerSparse;
    }, (value) => {
        if (!Array.isArray(value)) {
            throw new Error('Not supported entry type');
        }
        return [value, value.length];
    });
}
