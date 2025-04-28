const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

router.get('/', (req, res) => {
    knex('character_comps')
      .select('*')
      .then(comps => {
        const characterIds = comps.flatMap(comp => [
          comp.character_1_id,
          comp.character_2_id,
          comp.character_3_id,
          comp.character_4_id,
          comp.character_5_id,
          comp.character_6_id
        ]);
  
        knex('characters')
          .whereIn('id', characterIds)
          .select('id', 'name', 'role')
          .then(characters => {
            const enrichedComps = comps.map(comp => {
              const getChar = (id) => characters.find(c => c.id === id);
  
              return {
                ...comp,
                characters: [
                  getChar(comp.character_1_id),
                  getChar(comp.character_2_id),
                  getChar(comp.character_3_id),
                  getChar(comp.character_4_id),
                  getChar(comp.character_5_id),
                  getChar(comp.character_6_id)
                ]
              };
            });
  
            res.json(enrichedComps);
          })
          .catch(error => {
            console.error('Failed to fetch characters:', error);
            res.status(500).json({ error: 'Something went wrong' });
          });
      })
      .catch(error => {
        console.error('Failed to fetch character comps:', error);
        res.status(500).json({ error: 'Something went wrong' });
      });
  });

router.get('/:id', (req, res) => {
  const compId = parseInt(req.params.id);

  knex('character_comps')
    .where({ id: compId })
    .first()
    .then(comp => {
      if (!comp) {
        return res.status(404).json({ error: 'Character comp not found' });
      }
      res.json(comp);
    })
    .catch(error => {
      console.error('Failed to fetch character comp:', error);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

router.get('/:id/details', (req, res) => {
    const compId = parseInt(req.params.id);
  
    knex('character_comps')
      .where({ id: compId })
      .first()
      .then(comp => {
        if (!comp) {
          return res.status(404).json({ error: 'Character comp not found' });
        }
  
        const characterIds = [
          comp.character_1_id,
          comp.character_2_id,
          comp.character_3_id,
          comp.character_4_id,
          comp.character_5_id,
          comp.character_6_id,
        ];
  
        knex('characters')
          .whereIn('id', characterIds)
          .select('id', 'name', 'role')
          .then(characters => {
            const getChar = id => characters.find(c => c.id === id);
            const enrichedComp = {
              ...comp,
              characters: [
                getChar(comp.character_1_id),
                getChar(comp.character_2_id),
                getChar(comp.character_3_id),
                getChar(comp.character_4_id),
                getChar(comp.character_5_id),
                getChar(comp.character_6_id),
              ]
            };
            res.json(enrichedComp);
          });
      })
      .catch(err => {
        console.error('Failed to load enriched comp', err);
        res.status(500).json({ error: 'Something went wrong' });
      });
  });

router.post('/', (req, res) => {
    const {
      name,
      character_1_id,
      character_2_id,
      character_3_id,
      character_4_id,
      character_5_id,
      character_6_id,
    } = req.body;
  
    knex('character_comps')
      .insert({
        name,
        character_1_id,
        character_2_id,
        character_3_id,
        character_4_id,
        character_5_id,
        character_6_id,
      })
      .returning('id')
      .then(([id]) => {
        res.status(201).json({ success: true, id, message: 'Character comp created' });
      })
      .catch(error => {
        console.error('Failed to create character comp:', error);
        res.status(500).json({ error: 'Something went wrong' });
      });
  });

router.patch('/:id', (req, res) => {
const compId = parseInt(req.params.id);
const updateData = req.body;

if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
}

knex('character_comps')
    .where({ id: compId })
    .update(updateData)
    .then(count => {
    if (count === 0) {
        res.status(404).json({ error: 'Character comp not found' });
    } else {
        res.json({ success: true, message: 'Character comp updated' });
    }
    })
    .catch(error => {
    console.error('Failed to update character comp:', error);
    res.status(500).json({ error: 'Something went wrong' });
    });
});

router.delete('/:id', (req, res) => {
const compId = parseInt(req.params.id);

knex('character_comps')
    .where({ id: compId })
    .del()
    .then(count => {
    if (count === 0) {
        res.status(404).json({ error: 'Character comp not found' });
    } else {
        res.json({ success: true, message: 'Character comp deleted' });
    }
    })
    .catch(error => {
    console.error('Failed to delete character comp:', error);
    res.status(500).json({ error: 'Something went wrong' });
    });
});

module.exports = router;