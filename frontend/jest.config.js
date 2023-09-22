const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
    // Add more setup options before each test is run
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

    testEnvironment: 'jest-environment-jsdom',
    modulePaths: ['<rootDir>/src'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/.next/'
    ],

    // coverage options
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/index.ts',
        '!src/**/index.tsx',
        '!src/**/*.stories.tsx',
        '!src/**/*.stories.ts',
        '!src/**/*.test.tsx',
        '!src/**/*.test.ts',
        '!src/**/mocks.ts',
        '!src/app/**/*',
        '!src/gql/**/*',
        '!src/api/**/*',
    ],
    coverageReporters: ['lcov', 'text'],
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            branches: 30,
            functions: 80,
            lines: 80,
            statements: 80,
        }
    },
    "transform": {
        "\\.tsx$": ["babel-jest", {"configFile": "./babel.config.jest.js"}],
        "\\.ts$": ["babel-jest", {"configFile": "./babel.config.jest.js"}]
    }

}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = {
    ...createJestConfig,
    ...config,
}