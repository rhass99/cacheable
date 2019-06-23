module.exports = function makeTagHelpers (knex) {
  return {
    // Saves tag to db
    saveTag: (newTags, cb) => {
      newTags.forEach((newTag) => {
        knex('post_tag').insert({
          post_id: newTag.post_id,
          tag_id: newTag.tag_id
        }).then(() => {
          knex('tag').insert({
            id: newTag.tag_id
          }).asCallback((err) => {
            cb(err, true);
          })
        })
      })
    },

    // Get tags from db (all or by post)
    // To get all tags
    // getTags(null, CALLBACK)
    // To get all tags by post
    // getTags(post_id, CALLBACK)
    getTags: (post_id, cb) => {
      if (!post_id) {
        knex.select().from('tag').asCallback((err, result) => {
          cb(err, result);
        });
      } else {
        const output = [];
        knex.select().from('post_tag').where('post_id', post_id).asCallback((err, result) => {
          result.forEach((post_tag) => {
            knex.select().from('tag').where('id', post_tag.tag_id).asCallback((err, result) => {
              if (err) cb(err, null);
              output.push(result[0]);
            }).then(() => cb(err, output));
          })
        })
      }
    }
  };
};
