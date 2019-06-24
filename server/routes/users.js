"use strict";

const express = require('express');
const router  = express.Router();
const mid = require('../middleware/mid')();
const utils = require('./utils');

module.exports = (userdb, postdb) => {
  // Renders users resources
  router.get('/:id/resources', mid.authenticate, (req, res) => {
    const userID = req.cookies._owner.email;
    // Query database for all tags and posts by user ID
    let templateVars = {} // fill that from database
    // postdb.getPosts(userID, 'user_id', (err, result) => {
    postdb.getUserResources(userID, (err, result1, result2, result3) => {
      let tags = result1.map(x => x.tag_id)
      templateVars.userEmail = userID
      templateVars.tags = Array.from([...new Set(tags)])
      templateVars.myPosts = result1
      templateVars.likedPosts = result2
      templateVars.postLikes = result3
      templateVars.user = true
      templateVars.resources = true
      templateVars.firstName = req.cookies["_owner"]["first_name"]
      postdb.getPosts(userID, 'user_id', (err, result) => {
        templateVars.myPosts = result;
        res.render('user_resources', templateVars)
      })
     
    })
  });

  //Renders the user profile settings
  router.get('/:id', mid.authenticate, (req, res) => {
    const userID = req.cookies._owner.email;
    // Query database for user profile by id
    let templateVars = {} // fill that from database
    userdb.getUser(userID, (err, result) => {
      templateVars.user = userID;
      templateVars.userEmail = userID;
      templateVars.firstName = result[0].first_name;
      templateVars.lastName = result[0].last_name;
      templateVars.password = result[0].password;
      templateVars.profile = true;
      res.render('user_profile', templateVars)
    })
    //---//
    // To Nikki:
    // Render show_user_profile ejs file with template vars
    /* Template vars will look like this
    {
      userID: "userid",
      firstName: "name",
      lastName: "name"
    }
    */
    //----//
  });

  router.post('/:id', mid.authenticate, (req, res) => {
    const userID = req.cookies._owner.email;
    const {firstName, lastName, password} = req.body
    console.log(userID);
    // Edit user profile in the database and return user back
    const templateVars = {} // fill that from database
    userdb.updateUser(userID, firstName, lastName, password, (err, result) => {
      if (result === 0) {
        return res.render('user_profile', {error: "Unable to update profile"})
      } else {
        templateVars.user = userID;
        templateVars.userEmail = userID;
        templateVars.firstName = firstName;
        templateVars.lastName = lastName;
        res.render('user_profile', {templateVars})
      }
    })
  });

  return router;
}
