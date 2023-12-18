module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/__fixtures__/', '/__runtime__/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
