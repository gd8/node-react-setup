const path = require('path');
const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

clientConfig = {
  target: 'web',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, 'src/client/index.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        query: {
          configFileName: path.resolve(
            __dirname,
            'src/client/tsconfig-client.json',
          ),
        },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
  },
  devServer: {
    port: 3000,
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
    new webpack.ProvidePlugin({
      React: 'react',
    }),
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
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
    ],
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
