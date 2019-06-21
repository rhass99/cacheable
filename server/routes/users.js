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
    const templateVars = {} // fill that from database
    postdb.getPosts(userID, 'user_id', (err, result) => {
      console.log("dbresult", result)
    })
    //---//
    // To Nikki:
    // Render show_user_Resources ejs file with template vars
    //----//
    res.render('user_resources', templateVars)
  });

  router.get('/:id', mid.authenticate, (req, res) => {
    const userID = req.params.id;
    // Query database for user profile by id
    const templateVars = {} // fill that from database
    //---//
    // To Nikki:
    // Render show_user_profile ejs file with template vars
    //----//
    // res.render('')
  });

  router.post('/:id', mid.authenticate, (req, res) => {
    const userID = req.params.id;
    // Edit user profile in the database and return user back
    const templateVars = {} // fill that from database
    //---//
    // To Nikki:
    // Render show_user_profile ejs file with template vars
    //----//
    // res.render('')
  });

  return router;
}



  // router.get("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("users")
  //     .then((results) => {
  //       res.json(results);
  //   });
  // });
