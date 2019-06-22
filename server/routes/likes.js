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
      res.json({result})
    })
    //---//
    // To Nikki:
    // Update the Heart button to red if you get back {result: true} //
    // Update the Heart button to black if you get back {result: false} //
    //----//
  })

  return router;
}
