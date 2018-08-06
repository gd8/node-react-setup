const path = require('path');
const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals');

clientConfig = {
  target: 'web',
  mode: 'development',
  entry: {
    client: './src/client/index.ts',
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ }],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    function() {
      this.plugin('watch-run', function(watching, callback) {
        console.clear();
        console.log('Compiling frontend at ' + new Date());
        callback();
      });
    },
  ],
};

serverConfig = {
  target: 'node',
  mode: 'development',
  entry: {
    server: './src/server/index.ts',
  },
  externals: [nodeExternals()],
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ }],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    function() {
      this.plugin('watch-run', function(watching, callback) {
        console.clear();
        console.log('Compiling backend at ' + new Date());
        callback();
      });
    },
    new webpack.WatchIgnorePlugin(['./dist']),
  ],
};

module.exports = [serverConfig, clientConfig];
