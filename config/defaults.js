/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 5000;

// const extractStyles = new ExtractTextPlugin({ filename: 'stoclytics.css', allChunks: true });

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

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          include: srcPath,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        },
        // {
        //   // Compile our own SASS and CSS
        //   test: /(\.s?css)$/,
        //   use: extractStyles.extract({ fallback: 'style-loader', use: [ cssLoader, resolveUrlLoader, sassLoader ] })
        // },
        {
          test: /\.(eot|svg|jpg|ttf|woff|woff2)$/,
          loader: 'file-loader'
        }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/',
  port: dfltPort,
  getDefaultModules: getDefaultModules,
  // extractStyles: extractStyles
};
