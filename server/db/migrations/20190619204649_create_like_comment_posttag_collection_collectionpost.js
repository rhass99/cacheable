
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('like', function(t){
      t.increments('id').primary();
      t.integer('post_id').unsigned().notNullable();
      t.string('user_id').notNullable();

      t.foreign('post_id').references('id').inTable('post');
      t.foreign('user_id').references('email').inTable('user');
    }),
    knex.schema.createTable('comment', function(t){
      t.increments('id').primary();
      t.integer('post_id').unsigned().notNullable();
      t.string('user_id').notNullable();
      t.string('text');

      t.foreign('post_id').references('id').inTable('post');
      t.foreign('user_id').references('email').inTable('user');
    }),
    knex.schema.createTable('post_tag', function(t){
      t.increments('id').primary();
      t.integer('post_id').unsigned().notNullable();
      t.integer('tag_id').unsigned().notNullable();

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
      t.integer('post_id').unsigned().notNullable();
      t.integer('collection_id').unsigned().notNullable();

      t.foreign('post_id').references('id').inTable('post');
      t.foreign('collection_id').references('id').inTable('collection');
    })
  ])
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('collection_post'),
  knex.schema.dropTable('collection'),
  knex.schema.dropTable('post_tag'),
  knex.schema.dropTable('comment'),
  knex.schema.dropTable('like')
};
