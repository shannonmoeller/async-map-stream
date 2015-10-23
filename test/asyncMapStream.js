'use strict';

var map = require('../index'),
	observable = require('rx').Observable,
	promise = require('es6-promise').Promise,
	streamArray = require('stream-array'),
	test = require('ava');

function noop() {}

test('callbacks', function (assert) {
	assert.plan(2);

	streamArray([{ foo: 'bar' }])
		.pipe(map(function (obj, cb) {
			assert.same(obj, { foo: 'bar' });

			obj.baz = 'bat';

			cb(null, obj);
		}))
		.pipe(map(function (obj, cb) {
			assert.same(obj, { foo: 'bar', baz: 'bat' });

			cb();
		}))
		.pipe(map(function () {
			assert.fail();
		}));
});

test('observables', function (assert) {
	assert.plan(2);

	streamArray([{ foo: 'bar' }])
		.pipe(map(function (obj) {
			assert.same(obj, { foo: 'bar' });

			obj.baz = 'bat';

			return observable.return(obj);
		}))
		.pipe(map(function (obj) {
			assert.same(obj, { foo: 'bar', baz: 'bat' });

			return observable.return();
		}))
		.pipe(map(function () {
			assert.fail();
		}));
});

test('promises', function (assert) {
	assert.plan(2);

	streamArray([{ foo: 'bar' }])
		.pipe(map(function (obj) {
			assert.same(obj, { foo: 'bar' });

			obj.baz = 'bat';

			return promise.resolve(obj);
		}))
		.pipe(map(function (obj) {
			assert.same(obj, { foo: 'bar', baz: 'bat' });

			return promise.resolve();
		}))
		.pipe(map(function () {
			assert.fail();
		}));
});

test('streams', function (assert) {
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
				cb();
			});
		}))
		.pipe(map(function () {
			assert.fail();
		}));
});

test('flush', function (assert) {
	assert.plan(2);

	streamArray([])
		.pipe(map({}, noop, function (cb) {
			assert.pass();

			cb(null, { foo: 'bar' });
		}))
		.pipe(map(function (obj, cb) {
			assert.same(obj, { foo: 'bar' });

			cb();
		}))
		.pipe(map(function () {
			assert.fail();
		}));
});

test('error', function (assert) {
	assert.plan(2);

	streamArray([{ foo: 'bar' }])
		.pipe(map({}, function (obj, cb) {
			assert.pass();

			cb('dangit');
		}))
		.on('error', function (err) {
			assert.is(err, 'dangit');
		});
});
