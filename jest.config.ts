export default {
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  transform: {
    "^.+\\.(js|ts)$": "ts-jest",
    "^.+\\.vue$": "vue-jest",
  },
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,ts,tsx,vue}",
    "<rootDir>/src/**/**/*.{js,ts,tsx,vue}",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
