/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('players').del()
  await knex('players').insert([
    {name: 'Andrew'},
    {name: 'JB'},
    {name: 'Jared'},
    {name: 'Jake'},
    {name: 'Jeff'},
    {name: 'Kyle'}
  ]);
};
