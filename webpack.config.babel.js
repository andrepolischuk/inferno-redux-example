/* eslint-disable max-len */
import webpack from 'webpack';
import cssnext from 'postcss-cssnext';

const production = process.env.NODE_ENV === 'production';

export default {
  entry: './index',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&camelCase&importLoaders=1&localIdentName=[path][name]--[local]--[hash:base64:5]!postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      }
    ]
  },
  postcss: [
    cssnext
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    ...production && [
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          screw_ie8: true,
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin()
    ]
  ],
  ...!production && {
    devServer: {
      inline: true,
      historyApiFallback: true,
      progress: true,
      port: 3000,
      stats: {
        colors: true
      }
    }
  }
};

