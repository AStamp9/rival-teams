/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('characters').del()
  await knex('characters').insert([
    {id: 1, name: 'captain america', role: 'vangard'},
    {id: 2, name: 'thor', role: 'vangard'},
    {id: 3, name: 'storm', role: 'duelist'},
    {id: 4, name: 'hela', role: 'duelist'},
    {id: 5, name: 'loki', role: 'strategist'},
    {id: 6, name: 'luna snow', role: 'strategist'},
    {id: 7, name: 'wolverine', role: 'duelist'},
    {id: 8, name: 'winter soldier', role: 'duelist'}
  ]);
};
