/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('team_comps', function (table) {
        table.increments();
        table.string('name')
        table.integer('team_id').references('id').inTable('teams').onDelete('CASCADE');
        table.integer('character_1_id').references('id').inTable('characters').onDelete('CASCADE');
        table.integer('character_2_id').references('id').inTable('characters').onDelete('CASCADE');
        table.integer('character_3_id').references('id').inTable('characters').onDelete('CASCADE');
        table.integer('character_4_id').references('id').inTable('characters').onDelete('CASCADE');
        table.integer('character_5_id').references('id').inTable('characters').onDelete('CASCADE');
        table.integer('character_6_id').references('id').inTable('characters').onDelete('CASCADE');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('team_comps');
};
