/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('player_proficiency', function (table) {
        table.integer('player_id').references('id').inTable('players').onDelete('CASCADE');
        table.integer('character_id').references('id').inTable('characters').onDelete('CASCADE');
        table.integer('proficiency');

        table.primary(['player_id', 'character_id']);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('player_proficiency');
};
