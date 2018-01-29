/*
** Define all the Routes of the App
** PageWrapper Component will be the Skeleton Component of every page.
*/

import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import Stocks from 'pages/Stocks';
import { PageWrapper } from 'components/PageWrapper';

export const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={PageWrapper}>
      <IndexRedirect to="/resources/energy/BP" />
      <Route path=":category(/:sector)/:ticker" component={Stocks}></Route>
    </Route>
  </Router>
)
