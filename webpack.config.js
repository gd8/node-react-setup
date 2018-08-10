const path = require('path');
const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

clientConfig = {
  target: 'web',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devtool: 'inline-source-map',
  entry: {
    vendor: ['react', 'react-dom'],
    client: path.resolve(__dirname, 'src/client/index.tsx'),
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(
            __dirname,
            'src/client/tsconfig-client.json',
          ),
        },
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 3000,
    open: true,
    // proxy: {
    //   "/api": "http://localhost:8080"
    // }
  },
  plugins: [
    function() {
      this.plugin('watch-run', function(watching, callback) {
        console.clear();
        console.log('Compiling frontend at ' + new Date());
        callback();
      });
    },
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/client/index.html'),
    }),
  ],
};

serverConfig = {
  target: 'node',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
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

module.exports = [clientConfig, serverConfig];
