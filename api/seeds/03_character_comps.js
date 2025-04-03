/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('character_comps').del();

  // Inserts seed entries
  await knex('character_comps').insert([
    {
      name: 'Zone Control',
      character_1_id: 1,
      character_2_id: 2,
      character_3_id: 3,
      character_4_id: 4,
      character_5_id: 5,
      character_6_id: 6
    },
    {
      name: 'Dive Comp',
      character_1_id: 7,
      character_2_id: 8,
      character_3_id: 9,
      character_4_id: 10,
      character_5_id: 11,
      character_6_id: 12
    },
    {
      name: 'thunder', 
      character_1_id: 1,
      character_2_id: 2,
      character_3_id: 3,
      character_4_id: 7,
      character_5_id: 8,
      character_6_id: 9,
    }
  ]);
};