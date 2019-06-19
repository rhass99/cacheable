require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      directory: './server/db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './server/db/seeds'
    }
  }
};
