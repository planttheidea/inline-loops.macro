# inline-loops.macro

Iteration helpers that inline to native loops for performance

## Table of Contents

- [inline-loops.macro](#inline-loopsmacro)
  - [Table of Contents](#table-of-contents)
  - [Summary](#summary)
  - [Usage](#usage)
  - [Methods](#methods)
  - [How it works](#how-it-works)
    - [Aggressive inlining](#aggressive-inlining)
    - [Bailout scenarios](#bailout-scenarios)
  - [Gotchas](#gotchas)
    - [`*Object` methods do not perform `hasOwnProperty` check](#object-methods-do-not-perform-hasownproperty-check)
    - [`find*` methods](#find-methods)
  - [Development](#development)

## Summary

`inline-loops.macro` is a babel macro that will inline calls to the iteration methods provided, replacing them with `for` loops (or `for-in` in the case of objects). While this adds more code, it is also considerably more performant than the native versions of these methods. When working in non-JIT environments this is also faster than equivalent runtime helpers, as it avoids function calls and inlines operations when possible.

This is inspired by the work done on [babel-plugin-loop-optimizer](https://www.npmjs.com/package/babel-plugin-loop-optimizer), but aims to be both more targeted and more full-featured. Rather than globally replace all native calls, the use of macros allow a controlled, opt-in usage. This macro also supports decrementing array and object iteration, as well as nested usage.

You can use it for everything, only for hotpaths, as a replacement for `lodash` with legacy support, whatever you see fit for your project. The support should be the same as the support for `babel-plugin-macros`.

## Usage

```js
import { map, reduce, someObject } from 'inline-loops.macro';

function contrivedExample(array) {
    const doubled = map(array, (value) => value * 2);
    const doubleObject = reduce(doubled, (object, value) => ({
      ...object,
      [value]: value
    }, {});

    if (someObject(doubleObject, (value) => value > 100)) {
        console.log('I am large!');
    }
}
```

## Methods

- `every` ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every))
  - `everyRight` => same as `every`, but iterating in reverse
  - `everyObject` => same as `every` but iterating over objects intead of arrays
- `filter` ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter))
  - `filterRight` => same as `filter`, but iterating in reverse
  - `filterObject` => same as `filter` but iterating over objects intead of arrays
- `find` ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find))
  - `findLast` => same as `find`, but iterating in reverse ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast))
  - `findObject` => same as `find` but iterating over objects intead of arrays
- `findIndex` ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex))
  - `findLastIndex` => same as `findIndex`, but iterating in reverse ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex))
  - `findKey` => same as `findIndex` but iterating over objects intead of arrays
- `flatMap` ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap))
  - `flatMapRight` => same as `flatMap`, but iterating in reverse
  - There is no object method, as the use cases and expected results are not clearly defined, nor is the expected outcome obvious
- `forEach` ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach))
  - `forEachRight` => same as `forEach`, but iterating in reverse
  - `forEachObject` => same as `forEach` but iterating over objects intead of arrays
- `map` ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map))
  - `mapRight` => same as `map`, but iterating in reverse
  - `mapObject` => same as `map` but iterating over objects intead of arrays
- `reduce` ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce))
  - `reduceRight` => same as `reduce`, but iterating in reverse ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight))
  - `reduceObject` => same as `reduce` but iterating over objects intead of arrays
- `some` ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some))
  - `someRight` => same as `some`, but iterating in reverse
  - `someObject` => same as `some` but iterating over objects intead of arrays

## How it works

Internally Babel will transform these calls to their respective loop-driven alternatives. Example

```js
// this
const foo = map(array, fn);

// becomes this
const _length = array.length;
const _results = Array(_length);
for (let _key = 0, _value; _key < _length; ++_key) {
  _value = array[_key];
  _results[_key] = fn(_value, _key, array);
}
const foo = _results;
```

If you are passing uncached values as the array or the handler, it will store those values as local variables and execute the same loop based on those variables.

### Aggressive inlining

One extra performance boost is that `inline-loops` will try to inline the callback operations when possible. For example:

