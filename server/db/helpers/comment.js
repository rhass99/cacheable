export const makeCommentHelpers = (knex) => {
  return {
    // Saves comment to db
    saveComment: (newComment, cb) => {
      knex('comment').insert({
        post_id: newComment.post_id,
        user_id: newComment.user_id,
        text: newComment.text
      }).asCallback((err) => {
        if (err) return console.error(err);
        cb(null, true);
      });
    },

    // Get comments from db for one post
    getComments: (id, cb) => {
      knex.select().from('comment').where('post_id', id).asCallback((err, result) => {
        if (err) return console.error(err);
        cb(null, result);
      });
    }
  };
};