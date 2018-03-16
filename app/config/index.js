'use strict';

if(process.env.NODE_ENV === 'production') {
  // PRODUCTION VARIABLES
  // For redis
  let parsedUrl = require('url').parse(process.env.REDIS_URL);
  let redisPassword = parsedUrl.auth.split(':')[1];

  module.exports = {
    host: process.env.host || "",
    dbURI: process.env.dbURI,
    sessionSecret: process.env.sessionSecret,
    fb: {
      clientID: process.env.fbClientID,
      clientSecret: process.env.fbClientSecret,
      callbackURL: process.env.host + "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos"]
    },
    tw: {
      consumerKey: process.env.twConsumerKey,
      consumerSecret: process.env.twConsumerSecret,
      callbackURL: process.env.host + "/auth/twitter/callback",
      profileFields: ["id", "displayName", "photos"]
    },
    redis: {
      host: parsedUrl.hostname,
      port: parsedUrl.port,
      password: redisPassword
    }
  }
} else {
  module.exports = require('./development.json');
} 