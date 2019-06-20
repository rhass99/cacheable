"use strict";

const express = require('express');
const router  = express.Router();

const mid = require('../middleware/mid')();

module.exports = (knex) => {

  router.get("/login", (req, res) => {
    // render Login page
    // render the error if there is one
    // example if the user tries to log in with wrong password
    // or user tried to login with wrong email
    // res.locals.errors will have the error
    res.locals.errors = req.query.error
    res.render("login")
  });

  router.get("/register", (req, res) => {
    // render Register page
    res.render("register");
  });

  router.get("/logout", (req, res) => {
    res.clearCookie("_owner")
    res.redirect("/");
  });

  router.post("/login", (req, res) => {
    const {email, password} = req.body
    // Call database to get user
    // if user exists redirect to homepage with cookie and data from database
    // -> get all posts and all tags and put them on res.locals.data
    // if user doesnt exist redirect to GET /login to try again with error

    // redirect to login or to home
    // put user_id, user_email, user_first_name on cookie
    res.cookie('_owner', {  })
    // render homepage
    res.redirect('/')
  });

  router.post("/register", (req, res) => {
    const {email, password, firsName, lastName} = req.body
    // Call database to add user
    // -> get all posts and all tags and user Name and put them on res.locals.data

    // redirect to home
    // put user_id, user_email, user_first_name on cookie
    res.cookie('_owner', {  })
    // render homepage
    res.redirect('/')
  });

  return router;
}
