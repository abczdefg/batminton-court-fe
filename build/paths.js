const path = require('path');

const root = path.resolve(__dirname, '../');

module.exports = {
  src: path.resolve(root, 'src'),
  dist: path.resolve(root, 'dist'),
  lib: path.resolve(root, 'node_modules'),
  entry: path.resolve(root, 'src/index.js'),
  assets: path.resolve(root, 'src/assets'),
  template: path.resolve(root, 'public/index.html')
};
