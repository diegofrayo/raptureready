/* @flow */
// import Promise from 'bluebird';
import { MongoClient, ObjectId } from 'mongodb';
// 'mongodb://heroku_22dp56m3:igcadg5cng0t1hj9ofh8btqc7o@ds163397.mlab.com:63397/heroku_22dp56m3'
const MONGODB_URI = 'mongodb://heroku_22dp56m3:igcadg5cng0t1hj9ofh8btqc7o@ds163397.mlab.com:63397/heroku_22dp56m3'; //process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/local';

function addPrentQueryInfo(rows) {
  if (rows) {
    row._parentTypeInfo = this._parentTypeInfo ? this._parentTypeInfo : {};
    row._parentTypeInfo[Object.keys(this._parentTypeInfo).length + ''] = {root: this.root, type: this.type};
  }

  return row;
}
var mongoConnection = false;
MongoClient.connect(MONGODB_URI)
    .catch(err => console.error('Error connection to mongodb, try connection and restarting node server', err.stack))
    .then(db => {
      console.log('connected mongo db');
      mongoConnection = db; // See http://expressjs.com/en/4x/api.html#app.locals
      // TODO: start server listen after mongo connection
    });

let dbConnection = {
  Query: {
    homepageCategories: (root, { sortBy, sortOrder, limit }, { connection }) => {
      return mongoConnection.collection('categories').find({}).toArray();
    },
    channel: (root, { channelId }, { connection }) => {
      return mongoConnection.collection('Channel').findOne({ $or: [ {uniqueId: channelId}, {slug: channelId} ] });
    },
    channelSearch: (root, { query }, { connection }) => {
      if (query) {
        var orQuery = [];
        query.split(' ').map((el) => {
          orQuery.push({"title": new RegExp(el, 'i') });
          orQuery.push({"description": new RegExp(el, 'i') });
          orQuery.push({"slug": new RegExp(el, 'i') });
        })
      }
      return mongoConnection.collection('Channel').find({ $or: orQuery }).toArray();
    }
  },
  Channel: {
    categories: (root, { sortBy, sortOrder, limit }, { connection }) => {
      return mongoConnection.collection('categories').find({}).toArray();
    }
  },

  Category: {
    channels: (root, { sortBy, sortOrder, limit }, { connection }) => {
      return mongoConnection.collection('Channel').find({categoryIds: ObjectId(root._id)}).limit(20).toArray();
    }

  },
};

export default dbConnection;