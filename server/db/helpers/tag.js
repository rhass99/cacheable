module.exports = function makeTagHelpers (knex) {
  return {
    // Saves tag to db
    saveTag: (newTag, cb) => {
      knex('tag').insert({
        id: newTag
      }).asCallback((err) => {
        if (err) return console.error(err);
        cb(null, true);
      });
    },

    // Get tags from db (all or by post)
    // To get all tags
    // getTags(null, CALLBACK)
    // To get all tags by post
    // getTags(post_id, CALLBACK)
    getTags: (post_id, cb) => {
      if (!post_id) {
        knex.select().from('tag').asCallback((err, result) => {
          if (err) return console.error(err);
          cb(null, result);
        });
      } else {
        const output = [];
        knex.select().from('post_tag').where('post_id', post_id).asCallback((err, result) => {
          if (err) return console.error(err);
          result.forEach((post_tag) => {
            knex.select().from('tag').where('id', post_tag.tag_id).asCallback((err, result) => {
              if (err) return console.error(err);
              output.push(result[0]);
            }).then(() => cb(null, output));
          })
        })
      }
    }
  };
};
