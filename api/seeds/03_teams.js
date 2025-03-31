/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teams').del()
  await knex('teams').insert([
    {id: 1, team_name: 'Delta'},
    {id: 2, team_name: 'Athens'},
    {id: 3, team_name: 'Rose'}
  ]);
};
