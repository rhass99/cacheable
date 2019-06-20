module.exports = () => {

  middleware = {
    authenticate: function(req, res, next) {
      if (!req.cookies._owner) {
        res.redirect('/auth/login?error=' + encodeURIComponent("Please login or register"))
      } else {
        next()
      }
    },


    softCheck: function(req, res, next) {
      if (!req.cookies._owner) {
        res.locals.loggedin = false;
      } else {
        res.locals.loggedin = true;
      }
      next();
    }
  };

  return middleware;
}
