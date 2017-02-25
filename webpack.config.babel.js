import path from 'path';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const appPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'docs');

const vendor = [
  'react',
  'react-dom',
  'react-dropzone',
  'react-select',
  'graphql',
  'graphiql',
];

const parsers = [
  'oadf-parser-seltec3-pdf',
];

module.exports = {
  context: appPath,
  entry: {
    vendor,
    parsers,
    app: './app.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
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
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        worker: {
          output: {
            filename: '[name].worker.js',
            chunkFilename: '[name].worker.js',
          },
        },
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['parsers', 'vendor',],
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new CleanPlugin('dist', {
      verbose: false,
    }),
  ],
};
