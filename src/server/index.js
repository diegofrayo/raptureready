/* @flow */
global.__SERVER__ = true;
require('es6-promise').polyfill();
require('fetch-everywhere');

import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router'
import express from 'express';
import useragent from 'express-useragent';
import serialize from 'serialize-javascript';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import _ from 'lodash';

import config from './config';

import { loadOnServer } from 'redux-connect'
import { Provider } from 'react-redux';

import ApiClient from '../app/helpers/ApiClient';
import createStore from  '../app/redux/create';
import adminCreateStore from  '../admin/redux/create';

import routes from '../app/routes.jsx';
import adminRoutes from '../admin/routes';

import { passportInit } from './passport/passport';

import categoryController from './category/category.controller';
import userController from './user/user.controller';
import adminController from './admin/admin.controller';
import channelController from './channel/channel.controller';

var STATIC_ASSETS_CDN = process.env.STATIC_ASSETS_CDN || '';
var WEBPACK_ASSETS = process.env.WEBPACK_ASSETS || '';

global.__currentRequestUserAgent__ = '';

// TODO: handle mongoose error
console.log('connect to ' + config.MONGO_URL);
mongoose.connect(config.MONGO_URL);
const app = express();

app.use(express.static('www'));
app.use(useragent.express());

app.set('view engine', 'pug');
app.set('views',  $dirname + '/views/');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator([{}]));

passportInit(app);

app.use(function (req, res, next) {

  req.WEPAPP_URI = config.WEPAPP_URI;

  let jwtToken;
  if (req.url.indexOf('admin') >= 0) {
    jwtToken = req.cookies['admin/auth/token'];
    if (jwtToken) {
      req.headers['authorization'] = jwtToken;
    }
  } else {
    jwtToken = req.cookies['auth/token'];
    if (jwtToken) {
      req.headers['authorization'] = jwtToken;
    }
  }

  next();
});


app.use('/api/admin', adminController);
app.use('/api/user', userController);
app.use('/api/category', passport.authenticate("jwt", { session: false }), categoryController);
app.use('/api/channel', passport.authenticate("jwt", { session: false }), channelController);

app.use('/browse|/search*|/watch*|/change-password', passport.authenticate("jwt", {
  session: false,
  failureRedirect: '/login'
}));

app.use('/admin/|/admin/users|/admin/channels', passport.authenticate("jwt", {
  session: false,
  failureRedirect: '/admin/login'
}));


app.use('/admin/|/admin/users|/admin/channels', (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.redirect('/admin/login');
  }

  return next();
});

app.get('/admin*', (req, res) => {

  global.__currentRequestUserAgent__ = req.useragent;

  match({ routes: adminRoutes({}), location: req.url }, (error, redirectLocation, renderProps) => {

    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {

      // some logic for show dialog

      const client = new ApiClient(req);

      const store = adminCreateStore(client);

      loadOnServer({ ...renderProps, store }).then(() => {

        const createPage = (html, store) => {
          res.send(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>Admin - Eternity Ready</title>
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <link rel="stylesheet" type="text/css" href="${STATIC_ASSETS_CDN}/admin-styles.css">
                <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <link rel="shortcut icon" href="/favicon.ico" />
              </head>
              <body>
                <div id="root">${html}</div>
                <script dangerouslySetInnerHTML={{__html: window.__data=${serialize(store.getState())};}} charSet="UTF-8"> </script>
                <script type="text/javascript" src="${WEBPACK_ASSETS}/admin-app.js"></script>
              </body>
            </html>
          `);
        };

        var appHTML = ReactDOM.renderToString(
          <Provider store={store} key="provider">
            <RouterContext {...renderProps} />
          </Provider>
        );

        const html = createPage(appHTML, store);
        res.send(html)
      });

    } else {
      res.status(404).send('Not found')
    }
  })
});

app.get('*', (req, res) => {

  global.__currentRequestUserAgent__ = req.useragent;

  match({ routes: routes({}), location: req.url }, (error, redirectLocation, renderProps) => {

    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {

      // some logic for show dialog

      const client = new ApiClient(req);
      const store = createStore(client);

      loadOnServer({ ...renderProps, store }).then(() => {

        const createPage = (html, store) => {
          res.send(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>Eternity Ready</title>
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <link rel="stylesheet" type="text/css" href="${STATIC_ASSETS_CDN}/styles.css">
                <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <link rel="shortcut icon" href="favicon.ico" />
              </head>
              <body>
                <div id="root">${html}</div>
                <script dangerouslySetInnerHTML={{__html: window.__data=${serialize(store.getState())};}} charSet="UTF-8"> </script>
                <script type="text/javascript" src="${WEBPACK_ASSETS}/app.js"></script>
              </body>
            </html>
          `);
        };

        var appHTML = ReactDOM.renderToString(
          <Provider store={store} key="provider">
            <RouterContext {...renderProps} />
          </Provider>
        );

        const html = createPage(appHTML, store);
        res.send(html)
      });

    } else {
      res.status(404).send('Not found')
    }
  })
});

export default app;
