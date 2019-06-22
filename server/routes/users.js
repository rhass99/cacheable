"use strict";

const express = require('express');
const router  = express.Router();
const mid = require('../middleware/mid')();
const utils = require('./utils');

module.exports = (userdb, postdb) => {
  // get user resources route
  router.get('/:id/resources', mid.authenticate, (req, res) => {
    const userID = req.cookies._owner.email;
    // Query database for all tags and posts by user ID
    let templateVars = {} // fill that from database
    // postdb.getPosts(userID, 'user_id', (err, result) => {
    postdb.getUserResources(userID, (err, result1, result2, result3) => {
      let tags = result1.map(x => x.tag_id)
      templateVars.userID = userID
      templateVars.tags = Array.from([...new Set(tags)])
      templateVars.myPosts = result1
      templateVars.likedPosts = result2
      templateVars.postLikes = result3
      console.log(templateVars)
      //@ Rami: I have to pass this to display it in the header as the logged in user
      templateVars.user = true
      templateVars.resources = true
      templateVars.userName = req.cookies["_owner"]["first_name"]
      res.render('user_resources', templateVars)
    })
    //---//
    // To Nikki:
    // Render show_user_Resources ejs file with template vars
    // templateVars will look like this:
    /*
    {
      userID: 'userid
      tags: [ 'gambling', 'art' ],
      myPosts: [
        {
          id: 1,
          user_id: '2b406a620d046edaac9af9c79f1caa9d',
          url: 'https://google.com',
          title: 'bla',
          description: 'bla bla bla',
          img: null,
          rating: null,
          post_id: 'dc79b63e84ba4944d4388e20937a278e',
          tag_id: 'gambling'
        }
      ],
      likedPosts: [
        {
          post_id: '3f4a6ca08691278d77d56e27f06211e9',
          url: 'https://google.com',
          title: 'bla',
          description: 'blblblblbl',
          rating: null,
          img: null
        }
      ],
      postLikes: [
        { post_id: '348fcfa3c6fae25532a953136643d37d', count: '1' }
        { post_id: 'be25a4f49e6ac0a187e8c17854cc6b60', count: '1' },
      ]
    }
    */
    //----//
  });

  router.get('/:id', mid.authenticate, (req, res) => {
    const userID = req.cookies._owner.email;
    console.log("userid", userID)
    // Query database for user profile by id
    let templateVars = {} // fill that from database
    userdb.getUser(userID, (err, result) => {
      templateVars.userID = userID;
      templateVars.firstName = result[0].first_name;
      templateVars.lastName = result[0].last_name;
      console.log(templateVars);
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
    // Edit user profile in the database and return user back
    const templateVars = {} // fill that from database
    userdb.updateUser(userID, firstName, lastName, password, (err, result) => {
      if (result === 0) {
        res.render('user_profile', {error: "Unable to update profile"})
      } else {
        templateVars.userID = userID;
        templateVars.firstName = firstName;
        templateVars.lastName = lastName;
        res.render('user_profile', {templateVars})
      }
    })
    //---//
    // To Nikki:
    // Render show_user_profile ejs file with template vars
    /* Template vars will look like this if there is no error
    {
      userID: "userid",
      firstName: "name",
      lastName: "name",
      error: ""
    }
    if there is error then only you will get this {error: "Unable to update profile"}
    */
    //----//
  });

  return router;
}
