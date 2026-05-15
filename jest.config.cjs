/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.{js,jsx}'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.stories.{js,jsx}',
    '!src/index.js',
  ],
  coverageThreshold: {
    global: {
      branches: 68,
      functions: 72,
      lines: 68,
      statements: 68,
    },
  },
};
