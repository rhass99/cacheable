"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("comments")
      .then((results) => {
        res.json(results);
    });
  });
  router.get("/c", (req, res) => {
    res.json({hi:"comments"});
  });

  return router;
}
