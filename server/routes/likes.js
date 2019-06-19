"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("likes")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/l", (req, res) => {
    res.json({hi:"likes"});
  });

  return router;
}
