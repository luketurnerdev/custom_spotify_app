const path = require('path');
// const productionConfig = merge([

//   parts.generateSourceMaps({ type: "source-map" }),

//   ...
// ]);
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map'
};