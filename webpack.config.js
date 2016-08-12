var webpack = require("webpack");
var path = require("path");
 
var SRC = path.resolve(__dirname, "src");
var OUTPUT = path.resolve(__dirname, "dist");
 
var config = {
  entry: SRC + "/demo.jsx",
  output: {
    path: OUTPUT,
    filename: "/demo.js"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
	      include: SRC,
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-1', 'react']
        }
      }
    ],
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  plugins: [
    // tells webpack to omit some things it uses for node environment builds
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
};
 
module.exports = config;