/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-16T21:12:21-07:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-16T21:12:21-07:00
 */

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public', 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var google_analytics = process.env.NODE_ENV === 'production' ? fs.readFileSync('src/google_analytics.html') : null;

var config = {
  entry: APP_DIR + '/index.js',
  module: {
    loaders: [
      {
        test : /\.js$/,
        include : APP_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['@babel/preset-react']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      google_analytics: google_analytics,
      filename: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  output: {
    path: BUILD_DIR,
    filename: '[name].[chunkhash].js',
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    publicPath: "/dist/",
    port: 9000,
    historyApiFallback: true
  }
};

module.exports = config;
