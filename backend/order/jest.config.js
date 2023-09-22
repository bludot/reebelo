module.exports = {
  preset: 'ts-jest',
  passWithNoTests: true,
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'test-config',
    'interfaces',
    'jestGlobalMocks.ts',
    '.module.ts',
    'modules/common/pipes/validation.ts',
    '.prototype.ts',
    'modules/common/logger',
    'modules/config/*',
    'seed/*',
    'src/db',
  ],
  coverageReporters: ['json', 'lcov', 'text-summary', 'text', 'clover'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 80,
    },
  },
};
