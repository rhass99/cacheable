"use strict";

const express = require('express');
const router  = express.Router();
const utils = require('./utils');
const request = require('request');

const LINK_API = process.env.API_KEY

module.exports = (postdb, tagdb) => {
  // Redirect all 'GET /posts to Homepage
  router.get('/', (req, res) => {
    res.redirect('../')
  })

  // Get create new post form
  router.get('/new', (req, res) => {
    if(Object.keys(req.cookies).length === 0) {
      return res.redirect('/auth/login')
    }
    let cookieEmail = req.cookies._owner.email;
    let cookieName = req.cookies._owner.first_name;
    res.render('post_new', {user: cookieEmail, firstName: cookieName})
  })

  // Post new Post (should include tag)
  router.post('/', (req, res) => {
    let tagmap = ''
    let {title, description, url, tag} = req.body
    const {email} = req.cookies._owner
    const post_id = utils.generateMD5Hash(title+description+url)

    if (tag.trim().length !== 0) {
      tag = tag.trim().split(",")
      tagmap = tag.map(tag => ({post_id: post_id, tag_id: tag}))
    } else {
      tag = ''
    }

    postdb.savePost({
      post_id,
      user_id: email,
      url,
      title,
      description
    }, (err, result) => {
      if (!err && Array.isArray(tag)) {
        console.log("been here", tag)
        tagdb.saveTag(tagmap, (err, result) => {
          console.log(err)
          console.log(result)
        })
      }
      console.log("postresult", err)
    })
    //---//
    // To Nikki:
    // this will redirect the user to show_user_post ejs with the new post
    //----//
    res.redirect('../')
  })

  // Get post by id
  router.get('/:id', (req, res) => {
    if(Object.keys(req.cookies).length === 0) {
      return res.redirect('/')
    }
    let templateVars = {}
    postdb.getPosts(req.params.id,'id', (err, result) => {
      templateVars.firstName = req.cookies._owner.first_name
      templateVars.user = result[0].user_id
      templateVars.url = result[0].url
      templateVars.title = result[0].title
      templateVars.description = result[0].description 
      templateVars.img = result[0].img
      templateVars.rating = result[0].rating
      console.log(result[0])
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
