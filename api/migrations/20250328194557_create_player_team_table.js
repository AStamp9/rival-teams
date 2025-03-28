/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('player_team', function (table) {
        table.increments();
        table.integer('player_id').references('id').inTable('players').onDelete('CASCADE');
        table.integer('team_id').references('id').inTable('teams').onDelete('CASCADE');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('player_team');
};
