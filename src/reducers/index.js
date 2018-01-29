'use strict';

/*
** Define all Redux Reducers.
*/

import { combineReducers } from 'redux';

import { MenuReducers } from './MenuReducers';
import { NewsReducers } from './NewsReducers';
import { StocksReducers } from './StocksReducers';

export default combineReducers({
  menu: MenuReducers,
  news: NewsReducers,
  stocks: StocksReducers
});
