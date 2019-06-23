"use strict";

const express = require('express');
const router  = express.Router();
const utils = require('./utils');

module.exports = (postdb) => {
  // Redirect all 'GET /posts to Homepage
  router.get('/', (req, res) => {
    res.redirect('../')
  })

  // Get create new post form
  router.get('/new', (req, res) => {
    //---//
    // To Nikki:
    // Render new_post ejs file with form for new input
    //----//
    res.render('post_new')
  })

  // Post new Post (should include tag)
  router.post('/', (req, res) => {
    console.log(req.body)
    const {title, description, url, tag} = req.body
    const {email} = req.cookies._owner
    const post_id = utils.generateMD5Hash(title+description+url)
    postdb.savePost({
      post_id,
      user_id: email,
      url,
      title,
      description,
      tag
    }, (err, result) => {
      console.log(result)
    })
    //---//
    // To Nikki:
    // this will redirect the user to show_user_post ejs with the new post
    //----//
    res.redirect('../')
  })

  // Get post by id
  router.get('/:id', (req, res) => {
    let templateVars = {}
    postdb.getPosts(req.params.id,'id', (err, result) => {
      templateVars = result[0]
      console.log(templateVars)
      res.render('post_show', templateVars)
    })
    //---//
    // To Nikki:
    // Render show_user_posts ejs file with template vars
    // templateVars will look like this:
    /*
    {
      id: 'be25a4f49e6ac0a187e8c17854cc6b60',
      user_id: 'd4035fca89d0886862d08051388991c0',
      url: 'ramibasha',
      title: 'ramirami',
      description: 'hello',
      img: null,
      rating: null
    }
    */
    //----//
  })

  return router;
}
