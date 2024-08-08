// Update with your config settings.
require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  client: 'pg',
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: './database/migrations'
    }

};
