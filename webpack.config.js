const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
    filename: 'test-task-2.js',
    path: path.resolve(__dirname, 'build'),
  },
};