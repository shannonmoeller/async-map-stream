'use strict';

var map = require('../index'),
    Observable = require('rx').Observable,
    Promise = require('es6-promise').Promise,
    it = require('ava'),
    streamArray = require('stream-array');

function noop() {}

it('should transform with a callback', function (test) {
    test.plan(2);

    streamArray([{ foo: 'bar' }])
        .pipe(map(function (obj, cb) {
            test.same(obj, { foo: 'bar' });

            obj.baz = 'bat';

            cb(null, obj);
        }))
        .pipe(map(function (obj, cb) {
            test.same(obj, { foo: 'bar', baz: 'bat' })

            cb(null, obj);
        }));
});

/*
 * Currently `async-done` doesn't support returning values from observables, so
 * this use case is pretty much dead in the water. If you really need this, feel
 * free to push for it in the related PR:
 *
 *     https://github.com/phated/async-done/pull/28
 *
 * /
it('should transform with an observable', function (test) {
    test.plan(2);

    streamArray([{ foo: 'bar' }])
        .pipe(map(function (obj) {
            test.same(obj, { foo: 'bar' });

            obj.baz = 'bat';

            return Observable.return(obj);
        }))
        .pipe(map(function (obj) {
            test.same(obj, { foo: 'bar', baz: 'bat' })

            return Observable.return(obj);
        }));
});
/* */

it('should transform with a promise', function (test) {
    test.plan(2);

    streamArray([{ foo: 'bar' }])
        .pipe(map(function (obj) {
            test.same(obj, { foo: 'bar' });

            obj.baz = 'bat';

            return Promise.resolve(obj);
        }))
        .pipe(map(function (obj) {
            test.same(obj, { foo: 'bar', baz: 'bat' })

            return Promise.resolve(obj);
        }));
});

it('should transform with a stream', function (test) {
    test.plan(2);

    streamArray([{ foo: 'bar' }])
        .pipe(map(function (obj, cb) {
            test.same(obj, { foo: 'bar' });

            obj.baz = 'bat';

            return streamArray([]).on('end', function() {
                cb(null, obj);
            });
        }))
        .pipe(map(function (obj, cb) {
            test.same(obj, { foo: 'bar', baz: 'bat' })

            return streamArray([]).on('end', function() {
                cb(null, obj);
            });
        }));
});

it('should support flush functions', function (test) {
    test.plan(2);

    streamArray([])
        .pipe(map(noop, function (cb) {
            test.pass();

            cb(null, { foo: 'bar' });
        }))
        .pipe(map(function (obj, cb) {
            test.same(obj, { foo: 'bar' })

            cb(null, obj);
        }));
});
