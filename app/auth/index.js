'use strict';

const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const h = require('../helpers');


module.exports = () => {

  passport.serializeUser((user, done)=> {
    done(null, user.id); // id is the id that mongodb creates
  });

  passport.deserializeUser((id, done) => {
    //  Find the user data based on the id
    h.findById(id)
      .then(user => done(null, user))
      .catch(error => console.log("Error when deserializing the user"));

  })

  let authProcessor = (accessToken, refreshToken, profile, done)=> {
    // Verify callback to check if the user (profile.id) exists in the database. If not we create the user
    // If user is found then we use the done function to return data from database
    h.findOne(profile.id)
      .then(result => {
        if(result) {
          done(null, result);
        } else {
          // create a new user and return
          h.createNewUser(profile)
            .then(newChatUser => done(null, newChatUser))
            .catch(error => console.log(error))
        }
      })
  }

  passport.use(new FacebookStrategy(config.fb, authProcessor));
  passport.use(new TwitterStrategy(config.tw, authProcessor));
}