```js
// this
const doubled = map(array, (value) => value * 2);

// becomes this
const _length = array.length;
const _results = Array(_length);
for (let _key = 0, _value; _key < _length; ++_key) {
  _value = array[_key];
  _results[_key] = _value * 2;
}
const doubled = _results;
```

Notice that there is no reference to the original function, because it used the return directly. This even works with nested calls!

```js
// this
const isAllTuples = every(array, (tuple) =>
  every(tuple, (value) => Array.isArray(value) && value.length === 2),
);

// becomes this
let _determination = true;
for (
  let _key = 0, _length = array.length, _tuple, _result;
  _key < _length;
  ++_key
) {
  _tuple = array[_key];
  let _determination2 = true;
  for (
    let _key2 = 0, _length2 = _tuple.length, _value, _result2;
    _key2 < _length2;
    ++_key2
  ) {
    _value = _tuple[_key2];
    _result2 = Array.isArray(_value) && _value.length === 2;
    if (!_result2) {
      _determination2 = false;
      break;
    }
  }
  _result = _determination2;
  if (!_result) {
    _determination = false;
    break;
  }
}
const isAllTuples = _determination;
```

### Bailout scenarios

Inevitably not everything can be inlined, so there are known bailout scenarios:

- When using a cached function reference (we can only inline functions that are statically declared in the macro scope)
- When there are multiple `return` statements (as there is no scope to return from, the conversion of the logic would be highly complex)
- When the `return` statement is not top-level (same reason as with multiple `return`s)
- The `this` keyword is used (closure must be maintained to guarantee correct value)

That means if you are cranking every last ounce of performance out of this macro, you may want to get cozy with ternaries.

```js
import { map } from 'inline-loops.macro';

// this will bail out to storing the function and calling it in the loop
const deopted = map(array, (value) => {
  if (value % 2 === 0) {
    return 'even';
  }

  return 'odd';
});

// this will inline the operation and avoid function calls
const inlined = map(array, (value) => (value % 2 === 0 ? 'even' : 'odd'));
```

## Gotchas

Some aspects of implementing this macro that you should be aware of:

### `*Object` methods do not perform `hasOwnProperty` check

The object methods will do operations in `for-in` loop, but will not guard via a `hasOwnProperty` check. For example:

```js
// this
const doubled = mapObject(object, (value) => value * 2);

// becomes this
let _result = {};

let _value;

for (let _key in object) {
  _value = object[_key];
  _result[key] = _value * 2;
}

const doubled = _result;
```

This works in a vast majority of cases, as the need for `hasOwnProperty` checks are often an edge case; it only matters when using objects created via a custom constructor, iterating over static properties on functions, or other non-standard operations. `hasOwnProperty` is a slowdown, but can be especially expensive in legacy browsers or non-JIT environments.

If you need to incorporate this, you can just filter prior to the operation:

```js
const filtered = filterObject(object, (_, key) => Object.hasOwn(object, key));
const doubled = mapObject(filtered, (value) => value * 2);
```

### `find*` methods

Most of the operations follow the same naming conventions:

- `{method}` (incrementing array)
- `{method}Right` (decrementing array)
- `{method}Object` (object)

The exception to this is the collection of `find`-related methods:

- `find`
- `findLast`
- `findObject`
- `findIndex`
- `findLastIndex`
- `findKey`

The reason for `findLast` / `findLastIndex` instead of `findRight` / `findIndexRight` is because unlike all the other right-direction methods, those are part of the ES spec. Additionally, the reason for `findIndex` vs `findKey` is semantic, as objects have keys and arrays have indices.

## Development

Standard stuff, clone the repo and `npm install` dependencies. The npm scripts available:

- `build` => runs babel to transform the macro for legacy NodeJS support
- `clean`=> remove any files from `dist`
- `lint` => runs ESLint against all files in the `src` folder
- `lint:fix` => runs `lint`, fixing any errors if possible
- `prepublishOnly` => run `lint`, `typecheck`, `test`, `clean`, `and `dist`
- `release` => release new version
- `release:beta` => release new beta version
- `test` => run jest tests
- `test:watch` => run `test`, but with persistent watcher
- `typecheck` => run `tsc` against the codebase
