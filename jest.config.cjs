module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    '/node_modules/',
  ],
};

