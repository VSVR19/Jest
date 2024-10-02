import type { Config } from '@jest/types'

const baseDirectory = `<rootDir>/src/app/server_app`
const baseTestDirectory = `<rootDir>/src/test/server_app`

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    // ** matches any directory present under doubles.
    // * matches any file present under any directory under doubles.
    
    // '<rootDir>/src/app/**/*.ts'
    `${baseDirectory}/**/*.ts`    
  ],
  testMatch: [
    `${baseTestDirectory}/**/*.ts`
  ]
}

export default config