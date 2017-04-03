//process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var _ = require('lodash');

var all = {
  env: process.env.NODE_ENV,

  WEPAPP_URI: 'http://raptureready.tv:3032',

  MONGO_URL: process.env.MONGODB_URI || 'mongodb://localhost/eternity-ready-alex',
  JWT_SECRET_KEY: 'l)oc8e#^vg7d7la$rr3nwlt=^f82y6c9h%yemm=maxy)roiwcc',
};

var config =  _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

console.log("Loaded configuration '%s'...", config.env);

module.exports = config;