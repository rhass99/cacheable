export const makeLikeHelpers = (knex) => {
  return {
    // Saves like to db
    saveLike: (newLike, cb) => {
      knex('like').insert({
        post_id: newLike.post_id,
        user_id: newLike.user_id
      }).asCallback((err) => {
        if (err) return console.error(err);
        cb(null, true);
      });
    },

    // Get likes from db for one post or user
    getLikes: (id, property, cb) => {
      knex.select().from('like').where(property, id).asCallback((err, result) => {
        if (err) return console.error(err);
        cb(null, result);
      });
    }
  };
};