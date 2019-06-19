"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("posts")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/p", (req, res) => {
    res.json({hi:"post"});
  });

  return router;
}
