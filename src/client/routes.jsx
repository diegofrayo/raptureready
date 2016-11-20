import React from 'react';
import { Route } from 'react-router';
import App from './App';
import Browse from './Pages/Browse';

export default (
  <Route component={App}>
    <Route path="/" component={Browse} />
  </Route>
);
