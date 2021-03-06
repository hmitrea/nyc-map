// NOTE: To use this example standalone (e.g. outside of deck.gl repo)
// delete the local development overrides at the bottom of this file

const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CONFIG = {
  entry: {
    app: './index.js'
  },

  devtool: 'source-map',
  devServer: {
      compress: true,
      disableHostCheck: true,   // That solved it

   },
  module: {
    rules: [
      {
        // Transpile ES6 to ES5 with babel
        // Remove if your app does not use JSX or you don't need to support old browsers
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          presets: ['@babel/preset-react']
        }
      },{
      test: /\.css$/,
     loaders: [
       'style-loader',
       'css-loader'
     ]
   }
    ]
  },

  resolve: {
    alias: {
      // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
      'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
  },

  // Optional: Enables reading mapbox token from environment variable
  plugins: [
    new webpack.EnvironmentPlugin(['MapboxAccessToken']),

    new HtmlWebpackPlugin({title: 'adnan test'})
  ],
  optimization:
  {
    sideEffects: false, // <----- in prod defaults to true if left blank


  }
};

// This line enables bundling against src in this repo rather than installed deck.gl module
module.exports = CONFIG //env => (env ? require('../../../webpack.config.local')(CONFIG)(env) : CONFIG);
