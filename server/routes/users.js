"use strict";

const express = require('express');
const router  = express.Router();
const mid = require('../middleware/mid')

module.exports = (knex) => {


  // NO Auth routes:
  // GET '/
  // Index page:
  // 1 - Get 10 Random Posts
  // -> each post will have:
  // a) number of likes
  // b) number of comments
  // c) owner name
  // d) url, title, description and image

  // 2 - Get all tags
  // -> display them in a clickable list

  // 3 - Get posts by tag on tag click -> takes
  // us to search result page with list of posts


  // 4 - Get post by Id -> takes
  // us to view post page
  router.get("/u", (req, res) => {
    res.json({hi:"users"});
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
