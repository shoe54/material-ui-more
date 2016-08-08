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
};
 
module.exports = config;