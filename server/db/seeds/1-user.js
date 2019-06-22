
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('user').insert({email: 'f55c16ff46fbdf6b2016ab8662d3b555', first_name: 'Blueberry', last_name: 'Scone', password: 123}),
        knex('user').insert({email: 'f8c50e996f4aed6f58e642ee3d39c818', first_name: 'Apple', last_name: 'Turnover', password: 123}),
        knex('user').insert({email: '2663edcf2c2e1b750905468ceab62b0e', first_name: 'Banana', last_name: 'Bread', password: 123})
      ]);
    });
};
