"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toQualifiedObjectConstraints = void 0;
const boolean_1 = require("../../boolean");
const constant_1 = require("../../constant");
const double_1 = require("../../double");
const maxSafeInteger_1 = require("../../maxSafeInteger");
const oneof_1 = require("../../oneof");
const string_1 = require("../../string");
const BoxedArbitraryBuilder_1 = require("../builders/BoxedArbitraryBuilder");
function defaultValues(constraints) {
    return [
        (0, boolean_1.boolean)(),
        (0, maxSafeInteger_1.maxSafeInteger)(),
        (0, double_1.double)(),
        (0, string_1.string)(constraints),
        (0, oneof_1.oneof)((0, string_1.string)(constraints), (0, constant_1.constant)(null), (0, constant_1.constant)(undefined)),
    ];
}
function boxArbitraries(arbs) {
    return arbs.map((arb) => (0, BoxedArbitraryBuilder_1.boxedArbitraryBuilder)(arb));
}
function boxArbitrariesIfNeeded(arbs, boxEnabled) {
    return boxEnabled ? boxArbitraries(arbs).concat(arbs) : arbs;
}
function toQualifiedObjectConstraints(settings = {}) {
    function orDefault(optionalValue, defaultValue) {
        return optionalValue !== undefined ? optionalValue : defaultValue;
    }
    const valueConstraints = { size: settings.size };
    return {
        key: orDefault(settings.key, (0, string_1.string)(valueConstraints)),
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
exports.toQualifiedObjectConstraints = toQualifiedObjectConstraints;
