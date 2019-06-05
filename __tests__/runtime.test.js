const { transformFileSync } = require("@babel/core");
const fs = require("fs");
const path = require("path");

const TRANSFORM_OPTIONS = require("../package.json").babel;

const TEST_FILES = path.join(__dirname, "__runtime__");
const TRANSFORMED_FILES = fs.readdirSync(TEST_FILES).reduce((tests, file) => {
  const filename = path.join(TEST_FILES, file);
  const transformed = transformFileSync(filename, TRANSFORM_OPTIONS).code;

  tests[file.replace(".js", "")] = eval(transformed);

  return tests;
}, {});

describe("runtime tests", () => {
  for (const fn in TRANSFORMED_FILES) {
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
