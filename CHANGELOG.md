## CHANGELOG

# 2.0.4

- [#37](https://github.com/planttheidea/inline-loops.macro/pull/37/files) - Smarter IIFE wrapper determination logic

# 2.0.3

- [#36](https://github.com/planttheidea/inline-loops.macro/pull/36) - Allow readonly collections, and fix `reduce*` method types for callback

# 2.0.2

- [#33](https://github.com/planttheidea/inline-loops.macro/pull/33) - Prevent `forEach*` methods from hoisting early returns
- [#34](https://github.com/planttheidea/inline-loops.macro/pull/34) - Simplify and fix `findIndex` / `findKey` / `findLastIndex` types
- [#35](https://github.com/planttheidea/inline-loops.macro/pull/35) - Reuse member expressions as the local collection

# 2.0.1

- [#32](https://github.com/planttheidea/inline-loops.macro/pull/32) - Fix `forEach*` methods not including the hoisted function call

# 2.0.0

## Breaking change

- `findRight` has been renamed to `findLast`
- `findIndexRight` has been renamed to `findLastIndex`

## Enhancements

- Support for conditional and lazy scenarios (ternaries, logical expressions, default parameter assignments, etc.)
- Better TS typing
- Better inline handling of complex logic

# 1.2.2

- Fix types related to `ArrayHandler` / `ObjectHandler` [#12](https://github.com/planttheidea/inline-loops.macro/pull/12)

# 1.2.1

- Add console warnings for deopt scenarios [#10](https://github.com/planttheidea/inline-loops.macro/pull/10)

# 1.2.0

- Expand aggressive inliner [#8](https://github.com/planttheidea/inline-loops.macro/pull/8)

# 1.1.0

- Add `flatMap` / `flatMapRight` [#6](https://github.com/planttheidea/inline-loops.macro/pull/6)

# 1.0.3

- Republish for bad version

# 1.0.2

- Allow inline of reduce [#1](https://github.com/planttheidea/inline-loops.macro/pull/1)

# 1.0.1

- fix description

# 1.0.0

- Initial release!
