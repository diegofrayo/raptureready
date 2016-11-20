import Schema from 'graph.ql';
import dbConnection from './dbConnection.js';
var schema = Schema(`
  type Channel {
    uniqueId: String
    channelNumber: Int
    title: String
    slug: String
    description: String
    thumb: String
    title: String
    categories: [Category]
    rating: Int
    picture: String
    type: String
    embedCode: String
  }

  type Category {
    name: String
    channels: [Channel]
  }

  type Query {
    homepageCategories(sortBy: String, sortOrder: Boolean, limit: Int): [Category]
  }
`, dbConnection);

export default schema.schema;