
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('tag', function(t){
      t.increments('id').primary();
      t.string('name');
    }),
    knex.schema.createTable('post', function(t){
      t.increments('id').primary();
      t.string('user_id').notNullable();
      t.string('url');
      t.string('title');
      t.string('description');
      t.string('img');
      t.string('rating');

      t.foreign('user_id').references('email').inTable('user');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('post'),
    knex.schema.dropTable('tag')
  ]);
};
