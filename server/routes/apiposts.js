"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (postdb) => {
  // This route takes an Ajax request
  // @ 'POST /api/posts/
  router.post('/', (req, res) => {
    let templateVars = {};
    const { tag_id } = req.body;
    postdb.getPosts(tag_id, 'tag_id', (err, result) => {
      res.json(result)
    })
    /**
    [
      {
          "id": 1,
          "user_id": "2b406a620d046edaac9af9c79f1caa9d",
          "url": "https://google.com",
          "title": "bla",
          "description": "bla bla bla",
          "img": null,
          "rating": null,
          "post_id": "dc79b63e84ba4944d4388e20937a278e",
          "tag_id": "gambling"
      },
      {
          "id": 3,
          "user_id": "2b406a620d046edaac9af9c79f1caa9d",
          "url": "hotmail",
          "title": "bla",
          "description": "gooooooooooooooo raptors",
          "img": null,
          "rating": null,
          "post_id": "94f359911e3c2ff537d0651070395f45",
          "tag_id": "gambling"
      }
    ]
     */
  })

  // This route takes an Ajax request
  // @ 'POST /api/posts/search/?search=QUERY
  router.post('/search', (req, res) => {
    const searchTerm = req.query.search
    postdb.searchPostsAndTags(searchTerm, (result) => {
      res.json(result)
    })
    /*
    [
      {
          "id": 1,
          "user_id": "2b406a620d046edaac9af9c79f1caa9d",
          "url": "https://google.com",
          "title": "bla",
          "description": "bla bla bla",
          "img": null,
          "rating": null,
          "post_id": "dc79b63e84ba4944d4388e20937a278e",
          "tag_id": "gambling"
      },
      {
          "id": 2,
          "user_id": "2b406a620d046edaac9af9c79f1caa9d",
          "url": "https://google.com",
          "title": "bla",
          "description": "blblblblbl",
          "img": null,
          "rating": null,
          "post_id": "3f4a6ca08691278d77d56e27f06211e9",
          "tag_id": "art"
      }
    ]
    */
  })

  return router;
}
