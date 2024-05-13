module.exports = {
  testEnvironment: 'node', 
  testMatch: [
    '**/tests/**/*.js', // Matches any JavaScript files in 'tests' folders anywhere in your project
    '**/?(*.)+(spec|test).js' // Matches files with .spec.js or .test.js suffix
  ],
  transform: {},
};
