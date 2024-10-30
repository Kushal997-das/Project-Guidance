import { boolean } from '../../boolean.js';
import { constant } from '../../constant.js';
import { double } from '../../double.js';
import { maxSafeInteger } from '../../maxSafeInteger.js';
import { oneof } from '../../oneof.js';
import { string } from '../../string.js';
import { boxedArbitraryBuilder } from '../builders/BoxedArbitraryBuilder.js';
function defaultValues(constraints) {
    return [
        boolean(),
        maxSafeInteger(),
        double(),
        string(constraints),
        oneof(string(constraints), constant(null), constant(undefined)),
    ];
}
function boxArbitraries(arbs) {
    return arbs.map((arb) => boxedArbitraryBuilder(arb));
}
function boxArbitrariesIfNeeded(arbs, boxEnabled) {
    return boxEnabled ? boxArbitraries(arbs).concat(arbs) : arbs;
}
export function toQualifiedObjectConstraints(settings = {}) {
    function orDefault(optionalValue, defaultValue) {
        return optionalValue !== undefined ? optionalValue : defaultValue;
    }
    const valueConstraints = { size: settings.size };
    return {
        key: orDefault(settings.key, string(valueConstraints)),
        values: boxArbitrariesIfNeeded(orDefault(settings.values, defaultValues(valueConstraints)), orDefault(settings.withBoxedValues, false)),
        depthSize: settings.depthSize,
        maxDepth: settings.maxDepth,
        maxKeys: settings.maxKeys,
        size: settings.size,
        withSet: orDefault(settings.withSet, false),
        withMap: orDefault(settings.withMap, false),
        withObjectString: orDefault(settings.withObjectString, false),
        withNullPrototype: orDefault(settings.withNullPrototype, false),
        withBigInt: orDefault(settings.withBigInt, false),
        withDate: orDefault(settings.withDate, false),
        withTypedArray: orDefault(settings.withTypedArray, false),
        withSparseArray: orDefault(settings.withSparseArray, false),
    };
}
