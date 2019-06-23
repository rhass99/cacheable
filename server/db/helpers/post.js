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
      if (property && property !== 'tag_id') {
        knex.select().from('post').where(property, value).asCallback((err, result) => {
          cb(err, result);
        });
      } else if (property === 'tag_id') {
        knex.select().from('post').innerJoin('post_tag', 'post.id', 'post_id').where('post_tag.tag_id', value).asCallback((err, result) => {
          if (err) cb(err, null);
          cb(err, result);
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
    },

    getUserResources: (user_id, cb) => {
      knex.from('post').where('user_id', user_id).leftJoin('post_tag', 'post.id', 'post_id').asCallback((err, result1) => {
        knex.select('post_id', 'url', 'title', 'description', 'rating', 'img').from('like').join('post', 'like.post_id', '=', 'post.id').where('like.user_id', user_id).asCallback((err, result2) => {
          knex.select('post_id').count('*').from('like').join('post', 'like.post_id', '=', 'post.id').groupBy('like.post_id').asCallback((err, result3) => {
            cb(err, result1, result2, result3);
          });
        });
      })
    },

    getPostsAndTagsAndLikes: (cb) => {
      knex.from('post').leftJoin('post_tag', 'post.id', 'post_id').asCallback((err, result) => {
        knex.select('post_id').count('*').from('like').join('post', 'like.post_id', '=', 'post.id').groupBy('like.post_id').asCallback((err, result1) => {
          cb(err, result, result1);
        });
      })
    },

    searchPostsAndTags: (searchTerm, cb) => {
      knex.from('post').leftJoin('post_tag', 'post.id', 'post_id').where('tag_id', 'like', `%${searchTerm}%`).orWhere('description', 'like', `%${searchTerm}%`).orWhere('url', 'like', `%${searchTerm}%`).asCallback((err, result) => {
        cb(result)
      })
    }
  }
};

