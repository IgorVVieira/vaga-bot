import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src', '<rootDir>'],
  verbose: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/src/**/*.spec.ts'],
};

export default config;