"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  // This route takes an Ajax request
  // @ 'GET /api/comments/
  router.get('/', (req, res) => {
    const { postID } = req.body
    knex.getComments(postID, (err, result) => {
      if (err === null) {
        res.json(result)
      } else {
        res.json({error: "Cannot get comments"})
      }
      //---//
      // To Nikki:
      /*
      The json object that will be sent back will be as follows:
      [
        {
          "id": 5,
          "post_id": "348fcfa3c6fae25532a953136643d37d",
          "user_id": "2b406a620d046edaac9af9c79f1caa9d",
          "text": "this is a comment"
        }
      ]
      */
      //----//
    })
  })

  // This route takes an Ajax request
  // @ 'POST /api/comments/
  router.post('/', (req, res) => {
    const userID = req.cookies._owner.email
    const { postID, commentText } = req.body
    // edits the Comments table in the database
    // returns the new Comment that you can append to comment list
    knex.saveComment({
      post_id: postID,
      user_id: userID,
      text: commentText
    }, (err, result) => {
      if (err === null) {
        knex.getComments(postID, (err, result) => {
          if (err === null) {
            res.json(result)
          } else {
            res.json({error: "Cannot get comments"})
          }
        })
      } else {
        res.json({error: "Cannot add comment"})
      }
    })
    //---//
    // To Nikki:
    /*
    The json object that will be sent back will be as follows:
    [
      {
        "id": 5,
        "post_id": "348fcfa3c6fae25532a953136643d37d",
        "user_id": "2b406a620d046edaac9af9c79f1caa9d",
        "text": "this is a comment"
      }
    ]
     */
    //----//
  })

  return router;
}
