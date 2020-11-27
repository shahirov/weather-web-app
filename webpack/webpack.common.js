const DotenvPlugin = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const paths = require('./paths')

module.exports = {
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    publicPath: paths.publicUrlOrPath,
  },
  resolve: {
    extensions: paths.moduleFileExtensions.map((extension) => `.${extension}`),
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/[name].[contenthash:8].[ext]',
        },
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: '@svgr/webpack',
            options: {
              ref: true,
              memo: true,
              babel: false,
              prettier: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
            },
          },
        ],
      },
    ],
    strictExportPresence: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      favicon: paths.appFavicon,
    }),
    new DotenvPlugin({
      path: paths.dotenv,
      expand: true,
      systemvars: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: paths.appTsConfig,
      },
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      context: paths.appSrc,
    }),
  ],
}
