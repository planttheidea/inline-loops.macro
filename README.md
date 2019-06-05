# inline-loops.macro

Automatic inlining of loops for performance boost

## Table of Contents

## Summary

`inline-loops.macro` is a babel macro that will inline calls to the iteration methods provided, replacing them with `for` loops (or `for-in` in the case of objects). While this adds more code, it is also considerably more performant than the native versions of these methods. When working in non-JIT environments this is also faster than equivalent runtime helpers, as it avoids function calls and inlines operations when possible.

This is inspired by the work done on [babel-plugin-loop-optimizer](https://www.npmjs.com/package/babel-plugin-loop-optimizer), but aims to be both more targeted and more full-featured. Rather than globally replace all native calls, the use of macros allow a controlled, opt-in usage. You can use it for everything, only for hotpaths, as a replacement for `lodash` with legacy support, whatever you see fit for your project.

## Usage

```javascript
import { map, reduce, someObject } from 'inline-loops.macro';

function contrivedExample(array) {
    const doubled = map(array, (value) => value * 2);
    const doubleObject = reduce(doubled, (object, value) => ({ ...object, [value]: value });

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
  - `findRight` => same as `find`, but iterating in reverse
  - `findObject` => same as `find` but iterating over objects intead of arrays
- `findIndex` ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex))
  - `findIndexRight` => same as `findIndex`, but iterating in reverse
  - `findKey` => same as `findIndex` but iterating over objects intead of arrays
- `forEach` ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach))
  - `forEachRight` => same as `forEach`, but iterating in reverse
  - `forEachObject` => same as `forEach` but iterating over objects intead of arrays
- `map` ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map))
  - `mapRight` => same as `map`, but iterating in reverse
  - `mapObject` => same as `map` but iterating over objects intead of arrays
- `reduce` ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce))
  - `reduceRight` => same as `reduce`, but iterating in reverse
  - `reduceObject` => same as `reduce` but iterating over objects intead of arrays
- `some` ([MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some))
  - `someRight` => same as `some`, but iterating in reverse
  - `someObject` => same as `some` but iterating over objects intead of arrays

## How it works

Internally Babel will transform these calls to their respective loop-driven alternatives. Example

```javascript
// this
const foo = map(array, fn);

// becomes this
let _result = [];

for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];
  _result.push(fn(_value, _key, array));
}

const foo = _result;
```

If you are passing uncached values as the array or the handler, it will store those values as local variables and execute the same loop based on those variables.

One extra performance boost is that `inline-loops` will try to inline operations when possible. For example:

```javascript
// this
const doubled = map(array, value => value * 2);

// becomes this
let _result = [];

for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];
  _result.push(_value * 2);
}

const doubled = _result;
```

Notice that there is no reference to the original function, because it used the return directly.

## Gotchas

There are a few limitations for this macro to be aware of:

1. Nested macro calls are not allowed

Due to the static analysis operations not following the same order as normal runtime operations, this macro will fail if the result of one macro call is passed as the iterable directly inside of another macro call. In this situation, you should store each operation to a variable and operate on that variable.

```javascript
// this will fail
const foo = map(filter(array, filterFn), mapFn);

// do this instead
const filtered = filter(array, filterfn);
const foo = map(filtered, mapFn);
```

If you are doing nested operations in your handler, this does not apply.

```javascript
// this is fine
const onlyStringTuples = filter(array, (value) => {
  return value.length === 2 && every(value, (v) => typeof v === 'string');
})
```

2. `*Object` methods do not perform `hasOwnProperty` check

The object methods will do operations in `for-in` loop, but will not guard via a `hasOwnProperty` check. For example:

```javascript
// this
const doubled = mapObject(object, value => value * 2);

// becomes this
let _result = {};

let _value;

for (let _key in object) {
  _value = object[_key];
  _result[key] = _value * 2;
}

const doubled = _result;
```

The need for `hasOwnProperty` checks are often an edge case, as it only matters when using objects created via a custom constructor, iterating over static properties on functions, or other non-standard operations. This is a slowdown in all environments, but they can be especially expensive in legacy browsers or non-JIT environments.

If you need to incorporate this, you can do it one of two ways:

**Add filtering (iterates twice, but arguably cleaner semantics)**

```javascript
// this
const raw = mapObject(object, (value, key) => Object.prototype.hasOwnProperty.call(object, key) ? value * 2 : null);
const doubled = filterObject(raw, value => value !== null);
```

**Use reduce instead (iterates only once, but a little harder to grok)**

```javascript
const doubled = reduceObject(object, (_doubled, value, key) => {
  if (Object.prototype.hasOwnProperty.call(object, key)) {
    _doubled[key] = value * 2;
  }

  return _doubled;
});
```

1. `findIndex` vs `findKey`

Most of the operations follow the same naming conventions:

- `{method}` (incrementing array)
- `{method}Right` (decrementing array)
- `{method}Object` (object)

The exception to this is `findIndex` / `findKey` (which are specific to arrays) and `findKey` (which is specific to objects). The rationale should be obvious (arrays only have indices, objects only have keys), but because it is the only exception to the rule I wanted to call it out.
