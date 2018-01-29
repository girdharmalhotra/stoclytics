'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: false,
    data: '@import "./src/theme/variables.scss";', // Injects global sass variables into all sass modules
    includePaths: [path.join(__dirname, '/../node_modules')]
  }
};

const resolveUrlLoader = {
  loader: 'resolve-url-loader',
  options: {
    sourceMap: true,
    keepQuery: true
  }
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
};

const styleLoader = {
  loader: 'style-loader'
};

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
       debug: true,
       options: {
           port: defaultSettings.port
         }
    }),
    new ExtractTextPlugin('stoclytics.css'),
    new HtmlWebpackPlugin({
            title: "Stoclytics"
        }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

config.module.rules.push({
  // Compile our own SASS and CSS
  test: /(\.s?css)$/,
  use: ExtractTextPlugin.extract({ use: [ cssLoader, resolveUrlLoader, sassLoader ] })
});

// Add needed rules to the defaults here
config.module.rules.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=react,presets[]=stage-1&plugins[]=react-html-attrs,plugins[]=transform-class-properties,plugins[]=transform-decorators-legacy',
  include: [ path.join(__dirname, '/../src') ]
});

module.exports = config;
