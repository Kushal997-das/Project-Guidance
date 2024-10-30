import * as assert from 'assert';
import {Semaphore, Mutex} from './index';

export function delay(ms: number) {
    return new Promise<void>((res, rej) => setTimeout(res, ms));
}

describe('util', function() {
    describe('semaphore', function() {
        it('limits concurrency', async function() {
            var s = new Semaphore(2);
            var running = 0;
            var ran = 0;
            var task = async () => {
                var release = await s.acquire();
                assert(running <= 1);
                running++;
                await delay(10);
                assert(running <= 2);
                running--;
                ran++;
                release();
            };
            await Promise.all([1,2,3,4,5].map(i => task()));
            assert.equal(ran, 5);
        });

        it('limits concurrency (use syntax)', async function() {
            var s = new Semaphore(2);
            var running = 0;
            var ran = 0;
            var task = async () => {
                assert(running <= 1);
                running++;
                await delay(10);
                assert(running <= 2);
                running--;
                ran++;
            };
            await Promise.all([1,2,3,4,5].map(i => s.use(task)));
            assert.equal(ran, 5);
        });

        it('use recovers from thrown exception', async function() {
            var s = new Semaphore(2);
            var running = 0;
            var ran = 0;
            var erred = 0;
            var task = (i) => async () => {
                assert(running <= 1);
                running++;
                await delay(10);
                assert(running <= 2);
                running--;
                if (i === 2) {
                    throw new Error('bogus');
                }
                ran++;
            };
            await s.use(task(1));
            try {
                await s.use(task(2));
            } catch (err) {
                erred++;
            }
            await s.use(task(3));
            await s.use(task(4));
            await s.use(task(5));
            assert.equal(ran, 4);
            assert.equal(erred, 1);
            assert.equal(s.count, 2);
        });

    });

    describe('mutex', function() {
        it('tasks do not overlap', function(done) {
            var m = new Mutex();
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
        it('double lock deadlocks', function(done) {
            var m = new Mutex();
            m.acquire()
            .then(r => m.acquire())
            .then(r => assert(false))
            .catch(done);
            delay(10)
            .then(done);
        });
        it('double release ok', function(done) {
            var release;
            var m = new Mutex();
            m.acquire().
                then(r => release = r).
                then(() => release()).
                then(() => release());
            m.acquire().
                then(r => done());
        });
    });
});