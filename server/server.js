"use strict";

require('dotenv').config();

const ENV         = process.env.ENV || "development";
const PORT        = process.env.PORT || 8080;
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const path        = require('path');

const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Import middleware
const mid = require('./middleware/mid')();

// Import db helpers
const userHelpers = require('./db/helpers/user')(knex);
const likeHelpers = require('./db/helpers/like')(knex);
const postHelpers = require('./db/helpers/post')(knex);
const commentHelpers = require('./db/helpers/comment')(knex);
const authHelpers = require('./db/helpers/auth')(knex);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const likesRoutes = require("./routes/likes");
const commentsRoutes = require("./routes/comments");
const authRoutes = require("./routes/auth");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/../public/styles/scss",
  dest: __dirname + "/../public/styles/css",
  debug: true,
  outputStyle: 'expanded',
  force: true
}), express.static(path.join(__dirname, 'public')));

// Mount all resource routes
app.use("/users", usersRoutes(userHelpers));
app.use("/posts", postsRoutes(postHelpers));
app.use("/api/comments", commentsRoutes(commentHelpers));
app.use("/api/likes", likesRoutes(likeHelpers));
app.use("/auth", authRoutes(authHelpers)); // ok

// Home page
app.get("/", mid.softCheck, (req, res) => {
  // Get all posts and all tags and send them to Homepage on res.locals.data
  // Check res.locals.loggedin
  // if (false) -> user not logged in
  // if (true) -> user logged in, get user Name email and id from cookie
  let templateVars = res.locals.data;
  res.render("index", templateVars);
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

