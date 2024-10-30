"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlicesForString = void 0;
const dangerousStrings = [
    '__defineGetter__',
    '__defineSetter__',
    '__lookupGetter__',
    '__lookupSetter__',
    '__proto__',
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf',
    'apply',
    'arguments',
    'bind',
    'call',
    'caller',
    'length',
    'name',
    'prototype',
    'key',
    'ref',
];
function computeCandidateString(dangerous, charArbitrary, stringSplitter) {
    let candidate;
    try {
        candidate = stringSplitter(dangerous);
    }
    catch (err) {
        return undefined;
    }
    for (const entry of candidate) {
        if (!charArbitrary.canShrinkWithoutContext(entry)) {
            return undefined;
        }
    }
    return candidate;
}
function createSlicesForString(charArbitrary, stringSplitter) {
    const slicesForString = [];
    for (const dangerous of dangerousStrings) {
        const candidate = computeCandidateString(dangerous, charArbitrary, stringSplitter);
        if (candidate !== undefined) {
            slicesForString.push(candidate);
        }
    }
    return slicesForString;
}
exports.createSlicesForString = createSlicesForString;
