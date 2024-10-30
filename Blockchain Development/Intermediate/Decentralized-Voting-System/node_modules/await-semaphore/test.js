"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const assert = require('assert');
const index_1 = require('./index');
function delay(ms) {
    return new Promise((res, rej) => setTimeout(res, ms));
}
exports.delay = delay;
describe('util', function () {
    describe('semaphore', function () {
        it('limits concurrency', function () {
            return __awaiter(this, void 0, void 0, function* () {
                var s = new index_1.Semaphore(2);
                var running = 0;
                var ran = 0;
                var task = () => __awaiter(this, void 0, void 0, function* () {
                    var release = yield s.acquire();
                    assert(running <= 1);
                    running++;
                    yield delay(10);
                    assert(running <= 2);
                    running--;
                    ran++;
                    release();
                });
                yield Promise.all([1, 2, 3, 4, 5].map(i => task()));
                assert.equal(ran, 5);
            });
        });
        it('limits concurrency (use syntax)', function () {
            return __awaiter(this, void 0, void 0, function* () {
                var s = new index_1.Semaphore(2);
                var running = 0;
                var ran = 0;
                var task = () => __awaiter(this, void 0, void 0, function* () {
                    assert(running <= 1);
                    running++;
                    yield delay(10);
                    assert(running <= 2);
                    running--;
                    ran++;
                });
                yield Promise.all([1, 2, 3, 4, 5].map(i => s.use(task)));
                assert.equal(ran, 5);
            });
        });
        it('use recovers from thrown exception', function () {
            return __awaiter(this, void 0, void 0, function* () {
                var s = new index_1.Semaphore(2);
                var running = 0;
                var ran = 0;
                var erred = 0;
                var task = (i) => () => __awaiter(this, void 0, void 0, function* () {
                    assert(running <= 1);
                    running++;
                    yield delay(10);
                    assert(running <= 2);
                    running--;
                    if (i === 2) {
                        throw new Error('bogus');
                    }
                    ran++;
                });
                yield s.use(task(1));
                try {
                    yield s.use(task(2));
                }
                catch (err) {
                    erred++;
                }
                yield s.use(task(3));
                yield s.use(task(4));
                yield s.use(task(5));
                assert.equal(ran, 4);
                assert.equal(erred, 1);
                assert.equal(s.count, 2);
            });
        });
    });
    describe('mutex', function () {
        it('tasks do not overlap', function (done) {
            var m = new index_1.Mutex();
            var task1running = false;
            var task2running = false;
            var task1ran = false;
            var task2ran = false;
            Promise.all([
                m.acquire()
                    .then(release => {
                    task1running = true;
                    task1ran = true;
                    return delay(10)
                        .then(() => {
                        assert(!task2running);
                        task1running = false;
                        release();
                    });
                }),
                m.acquire().
                    then(release => {
                    assert(!task1running);
                    task2running = true;
                    task2ran = true;
                    return delay(10)
                        .then(() => {
                        task2running = false;
                        release();
                    });
                })
            ])
                .then(() => {
                assert(!task1running);
                assert(!task2running);
                assert(task1ran);
                assert(task2ran);
                done();
            })
                .catch(done);
        });
        it('double lock deadlocks', function (done) {
            var m = new index_1.Mutex();
            m.acquire()
                .then(r => m.acquire())
                .then(r => assert(false))
                .catch(done);
            delay(10)
                .then(done);
        });
        it('double release ok', function (done) {
            var release;
            var m = new index_1.Mutex();
            m.acquire().
                then(r => release = r).
                then(() => release()).
                then(() => release());
            m.acquire().
                then(r => done());
        });
    });
});
//# sourceMappingURL=test.js.map