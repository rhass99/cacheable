export const makeUserHelpers = (knex) => {
  return {
    // Saves user to db
    saveUser: (newUser, cb) => {
      knex('user').insert({
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        password: newUser.password
      }).asCallback((err) => {
        if (err) return console.error(err);
        cb(null, true);
      });
    },

    // Get a user from db with email (serving as id)
    getUser: (id, cb) => {
      knex.select().from('user').where('email', id).asCallback((err) => {
        if (err) return console.error(err, result);
        cb(null, result);
      });
    }
  };
}