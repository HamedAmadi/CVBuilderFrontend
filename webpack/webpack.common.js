const webpack = require("webpack");
const path = require( 'path' )
// const CopyWebpackPlugin = require('copy-webpack-plugin') ;
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
   resolve: {
     extensions: ['.tsx', '.ts', '.js', '.jsx', '.sass', '.css'],
      fallback: {
      module: "empty",
      dgram: "empty",
      dns: "mock",
      fs: "empty",
      http2: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty",
      process: require.resolve("process/browser"),
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util"),
      buffer: require.resolve("buffer"),
      asset: require.resolve("assert"),
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: {
          minChunks: 20,
          reuseExistingChunk: true,
        },
        vendor_react: {
          test: /.*\/node_modules\/react\/index\.js/,
          name: 'vendor-react',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  output: {
    publicPath: '/',
    filename: '[name].[contenthash].js',
    path: path.resolve( __dirname, '..', 'build' ),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: `public/index.html`,
      favicon: "public/favicon.ico",
      name: 'index',
    } ),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    } ),
  ],
}
