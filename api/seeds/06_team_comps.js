/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('team_comps').del()
  await knex('team_comps').insert([
    {
      name: 'thunder', 
      team_id: 1, 
      character_1_id: 1,
      character_2_id: 2,
      character_3_id: 3,
      character_4_id: 4,
      character_5_id: 5,
      character_6_id: 6,
    },
    
  ]);
};
