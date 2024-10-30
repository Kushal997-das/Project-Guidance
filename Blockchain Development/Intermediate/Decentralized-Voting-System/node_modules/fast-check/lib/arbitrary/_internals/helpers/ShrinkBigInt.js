"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shrinkBigInt = void 0;
const Stream_1 = require("../../../stream/Stream");
const Value_1 = require("../../../check/arbitrary/definition/Value");
function halveBigInt(n) {
    return n / BigInt(2);
}
function shrinkBigInt(current, target, tryTargetAsap) {
    const realGap = current - target;
    function* shrinkDecr() {
        let previous = tryTargetAsap ? undefined : target;
        const gap = tryTargetAsap ? realGap : halveBigInt(realGap);
        for (let toremove = gap; toremove > 0; toremove = halveBigInt(toremove)) {
            const next = current - toremove;
            yield new Value_1.Value(next, previous);
            previous = next;
        }
    }
    function* shrinkIncr() {
        let previous = tryTargetAsap ? undefined : target;
        const gap = tryTargetAsap ? realGap : halveBigInt(realGap);
        for (let toremove = gap; toremove < 0; toremove = halveBigInt(toremove)) {
            const next = current - toremove;
            yield new Value_1.Value(next, previous);
            previous = next;
        }
    }
    return realGap > 0 ? (0, Stream_1.stream)(shrinkDecr()) : (0, Stream_1.stream)(shrinkIncr());
}
exports.shrinkBigInt = shrinkBigInt;
