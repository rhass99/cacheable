export const makeLikeHelpers = (knex) => {
  return {
    // Saves like to db, if already exist, delete that like
    saveLike: (newLike, cb) => {
      const post_id = newLike.post_id;
      const user_id = newLIke.user_id;
      const existingLike = knex.select().from('like').where('post_id', post_id).andWhere('user_id', user_id);

      if (existingLike.asCallback((err, result) => {
        if (err) return console.error(err);
        return result;
      })) {
        existingLike.del().asCallback((err, result) => {
          if (err) return console.error(err);
          cb(null, true);
        })
      } else {
        knex('like').insert({
          post_id: post_id,
          user_id: user_id
        }).asCallback((err) => {
          if (err) return console.error(err);
          cb(null, true);
        });
      }
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