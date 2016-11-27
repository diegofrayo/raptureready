/* @flow */
global.__SERVER__ = true;
require('es6-promise').polyfill();
require('fetch-everywhere');
import React from 'react';
import ReactDOM from 'react-dom/server';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import AppContainer from '../client/AppContainer';
import schema from './schema';
import connection from './dbConnection';
var STATIC_ASSETS_CDN = process.env.STATIC_ASSETS_CDN || '';

const app = express();
app.use(express.static('www'));
app.use('/graphql', graphqlHTTP({
  schema,
  context: { connection },
  graphiql: true
}));

app.get('*', (req, res) => {
  var showToServer = (data) => {
    const markup = ReactDOM.renderToString(<AppContainer initialData={data.data} />);
    const __initial_DATA__ = JSON.stringify(data.data);
    res.send(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" type="text/css" href="${STATIC_ASSETS_CDN}/styles.css">
  </head>
  <body>
    <div id="root">${markup}</div>
    <script id='app-props' type='application/json'><![CDATA[${__initial_DATA__}]]></script>
    <script type="text/javascript" src="${STATIC_ASSETS_CDN}/app.js"></script>
  </body>
</html>
    `);
  };
  // TODO: remove the double render (somehow traverse react components without render or cache route queries on build?)
  // renderToString seems faster than renderToStaticMarkup
  ReactDOM.renderToString(<AppContainer dataCallBack={showToServer} />);

});

export default app;
