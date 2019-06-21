"use strict";

const express = require('express');
const router  = express.Router();

const mid = require('../middleware/mid')();

module.exports = (knex) => {

  // will apply middleware to check if cookie exists
  router.get("/login", (req, res) => {
    // render Login page
    //----//
    // To Nikki: render the error if there is one,
    // example if the user tries to log in with wrong password
    // or user tried to login with wrong email
    // res.locals.errors will have the error as a string
    //----//
    res.locals.errors = req.query.error
    console.log("err", res.locals.errors)
    res.render("login")
  });

  // Get Register page
  router.get("/register", (req, res) => {
    // render Register page
    res.render("register");
  });

  // Logout
  router.get("/logout", (req, res) => {
    res.clearCookie("_owner")
    res.redirect("../");
  });

  // Login
  router.post("/login", (req, res) => {
    const {email, password} = req.body
    // Call database to get user
    knex.getUser(email, (err, result) => {
      if(result.length > 0 && result[0].password === password) {
        res.cookie('_owner', {
          email,
          first_name: result[0].first_name
        })
        res.redirect('../')
      } else {
        res.redirect('/auth/login')
      }
    })
    // if user exists redirect to homepage with cookie and data from database
    // -> get all posts and all tags and put them on res.locals.data
    // if user doesnt exist redirect to GET /login to try again with error

    // redirect to login or to home
    // get user_id, user_email, user_first_name on cookie (if u need them for rendering)
    // render homepage
  });

  router.post("/register", (req, res) => {
    //-----//
    // To Nikki: Please have the names of fields in your Register form as below
    // email, password, firstName, lastName
    //-----//
    const {email, password, first_name, last_name} = req.body
    knex.saveUser({
      email,
      first_name,
      last_name,
      password
    }, (err, result) => {
      if (result === true) {
        res.cookie('_owner', {
          email,
          first_name,
        })
        res.redirect("../")
      } else {
        res.clearCookie("_owner")
        res.redirect("/auth/login");
      }
    });
    // Call database to add user
    // -> get all posts and all tags and user Name and put them on res.locals.data

    // redirect to home
    // put user_id, user_email, user_first_name on cookie
    //res.cookie('_owner', {  })
    // render homepage
    //res.redirect('../')
  });

  return router;
}

