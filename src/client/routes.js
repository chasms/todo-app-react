import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/app';

const routes = (
  <Router history={browserHistory}>
    <Route path='/(:filter)' component={App} />
  </Router>
);

export default routes;
