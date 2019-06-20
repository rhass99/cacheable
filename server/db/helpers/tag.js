export const makeTagHelpers = (knex) => {
  return {
    // Saves tag to db
    saveTag: (newTag, cb) => {
      knex('tag').insert({
        name: newTag
      }).asCallback((err) => {
        if (err) return console.error(err);
        cb(null, true);
      });
    },

    // Get posts from db, either searching by something or
    // nonspecific with a limit
    getTags: (value, property, cb) => {
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