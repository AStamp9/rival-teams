// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      password: 'docker',
      user: 'postgres',
      port: 5432,
      database: 'rival_teams'
    }
  },


};
