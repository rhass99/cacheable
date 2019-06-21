module.exports = function makePostHelpers (knex) {
  return {
    // Saves post to db
    savePost: (newPost, cb) => {
      knex('post').insert({
        id: newPost.post_id,
        user_id: newPost.user_id,
        url: newPost.url,
        title: newPost.title,
        description: newPost.description,
        img: newPost.img,
        rating: null
      }).asCallback((err) => {
        if (err) return console.error(err);
        cb(null, true);
      });
    },

    // Get posts from db, either searching by something or
    // nonspecific with a limit
    // To get all posts for home page:
    // getPosts(10, null, CALLBACK)
    // To get all posts for specific user
    // getPosts(email, 'user_id', CALLBACK)
    getPosts: (value, property, cb) => {
      if (property) {
        knex.select().from('post').where(property, value).asCallback((err, result) => {
          if (err) return console.error(err);
          cb(null, result);
        });
      } else {
        knex.select().from('post').limit(value);
      }
    },

    updateRating: (rating, post_id, cb) => {
      const currentRating = knex.select('rating').from('post').where('post_id', post_id).asCallback((err, result) => {
        if (err) return console.error(err);
        return Number(result[0]);
      });
      knex('post').where('post_id', post_id).update({rating: currentRating + Number(rating)}).asCallback((err) => {
        if (err) return console.error(err);
        cb(null, true);
      });
    }
  };
};
