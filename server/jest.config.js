const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  preset: '@shelf/jest-mongodb',
  transform: tsjPreset.transform,
  testEnvironment: "node",
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  // setupFilesAfterEnv: ['./tests/jest.setup.ts'],
}
