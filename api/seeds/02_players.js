/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('players').del()
  await knex('players').insert([
    {id: 1, name: 'Andrew'},
    {id: 2, name: 'JB'},
    {id: 3, name: 'Jared'},
    {id: 4, name: 'Jake'},
    {id: 5, name: 'Jeff'},
    {id: 6, name: 'Kyle'}
  ]);
};
