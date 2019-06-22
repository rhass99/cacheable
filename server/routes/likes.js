"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  // This route takes an Ajax request
  // @ 'POST /api/likes/
  router.post('/', (req, res) => {
    const userID = req.cookies._owner.email
    console.log(userID)
    const { postID } = req.body
    // edits the likes table in the database
    // returns true if successful or false if failed
    knex.saveLike({
      post_id: postID,
      user_id: userID
    }, (err, result) => {
      console.log(err)
    })
    //---//
    // To Nikki:
    // Update the Heart button if you get back true //
    //----//
  })

  return router;
}
