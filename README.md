# `async-map-stream`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Chat][gitter-img]][gitter-url] [![Tip][amazon-img]][amazon-url]

A version of `map-stream` that supports callbacks, promises, observables, and streams. Always uses [`objectMode`][mode]

[mode]: https://nodejs.org/api/stream.html#stream_object_mode

## Install

```
$ npm install --save async-map-stream
```

## Usage

```js
var map = require('async-map-stream');

vinylFs
    .src('src/**')
    .pipe(map(function (file) {
        // do something async
        return Observable.just(file);
    }))
    .pipe(map(function (file) {
        // do something async
        return Promise.resolve(file);
    }))
    .pipe(map(function (file, cb) {
        // do something async
        cb(null, file);
    }))
    .pipe(vinylFs.dest('dist'));
```

## API

### `map([options,] transformFunction [, flushFunction]) : TransformStream`

See the [`through2`][through2] documentation for all possible options and arguments.

[through2]: http://npm.im/through2

#### transformFunction(data [, cb])
#### flushFunction([cb])

See the [`async-done`][done] documentation for all possible method signatures and return types.

[done]: http://npm.im/async-done

## Test

```
$ npm test
```

## Contribute

[![Tasks][waffle-img]][waffle-url]

Standards for this project, including tests, code coverage, and semantics are enforced with a build tool. Pull requests must include passing tests with 100% code coverage and no linting errors.

----

© 2015 Shannon Moeller <me@shannonmoeller.com>

Licensed under [MIT](http://shannonmoeller.com/mit.txt)

[amazon-img]:    https://img.shields.io/badge/amazon-tip_jar-yellow.svg?style=flat-square
[amazon-url]:    https://www.amazon.com/gp/registry/wishlist/1VQM9ID04YPC5?sort=universal-price
[coveralls-img]: http://img.shields.io/coveralls/shannonmoeller/async-map-stream/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/shannonmoeller/async-map-stream
[downloads-img]: http://img.shields.io/npm/dm/async-map-stream.svg?style=flat-square
[gitter-img]:    http://img.shields.io/badge/gitter-join_chat-1dce73.svg?style=flat-square
[gitter-url]:    https://gitter.im/togajs/toga
[npm-img]:       http://img.shields.io/npm/v/async-map-stream.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/async-map-stream
[travis-img]:    http://img.shields.io/travis/shannonmoeller/async-map-stream.svg?style=flat-square
[travis-url]:    https://travis-ci.org/shannonmoeller/async-map-stream
[waffle-img]:    http://img.shields.io/github/issues/shannonmoeller/async-map-stream.svg?style=flat-square
[waffle-url]:    http://waffle.io/shannonmoeller/async-map-stream
