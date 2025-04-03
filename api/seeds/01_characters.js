/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('characters').del()
  await knex('characters').insert([
    {name: 'captain america', role: 'vangard'},
    {name: 'thor', role: 'vangard'},
    {name: 'storm', role: 'duelist'},
    {name: 'hela', role: 'duelist'},
    {name: 'loki', role: 'strategist'},
    {name: 'luna snow', role: 'strategist'},
    {name: 'wolverine', role: 'duelist'},
    {name: 'winter soldier', role: 'duelist'},
    {name: 'Iron Man', role: 'duelist' },
    {name: 'Scarlet Witch', role: 'duelist' },
    {name: 'Black Panther', role: 'duelist' },
    {name: 'Spider-Man', role: 'duelist' }
  ]);
};
