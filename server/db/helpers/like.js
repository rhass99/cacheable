module.exports = function makeLikeHelpers (knex) {
  return {
    // Saves like to db, if already exist, delete that like
    saveLike: (newLike, cb) => {
      const post_id = newLike.post_id;
      const user_id = newLike.user_id;
      const existingLike = knex.select().from('like').where('post_id', post_id).andWhere('user_id', user_id);

      existingLike.asCallback((err, result) => {
        if (result.length > 0) {
          existingLike.del().asCallback((err, result2) => {
            cb(null, false)
          })
        } else {
          knex('like').insert({
            post_id: post_id,
            user_id: user_id
          }).asCallback((err, result3) => {
            cb(null, true);
          });
        }
      })
    },

    // Get likes from db for one post or user
    getLikes: (id, property, cb) => {
      knex.select().from('like').where(property, id).asCallback((err, result) => {
        cb(err, result);
      });
    },

    // To get all the posts liked by user
    // getLikedPosts(email, CALLBACK)
    getLikedPosts: (user_id, cb) => {
      const output = [];
      knex.select().from('like').where('user_id', user_id).asCallback((err, result) => {
        result.forEach((like) => {
          knex.select().from('post').where('id', like.post_id).asCallback((err, result) => {
          if (err) cb(err, null);
          output.push(result[0]);
          }).then(() => cb(err, output));
        })
      })
    }
  };
}
