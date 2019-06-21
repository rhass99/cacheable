"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  // This route takes an Ajax request
  // @ 'POST /api/likes/
  router.post('/', (req, res) => {
    const {postID} = req.body
    // edits the likes table in the database
    // returns true if successful or false if failed
    //---//
    // To Nikki:
    // Update the Heart button if you get back true //
    //----//
  })

  return router;
}
