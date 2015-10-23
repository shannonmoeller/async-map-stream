'use strict';

var map = require('../index'),
	observable = require('rx').Observable,
	promise = require('es6-promise').Promise,
	streamArray = require('stream-array'),
	test = require('ava');

function noop() {}

test('transform with a callback', function (assert) {
	assert.plan(2);

	streamArray([{ foo: 'bar' }])
		.pipe(map(function (obj, cb) {
			assert.same(obj, { foo: 'bar' });

			obj.baz = 'bat';

			cb(null, obj);
		}))
		.pipe(map(function (obj, cb) {
			assert.same(obj, { foo: 'bar', baz: 'bat' });

			cb(null, obj);
		}));
});

test('transform with an observable', function (assert) {
	assert.plan(2);

	streamArray([{ foo: 'bar' }])
		.pipe(map(function (obj) {
			assert.same(obj, { foo: 'bar' });

			obj.baz = 'bat';

			return observable.return(obj);
		}))
		.pipe(map(function (obj) {
			assert.same(obj, { foo: 'bar', baz: 'bat' });

			return observable.return(obj);
		}));
});

test('transform with a promise', function (assert) {
	assert.plan(2);

	streamArray([{ foo: 'bar' }])
		.pipe(map(function (obj) {
			assert.same(obj, { foo: 'bar' });

			obj.baz = 'bat';

			return promise.resolve(obj);
		}))
		.pipe(map(function (obj) {
			assert.same(obj, { foo: 'bar', baz: 'bat' });

			return promise.resolve(obj);
		}));
});

test('transform with a stream', function (assert) {
	assert.plan(2);

	streamArray([{ foo: 'bar' }])
		.pipe(map(function (obj, cb) {
			assert.same(obj, { foo: 'bar' });

			obj.baz = 'bat';

			return streamArray([]).on('end', function () {
				cb(null, obj);
			});
		}))
		.pipe(map(function (obj, cb) {
			assert.same(obj, { foo: 'bar', baz: 'bat' });

			return streamArray([]).on('end', function () {
				cb(null, obj);
			});
		}));
});

test('support flush functions', function (assert) {
	assert.plan(2);

	streamArray([])
		.pipe(map(noop, function (cb) {
			assert.pass();

			cb(null, { foo: 'bar' });
		}))
		.pipe(map(function (obj, cb) {
			assert.same(obj, { foo: 'bar' });

			cb(null, obj);
		}));
});
