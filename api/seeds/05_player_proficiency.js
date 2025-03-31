/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('player_proficiency').del()
  await knex('player_proficiency').insert([
    {player_id: 1, character_id: 1, proficiency: 4},
    {player_id: 2, character_id: 2, proficiency: 2},
    {player_id: 3, character_id: 3, proficiency: 3},
    {player_id: 4, character_id: 4, proficiency: 4},
    {player_id: 5, character_id: 5, proficiency: 5},
    {player_id: 6, character_id: 6, proficiency: 1},
    {player_id: 1, character_id: 2, proficiency: 2}
  ]);
};
