// const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
  mode: 'production',
  devtool: 'source-map',
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
        use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|pdf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
}
