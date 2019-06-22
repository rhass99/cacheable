
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('post').insert({
          id: 1,
          user_id: 'f55c16ff46fbdf6b2016ab8662d3b555',
          url: 'https://developer.mozilla.org/en-US/docs/Web/Web_Components',
          title: 'Web Components',
          description: 'Web Components is a suite of different technologies allowing you to create reusable custom elements',
          img: 'https://cdn-images-1.medium.com/max/1200/1*7oMzHMOkwWwxBbmDkXKtLg.png',
          rating: '5'
        }),
        knex('post').insert({
          id: 2,
          user_id: 'f55c16ff46fbdf6b2016ab8662d3b555',
          url: 'https://www.w3schools.com/sql/default.asp',
          title: 'SQL',
          description: 'SQL (pronounced "ess-que-el") stands for Structured Query Language. SQL is used to communicate with a database.',
          img: 'https://broadviewnetworks.ca/wp-content/uploads/2018/02/sql.png',
          rating: '4.9'
        }),
        knex('post').insert({
          id: 3,
          user_id: 'f55c16ff46fbdf6b2016ab8662d3b555',
          url: 'https://css-tricks.com/',
          title: 'CSS',
          description: 'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language like HTML. ',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png',
          rating: '5'
        })
      ]);
    });
};
