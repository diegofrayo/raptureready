/* @flow */
global.__SERVER__ = true;
import 'fetch-everywhere';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { join } from 'path';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import AppContainer from '../client/AppContainer';
import schema from './schema';
import connection from './dbConnection';

const app = express();

const publicPath = join(__dirname, '..', '..', '.tmp');
app.use('/public', express.static(publicPath));

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
  </head>
  <body>
    <div id="root">${markup}</div>
    <script id='app-props' type='application/json'><![CDATA[${__initial_DATA__}]]></script>
    <script type="text/javascript" src="/public/bundle.js"></script>
  </body>
</html>
    `);
  };
  // TODO: remove the double render (somehow traverse react components without render or cache route quries on build?)
  // renderToString seems faster than renderToStaticMarkup
  ReactDOM.renderToString(<AppContainer dataCallBack={showToServer} />);

});

export default app;
