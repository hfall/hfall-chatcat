"use strict";

const config = require('../config');
const logger = require('../logger');
const Mongoose = require('mongoose').connect(config.dbURI);

// Log an error if the connection fails

Mongoose.connection.on('error', error => {
  logger.log("error", "Mongoosed connection error: " + error);
});

//  Create a Schema that defines the structure for storing user data

const chatUser = new Mongoose.Schema({
  profileId: String,
  fullName: String,
  profilePic: String
});

//  Turn schema into model
let userModel = Mongoose.model('chatUser', chatUser);

module.exports = {
  Mongoose,
  userModel
}