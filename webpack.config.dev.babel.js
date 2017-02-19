import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const appPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  context: appPath,
  entry: [
    './app.js',
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: distPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        loader: 'file-loader?name=images/[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        worker: {
          output: {
            filename: '[name].worker.js',
            chunkFilename: '[name].worker.js',
          },
        },
      },
    }),
  ],
  devtool: 'source-map',
};
