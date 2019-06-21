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
        cb(err, true);
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
          cb(err, result);
        });
      } else if (property === "tag_id") {
        const output = [];
        knex.select().from('post_tag').where('tag_id', value).asCallback((err, result) => {
          result.forEach((post_tag) => {
            knex.select().from('post').where('id', post_tag.post_id).asCallback((err, result) => {
              if (err) cb(err, null);
              output.push(result[0]);
            }).then(() => cb(err, output));
          })
        })
      } else {
        knex.select().from('post').limit(value).asCallback((err, result) => {
          cb(err, result);
        });
      }
    },

    updateRating: (rating, post_id, cb) => {
      const currentRating = knex.select('rating').from('post').where('post_id', post_id).asCallback((err, result) => {
        if (err) cb(err, null);
        return Number(result[0]);
      });
      knex('post').where('post_id', post_id).update({rating: currentRating + Number(rating)}).asCallback((err) => {
        cb(err, true);
      });
    }
  };
};
