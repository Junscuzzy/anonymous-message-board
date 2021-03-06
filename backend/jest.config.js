module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  setupFilesAfterEnv: ['jest-extended'],
}
