
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user', function(t){
      t.string('email').primary();
      t.string('first_name');
      t.string('last_name');
      t.string('password');
      t.string('avatar');
      t.string('follows');
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
