const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;
const path = require( 'path' )

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
     rules: [
       {
         test: /\.tsx?$/,
         exclude: /node_modules/,
         use: 'ts-loader',
       },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(pdf)$/i,
        use: 'file-loader'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|pdf|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000
  },
}
