module.exports = function makeCommentHelpers (knex) {
  return {
    // Saves comment to db
    saveComment: (newComment, cb) => {
      knex('comment').insert({
        post_id: newComment.post_id,
        user_id: newComment.user_id,
        text: newComment.text
      }).asCallback((err, result) => {
        cb(err, result);
      });
    },

    // Get comments from db for one post
    getComments: (id, cb) => {
      knex.select().from('comment').where('post_id', id).asCallback((err, result) => {
        cb(err, result);
      });
    }
  };
};
