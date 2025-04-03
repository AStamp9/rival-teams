/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bans').del()
  await knex('bans').insert([
    {
      team_comps_id: 1, 
      ban_character_1_id: 7,
      ban_character_2_id: 8
    },
  ]);
};
