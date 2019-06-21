"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  // This route takes an Ajax request
  // @ 'POST /api/comments/
  router.post('/', (req, res) => {
    const {postID} = req.body
    // edits the Comments table in the database
    // returns the new Comment that you can append to comment list
    //---//
    // To Nikki:
    // Update the comment list below the Post with the returned comment //
    //----//
  })

  return router;
}
