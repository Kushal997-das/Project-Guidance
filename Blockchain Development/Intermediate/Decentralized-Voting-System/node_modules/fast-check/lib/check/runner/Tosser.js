"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toss = void 0;
const pure_rand_1 = require("pure-rand");
const Random_1 = require("../../random/generator/Random");
const Value_1 = require("../arbitrary/definition/Value");
function lazyGenerate(generator, rng, idx) {
    return () => generator.generate(new Random_1.Random(rng), idx);
}
function* toss(generator, seed, random, examples) {
    yield* examples.map((e) => () => new Value_1.Value(e, undefined));
    let idx = 0;
    let rng = random(seed);
    for (;;) {
        rng = rng.jump ? rng.jump() : (0, pure_rand_1.skipN)(rng, 42);
        yield lazyGenerate(generator, rng, idx++);
    }
}
exports.toss = toss;
