/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('bans', function (table) {
        table.increments();
        table.integer('team_comps_id').references('id').inTable('team_comps').onDelete('CASCADE');
        table.integer('ban_character_1_id').references('id').inTable('characters').onDelete('CASCADE');
        table.integer('ban_character_2_id').references('id').inTable('characters').onDelete('CASCADE');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('bans');
};
