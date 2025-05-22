import { name } from './package.json';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  displayName: name,
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  testTimeout: 10000,
};

export default config;
