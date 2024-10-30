var SBigInt = typeof BigInt !== 'undefined' ? BigInt : undefined;
export function unsafeUniformBigIntDistribution(from, to, rng) {
    var diff = to - from + SBigInt(1);
    var MinRng = SBigInt(rng.min());
    var NumValues = SBigInt(rng.max() - rng.min() + 1);
    var FinalNumValues = NumValues;
    var NumIterations = SBigInt(1);
    while (FinalNumValues < diff) {
        FinalNumValues *= NumValues;
        ++NumIterations;
    }
    var MaxAcceptedRandom = FinalNumValues - (FinalNumValues % diff);
    while (true) {
        var value = SBigInt(0);
        for (var num = SBigInt(0); num !== NumIterations; ++num) {
            var out = rng.unsafeNext();
            value = NumValues * value + (SBigInt(out) - MinRng);
        }
        if (value < MaxAcceptedRandom) {
            var inDiff = value % diff;
            return inDiff + from;
        }
    }
}
