"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  // Redirect all 'GET /posts to Homepage
  router.get('/', (req, res) => {
    res.redirect('../')
  })

  // Get post by id
  router.get('/:id', (req, res) => {
    const templateVars = {}
    //---//
    // To Nikki:
    // Render show_user_posts ejs file with template vars
    //----//
    //res.render('')
  })

  // Get create new post form
  router.get('/new', (req, res) => {
    //---//
    // To Nikki:
    // Render new_post ejs file with form for new input
    //----//
    //res.render('')
  })

  // Post new Post (should include tag)
  router.post('/new', (req, res) => {
    const {title, description, url, tag} = req.body
    const {user_id} = req.cookies._owner
    //---//
    // To Nikki:
    // this will redirect the user to show_user_post ejs with the new post
    //----//
    res.redirect('/:id')
  })

  return router;
}
