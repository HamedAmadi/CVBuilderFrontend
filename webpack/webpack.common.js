const webpack = require("webpack");
const path = require( 'path' )
// const CopyWebpackPlugin = require('copy-webpack-plugin') ;
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
   resolve: {
     extensions: ['.tsx', '.ts', '.js', '.jsx'],
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
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve( __dirname, '..', 'build' ),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: `public/index.html`,
      favicon: "public/favicon.ico",
      name: 'index',
      // inject: tru/e
    } ),
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    // } ),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    } ),
  ],
}