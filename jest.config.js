module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg|webp)$": "<rootDir>/src/test-utils/__mocks__/fileMock.js",
  },
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  testMatch: ["<rootDir>/src/**/*.(test|spec).(ts|tsx)"],
};
