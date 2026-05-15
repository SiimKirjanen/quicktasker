module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/test-utils/__mocks__/fileMock.js",
    "\\.(png|jpg|jpeg|gif|svg|webp)$": "<rootDir>/src/test-utils/__mocks__/fileMock.js",
  },
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  testMatch: ["<rootDir>/src/**/*.(test|spec).(ts|tsx)"],
};
