/* eslint-disable */

const { transformFileSync } = require('@babel/core');
const fs = require('fs');
const path = require('path');

const TRANSFORM_OPTIONS = require('../package.json').babel;

const TEST_FILES = path.join(__dirname, '__runtime__');
const TRANSFORMED_FILES = fs.readdirSync(TEST_FILES).reduce((tests, file) => {
  const filename = path.join(TEST_FILES, file);
  const fn = file.replace('.js', '');

  if (fn.startsWith('error-')) {
    test(`if ${fn
      .replace('error-', '')
      .replace('-', ' ')} will throw an error`, () => {
      expect(() => transformFileSync(filename, TRANSFORM_OPTIONS)).toThrow();
    });

    return tests;
  }

  const transformed = transformFileSync(filename, TRANSFORM_OPTIONS).code;

  tests[fn] = eval(transformed);

  return tests;
}, {});

describe('runtime tests', () => {
  for (const fn in TRANSFORMED_FILES) {
    if (fn === 'errors') {
      console.log('foo');

      continue;
    }

    const file = TRANSFORMED_FILES[fn];

    describe(fn, () => {
      for (const type in file) {
        const categories = file[type];

        describe(type, () => {
          for (const test in categories) {
            const category = categories[test];

            it(`should handle ${test} correctly`, () => {
              expect(category.true).toBe(true);

              if (category.false) {
                expect(category.false).toBe(false);
              }
            });
          }
        });
      }
    });
  }
});
