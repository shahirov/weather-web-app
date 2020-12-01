const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const postcssNormalize = require('postcss-normalize')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const paths = require('./paths')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    pathinfo: true,
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].chunk.js',
  },
  devServer: {
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    contentBasePublicPath: paths.publicUrlOrPath,
    watchContentBase: true,
    hot: true,
    publicPath: paths.publicUrlOrPath.slice(0, -1),
    quiet: true,
    host: 'localhost',
    open: true,
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              postcssOptions: [],
              plugins: [
                [
                  require.resolve('postcss-preset-env'),
                  {
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  },
                ],
                postcssNormalize(),
              ],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              postcssOptions: [],
              plugins: [
                [
                  require.resolve('postcss-preset-env'),
                  {
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  },
                ],
                postcssNormalize(),
              ],
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new CaseSensitivePathsPlugin(),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
    }),
    new ErrorOverlayPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
})