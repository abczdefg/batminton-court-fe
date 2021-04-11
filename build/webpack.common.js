const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const paths = require('./paths');

const isPrd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    app: [paths.entry]
  },
  output: {
    path: paths.dist,
    publicPath: '/',
    filename: '[name].[contenthash:8].chunk.js',
    chunkFilename: '[name].[contenthash:8].chunk.js'
  },
  resolve: {
    modules: ['node_modules', paths.src],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': paths.src,
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: paths.src,
        enforce: 'pre',
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        include: [paths.src, paths.lib],
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isPrd,
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isPrd
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: ['./theme/var.scss']
            }
          }
        ],
        include: paths.src
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                if (isPrd) {
                  return 'static/images/[name].[contenthash:8].[ext]';
                }
                return '[path][name].[ext]';
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                if (isPrd) {
                  return 'static/fonts/[name].[contenthash:8].[ext]';
                }
                return '[path][name].[ext]';
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: paths.template }),
  ]
};
