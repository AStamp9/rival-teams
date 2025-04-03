/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teams').del()
  await knex('teams').insert([
    {team_name: 'Delta'},
    {team_name: 'Athens'},
    {team_name: 'Rose'}
  ]);
};
