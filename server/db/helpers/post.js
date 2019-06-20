export const makePostHelpers = (knex) => {
  return {
    // Saves post to db
    savePost: (newPost, cb) => {
      knex('post').insert({
        user_id: newPost.user_id,
        url: newPost.url,
        title: newPost.title,
        description: newPost.description,
        img: newPost.img
        // we're doing something special with rating, so
        // this shouldn't be here, right?
        // rating: newPost.rating
      }).asCallback((err) => {
        if (err) return console.error(err);
        cb(null, true);
      });
    },

    // Get posts from db, either searching by something or
    // nonspecific with a limit
    getPosts: (value, property, cb) => {
      if (property) {
        knex.select().from('post').where(property, value).asCallback((err, result) => {
          if (err) return console.error(err);
          cb(null, result);
        });
      } else {
        knex.select().from('post').limit(value);
      }
    }
  };
};