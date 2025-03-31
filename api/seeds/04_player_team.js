/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('player_team').del()
  await knex('player_team').insert([
    {player_id: 1, team_id: 1},
    {player_id: 2, team_id: 1},
    {player_id: 3, team_id: 1},
    {player_id: 4, team_id: 1},
    {player_id: 5, team_id: 1},
    {player_id: 6, team_id: 1},
    {player_id: 6, team_id: 2}
  ]);
};
