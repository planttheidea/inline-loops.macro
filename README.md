# inline-loops.macro

Iteration helpers that inline to native loops for performance

## Table of Contents

- [inline-loops.macro](#inline-loopsmacro)
  - [Table of Contents](#table-of-contents)
  - [Summary](#summary)
  - [Usage](#usage)
  - [Methods](#methods)
  - [How it works](#how-it-works)
  - [Gotchas](#gotchas)
    - [`*Object` methods do not perform `hasOwnProperty` check](#object-methods-do-not-perform-hasownproperty-check)
    - [`findIndex` vs `findKey`](#findindex-vs-findkey)
  - [Development](#development)

## Summary

`inline-loops.macro` is a babel macro that will inline calls to the iteration methods provided, replacing them with `for` loops (or `for-in` in the case of objects). While this adds more code, it is also considerably more performant than the native versions of these methods. When working in non-JIT environments this is also faster than equivalent runtime helpers, as it avoids function calls and inlines operations when possible.

This is inspired by the work done on [babel-plugin-loop-optimizer](https://www.npmjs.com/package/babel-plugin-loop-optimizer), but aims to be both more targeted and more full-featured. Rather than globally replace all native calls, the use of macros allow a controlled, opt-in usage. This macro also supports decrementing array and object iteration, as well as nested usage.

You can use it for everything, only for hotpaths, as a replacement for `lodash` with legacy support, whatever you see fit for your project. The support should be the same as the support for `babel-plugin-macros`.

## Usage

```javascript
import { map, reduce, someObject } from 'inline-loops.macro';

function contrivedExample(array) {
    const doubled = map(array, (value) => value * 2);
    const doubleObject = reduce(doubled, (object, value) => ({ 
      ...object, 
      [value]: value 
    });

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

Notice that there is no reference to the original function, because it used the return directly. This even works with nested calls!

```javascript
// this
const isAllTuples = every(array, tuple => 
  every(tuple, (value) => Array.isArray(value) && value.length === 2)
);

// becomes this
let _result = true;

for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];

  let _result2 = true;

  for (let _key2 = 0, _length2 = _value.length, _value2; _key2 < _length2; ++_key2) {
    _value2 = _value[_key2];

    if (!(Array.isArray(_value2) && _value2.length === 2)) {
      _result2 = false;
      break;
    }
  }
  
  if (!_result2) {
    _result = false;
    break;
  }
}

const isAllTuples = _result;
```

## Gotchas

Some aspects of implementing this macro that you should be aware of:

### `*Object` methods do not perform `hasOwnProperty` check

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

This works in a vast majority of cases, as the need for `hasOwnProperty` checks are often an edge case; it only matters when using objects created via a custom constructor, iterating over static properties on functions, or other non-standard operations. `hasOwnProperty` is a slowdown, but can be especially expensive in legacy browsers or non-JIT environments.

If you need to incorporate this, you can do it one of two ways:

**Add filtering (iterates twice, but arguably cleaner semantics)**

```javascript
// this
const raw = mapObject(object, (value, key) => object.hasOwnProperty(key) ? value * 2 : null);
const doubled = filterObject(raw, value => value !== null);
```

**Use reduce instead (iterates only once, but a little harder to grok)**

```javascript
const doubled = reduceObject(object, (_doubled, value, key) => {
  if (object.hasOwnProperty(key)) {
    _doubled[key] = value * 2;
  }

  return _doubled;
});
```

### `findIndex` vs `findKey`

Most of the operations follow the same naming conventions:

- `{method}` (incrementing array)
- `{method}Right` (decrementing array)
- `{method}Object` (object)

The exception to this is `findIndex` / `findKey` (which are specific to arrays) and `findKey` (which is specific to objects). The rationale should be obvious (arrays only have indices, objects only have keys), but because it is the only exception to the rule I wanted to call it out.

## Development

Standard stuff, clone the repo and `npm install` dependencies. The npm scripts available:

- `build` => runs babel to transform the macro for legacy NodeJS support
- `copy:types` => copies `index.d.ts` to `build`
- `dist` => runs `build` and `copy:types`
- `lint` => runs ESLint against all files in the `src` folder
- `lint:fix` => runs `lint``, fixing any errors if possible
- `prepublishOnly` => run `lint`, `test`, `test:coverage`, and `dist`
- `release` => release new version (expects globally-installed `release-it`)
- `release:beta` => release new beta version (expects globally-installed `release-it`)
- `test` => run jest tests
- `test:watch` => run `test`, but with persistent watcher
