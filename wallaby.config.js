module.exports = function() {
  return {
    files: [
      'index.js'
    ],

    tests: [
      'test.js'
    ],

    testFramework: 'jest',

    env: {
      type: 'node'
    }
  };
};
