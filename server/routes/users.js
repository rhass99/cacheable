"use strict";

const express = require('express');
const router  = express.Router();
const mid = require('../middleware/mid')();

module.exports = (knex) => {
  // get user resources route
  router.get('/:id/resources', (req, res) => {
    const userID = req.params.id;
    // Query database for all tags and posts by user ID
    const templateVars = {} // fill that from database
    // Render show_user_Resources ejs file with template vars
    // res.render('')
  });

  router.get('/:id', (req, res) => {
    const userID = req.params.id;
    // Query database for user profile by id
    const templateVars = {} // fill that from database
    // Render show_user_profile ejs file with template vars
    // res.render('')
  })

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
