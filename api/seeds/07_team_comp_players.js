/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('team_comp_players').del()
  await knex('team_comp_players').insert([
    {id: 1, 
      name: 'primary', 
      team_comp_id: 1, 
      character_1_id: 1,
      player_1_id: 1,
      character_2_id: 2,
      player_2_id: 2,
      character_3_id: 3,
      player_3_id: 3,
      character_4_id: 4,
      player_4_id: 4,
      character_5_id: 5,
      player_5_id: 5,
      character_6_id: 6,
      player_6_id: 6,
    },
  ]);
};
