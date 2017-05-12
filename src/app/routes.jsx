import React, {Component} from 'react';
import { Route, IndexRoute  } from 'react-router';

import WebApp from './WebApp';

import Browse from './Pages/Browse';
import Player from './Pages/Player';
import SearchResults from './Pages/SearchResults';
import Login from './Pages/LogIn';
import Signup from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import ChangePassword from './Pages/ChangePassword';

export default (aProps, store) => {

  const requireLogin = (nextState, replace, cb) => {
    if (!store) {
      return cb();
    }

    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/login');
      }
      cb();
    }

    checkAuth();
  };

  return (
    <Route>

      <Route component={WebApp}>
        <Route onEnter={requireLogin}>
          <Route path="/browse" component={Browse} />
          <Route path="/watch/:channelId" component={Player} />
          <Route path="/search/:query" component={SearchResults} />
          <Route path="/change-password" component={ForgotPassword} />
        </Route>

        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password(/:token)" component={ForgotPassword} />

      </Route>

    </Route>

  );
}