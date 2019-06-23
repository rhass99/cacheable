"use strict";

require('dotenv').config();

const ENV         = process.env.ENV || "development";
const PORT        = process.env.PORT || 8080;
const express     = require("express");
var   cookieParser = require('cookie-parser')
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const path        = require('path');
const querystring = require('querystring');

const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

app.use(cookieParser())
// Import middleware
const mid = require('./middleware/mid')();

// Import db helpers
const userHelpers = require('./db/helpers/user')(knex);
const likeHelpers = require('./db/helpers/like')(knex);
const postHelpers = require('./db/helpers/post')(knex);
const commentHelpers = require('./db/helpers/comment')(knex);
const authHelpers = require('./db/helpers/user')(knex);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");
const likesRoutes = require("./routes/likes");
const commentsRoutes = require("./routes/comments");
const authRoutes = require("./routes/auth");
const apipostsRoutes = require("./routes/apiposts");

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
app.use("/users", usersRoutes(userHelpers, postHelpers));
app.use("/posts", postsRoutes(postHelpers));
app.use("/api/comments", commentsRoutes(commentHelpers));
app.use("/api/likes", likesRoutes(likeHelpers));
app.use("/api/posts", apipostsRoutes(postHelpers));
app.use("/auth", authRoutes(authHelpers));

// Home page
app.get("/", mid.softCheck, (req, res) => {
  let templateVars = {}
  postHelpers.getPostsAndTagsAndLikes((err, result, result1) => {
    let tags = result.map(x => x.tag_id)
    templateVars.tags = Array.from([...new Set(tags)])
    templateVars.posts = result
    templateVars.postLikes = result1
    if(res.locals.loggedin && req.cookies["_owner"]["first_name"]) {
      templateVars.user = res.locals.loggedin
      templateVars.userName = req.cookies["_owner"]["first_name"]
      // I need this to redirect the user to myresources
      templateVars.userEmail = req.cookies["_owner"]["email"]
    }
    res.render("index", templateVars);
  })
  //-----//
  // To Nikki:
  // Check res.locals.loggedin
  // if (false) -> user not logged in
  // if (true) -> user logged in
  // templateVars will look like this:
  /*
  {
    tags: [ 'gambling', 'art' ],
    posts: [
      {
        user_id: '2b406a620d046edaac9af9c79f1caa9d',
        url: 'https://google.com',
        title: 'bla',
        description: 'bla bla bla',
        img: null,
        rating: null,
        post_id: 'dc79b63e84ba4944d4388e20937a278e',
        tag_id: 'gambling'
      }
    ],
     postLikes: [
      { post_id: '348fcfa3c6fae25532a953136643d37d', count: '1' }
      { post_id: 'be25a4f49e6ac0a187e8c17854cc6b60', count: '1' },
    ]
  }
  */
  //-----//
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

