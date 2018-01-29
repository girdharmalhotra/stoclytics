/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), config.devServer)
.listen(config.devServer.port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + config.devServer.port);
  console.log('Open your Browser and go to http://localhost:5000/');
});
