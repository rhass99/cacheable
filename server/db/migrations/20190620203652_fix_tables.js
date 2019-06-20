
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.hasTable('users').then((exists) => {
      if (exists) {
        knex.schema.dropTable('users')
      };
    }),
    knex.schema.dropTable('collection_post'),
    knex.schema.dropTable('collection'),
    knex.schema.dropTable('post_tag'),
    knex.schema.dropTable('comment'),
    knex.schema.dropTable('like'),
    knex.schema.dropTable('tag'),
    knex.schema.dropTable('post'),
    knex.schema.createTable('tag', function(t){
      t.string('id').primary();
    }),
    knex.schema.createTable('post', function(t){
      t.string('id').primary();
      t.string('user_id').notNullable();
      t.string('url');
      t.string('title');
      t.string('description');
      t.string('img');
      t.string('rating');

      t.foreign('user_id').references('email').inTable('user');
    }),
    knex.schema.createTable('like', function(t){
      t.increments('id').primary();
      t.string('post_id').notNullable();
      t.string('user_id').notNullable();

      t.foreign('post_id').references('id').inTable('post');
      t.foreign('user_id').references('email').inTable('user');
    }),
    knex.schema.createTable('comment', function(t){
      t.increments('id').primary();
      t.string('post_id').notNullable();
      t.string('user_id').notNullable();
      t.string('text');

      t.foreign('post_id').references('id').inTable('post');
      t.foreign('user_id').references('email').inTable('user');
    }),
    knex.schema.createTable('post_tag', function(t){
      t.increments('id').primary();
      t.string('post_id').notNullable();
      t.string('tag_id').notNullable();

      t.foreign('post_id').references('id').inTable('post');
      t.foreign('tag_id').references('id').inTable('tag');
    }),
    knex.schema.createTable('collection', function(t){
      t.increments('id').primary();
      t.string('user_id').notNullable();
      t.string('title');
      t.string('description');

      t.foreign('user_id').references('email').inTable('user');
    }),
    knex.schema.createTable('collection_post', function(t){
      t.increments('id').primary();
      t.string('post_id').notNullable();
      t.integer('collection_id').unsigned().notNullable();

      t.foreign('post_id').references('id').inTable('post');
      t.foreign('collection_id').references('id').inTable('collection');
    })
  ]);
};

exports.down = function(knex, Promise) {
  // manually delete and start fresh, I suppose...
};
