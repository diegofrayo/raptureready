//process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var _ = require('lodash');

// hack for windows
const env = process.env.NODE_ENV;
const mongodb_uri = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : '';

var all = {
	env,
	JWT_SECRET_KEY: 'l)oc8e#^vg7d7la$rr3nwlt=^f82y6c9h%yemm=maxy)roiwcc',
	MAIL_PROVIDER: 'mailgun',
	MONGO_URL: mongodb_uri || 'mongodb://localhost/eternity-ready-alex',
	WEPAPP_URI: 'http://raptureready.tv'
};

var config = _.merge(all,
	require('./' + env + '.js') || {});

console.log("Loaded configuration '%s'...", config.env);

module.exports = config;