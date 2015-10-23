'use strict';

var through = require('through2'),
	asyncDone = require('async-done');

module.exports = function asyncMapStream(options, transform, flush) {
	if (typeof options === 'function') {
		flush = transform;
		transform = options;
		options = {};
	}

	function done(cb, err, chunk) {
		if (err) {
			cb(err);
			return;
		}

		if (chunk !== undefined) {
			this.push(chunk);
		}

		cb();
	}

	function doTransform(chunk, enc, cb) {
		asyncDone(
			transform.bind(this, chunk),
			done.bind(this, cb)
		);
	}

	function doFlush(cb) {
		asyncDone(
			flush.bind(this),
			done.bind(this, cb)
		);
	}

	return through.obj(
		options,
		transform && doTransform,
		flush && doFlush
	);
};
