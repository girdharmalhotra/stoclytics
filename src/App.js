'use strict';

/*
** Main App Component to render the whole app.
** This component includes the Routes defined in Routes.js
*/

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { multiClientMiddleware } from 'redux-axios-middleware';
import logger from 'redux-logger';
import reducers from 'reducers';
import axios from 'axios';

import { Routes } from './Routes';

import 'theme';

const axiosClients = {
  default: {
    client: axios.create({
      baseURL:'http://www.json-generator.com/api',
      responseType: 'json'
    })
  },
  stocks: {
    client: axios.create({
      baseURL:'https://www.alphavantage.co',
      responseType: 'json'
    })
  }
}

// Define Axios Redux Middleware
const axiosMiddleware = multiClientMiddleware( axiosClients );

// APPLY MIDDLEWARE
const middleware = applyMiddleware(logger, axiosMiddleware);

// STEP 1: CREATE THE STORE
const store = createStore(reducers, middleware);

const app = (
  <Provider store={ store }>
    {Routes}
  </Provider>
)

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (app);
  }
}

export default App;
