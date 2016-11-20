/* @flow */
import Promise from 'bluebird';
import { MongoClient } from 'mongodb';

function addPrentQueryInfo(rows) {
  if (rows) {
    row._parentTypeInfo = this._parentTypeInfo ? this._parentTypeInfo : {};
    row._parentTypeInfo[Object.keys(this._parentTypeInfo).length + ''] = {root: this.root, type: this.type};
  }

  return row;
}
var mongoConnection = false;
MongoClient.connect('mongodb://localhost/local', { promiseLibrary: Promise })
    .catch(err => console.error(err.stack))
    .then(db => {
      console.log('connected db');
      mongoConnection = db; // See http://expressjs.com/en/4x/api.html#app.locals
      // TODO: start server listen after mongo connection
    });

let dbConnection = {
  Query: {
    homepageCategories: (root, { sortBy, sortOrder, limit }, { connection }) => {
      console.log('homepageCategories', root);
      return mongoConnection.collection('categories').find({}).toArray();
    }
  },
  Channel: {
    categories: (root, { sortBy, sortOrder, limit }, { connection }) => {
      console.log('categories', root);
      return mongoConnection.collection('categories').find({}).toArray();
    }
  },

  Category: {
    channels: (root, { sortBy, sortOrder, limit }, { connection }) => {
      console.log('channels', root);
      return mongoConnection.collection('Channel').find({}).limit(20).toArray();
    }

  },
};

export default dbConnection;