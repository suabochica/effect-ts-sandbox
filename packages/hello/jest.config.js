// eslint-disable-next-line
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.ts"],
  setupFiles: ["./scripts/jest-setup.ts"],
  modulePathIgnorePatterns: ["<rootDir>/lib"],
  verbose: true,
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json",
      compiler: "ttypescript"
    }
  }
}