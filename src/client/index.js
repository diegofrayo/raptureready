import 'fetch-everywhere';

import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory, Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect'
import { Provider } from 'react-redux'

import ApiClient from '../app/helpers/ApiClient';
import createStore from '../app/redux/create';
import routes from '../app/routes';

const store = createStore(new ApiClient());

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router render={(props) => <ReduxAsyncConnect {...props}/>}
            history={browserHistory}>

      {routes({}, store)}

    </Router>
  </Provider>,
  document.getElementById('root')
);
