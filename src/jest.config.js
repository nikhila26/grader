module.exports = {
    // Test files pattern
    testMatch: ['<rootDir>/src/**/*.test.js'], // Looks for test files in the 'src' directory
  
    // Setup files to run before each test
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Include global setup files
  
    // Test environment for React components
    testEnvironment: 'jsdom', // Use 'jsdom' for testing React components
  
    // Transformations for different file types
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest', // Use 'babel-jest' to transform JS and JSX files
    },
  
    // File extensions to consider for modules
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  
    // Global test timeout
    testTimeout: 10000, // Optional: adjust the timeout for long-running tests (10 seconds)
  
    // Mocking file and module aliases
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy', // Mocks CSS imports
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js', // Mocks file imports
    },
  
    // Code coverage configuration
    collectCoverage: true, // Enables code coverage reporting
    coverageDirectory: '<rootDir>/coverage', // Output directory for coverage reports
  };
  