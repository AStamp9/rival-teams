const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

router.get('/', (req, res) =>{
    knex('team_comp_players')
        .select('*')
        .then(data => res.json(data))
        .catch(function (error) {
            console.error("Failed to find team comp players", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

router.get('/:id', (req, res) =>{
    let getId = req.params.id

    knex('team_comp_players')
        .select('*')
        .where({ "id" : parseInt(getId)})
        .first()
        .then(data => {
            if (!data) {
                res.status(404).json({ error: "team comp players not found" });
            } else {
                res.json(data);
            }
        })
        .catch(function (error) {
            console.error("Failed to get team comp id", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

router.get('/team_comp/:team_comp_id', (req, res) => {
    const team_comp_id = parseInt(req.params.team_comp_id);

    knex('team_comp_players')
        .where({ team_comp_id })
        .then(data => {
            if (data.length === 0) {
                res.status(404).json({ error: 'No players found for this team composition' });
            } else {
                res.json(data);
            }
        })
        .catch(error => {
            console.error('Failed to fetch team comp players', error);
            res.status(500).json({ error: 'Something went wrong' });
        });
});

router.post('/', (req, res) => {
    const {
        name, 
        team_comp_id, 
        character_1_id,
        player_1_id,            
        character_2_id,
        player_2_id, 
        character_3_id,
        player_3_id,
        character_4_id,
        player_4_id,
        character_5_id,
        player_5_id, 
        character_6_id,
        player_6_id 
     } = req.body

     if (
        !name ||
        !team_comp_id ||
        !character_1_id || !player_1_id ||
        !character_2_id || !player_2_id ||
        !character_3_id || !player_3_id ||
        !character_4_id || !player_4_id ||
        !character_5_id || !player_5_id ||
        !character_6_id || !player_6_id
    ) {
        return res.status(400).json({ error: "All fields must be provided" });
    }

    const characterIds = [
        character_1_id, character_2_id, character_3_id,
        character_4_id, character_5_id, character_6_id
      ];
      
      const playerIds = [
        player_1_id, player_2_id, player_3_id,
        player_4_id, player_5_id, player_6_id
      ];
      
      const hasDuplicate = (arr) => new Set(arr).size !== arr.length;
      
      if (hasDuplicate(characterIds)) {
        return res.status(400).json({ error: "Duplicate characters are not allowed" });
      }
      
      if (hasDuplicate(playerIds)) {
        return res.status(400).json({ error: "Duplicate players are not allowed" });
      }

    knex('team_comp_players')
        .insert({
            name, 
            team_comp_id, 
            character_1_id,
            player_1_id,            
            character_2_id,
            player_2_id, 
            character_3_id,
            player_3_id,
            character_4_id,
            player_4_id,
            character_5_id,
            player_5_id, 
            character_6_id,
            player_6_id 
         })
        .returning('id')
        .then(function([id]){
            res.status(201).json({success: true, id, message: 'team comp players created'})
        })
        .catch(function (error) {
            console.error("Failed to add team comp players", error);
            res.status(500).json({ error: "Something went wrong" });
            }
          );
})

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const {
        name, 
        team_comp_id, 
        character_1_id,
        player_1_id,            
        character_2_id,
        player_2_id, 
        character_3_id,
        player_3_id,
        character_4_id,
        player_4_id,
        character_5_id,
        player_5_id, 
        character_6_id,
        player_6_id 
    } = req.body
     
     const updateData = {
        ...(name && { name }),
        ...(team_comp_id && { team_comp_id }),
        ...(character_1_id && { character_1_id }),
        ...(player_1_id && { player_1_id }),
        ...(character_2_id && { character_2_id }),
        ...(player_2_id && { player_2_id }),
        ...(character_3_id && { character_3_id }),
        ...(player_3_id && { player_3_id }),
        ...(character_4_id && { character_4_id }),
        ...(player_4_id && { player_4_id }),
        ...(character_5_id && { character_5_id }),
        ...(player_5_id && { player_5_id }),
        ...(character_6_id && { character_6_id }),
        ...(player_6_id && { player_6_id })
      };

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }
      const characterIds = [
        updateData.character_1_id,
        updateData.character_2_id,
        updateData.character_3_id,
        updateData.character_4_id,
        updateData.character_5_id,
        updateData.character_6_id
      ].filter(Boolean);
    
      const playerIds = [
        updateData.player_1_id,
        updateData.player_2_id,
        updateData.player_3_id,
        updateData.player_4_id,
        updateData.player_5_id,
        updateData.player_6_id
      ].filter(Boolean);
    
      const hasDuplicate = (arr) => new Set(arr).size !== arr.length;
    
      if (hasDuplicate(characterIds)) {
        return res.status(400).json({ error: "Duplicate characters are not allowed" });
      }
    
      if (hasDuplicate(playerIds)) {
        return res.status(400).json({ error: "Duplicate players are not allowed" });
      }

    knex('team_comp_players')
      .where({id})
      .update( updateData )
      .then(count => {
        if (count === 0) {
          res.status(404).json({ error: "team comp and players not found" });
        } else {
          res.json({ success: true, message: "team comp and players updated" });
        }
      })
      .catch(error => {
        console.error("Failed to update team comp and players", error);
        res.status(500).json({ error: "Something went wrong" });
      });
  });

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    knex('team_comp_players')
        .where({"id" : id})
        .del()
        .then(function(deleteCount){
            if (deleteCount === 0) {
                res.status(404).json({error: 'team comp and players doesnt exist'})
            } else {
            res.status(200).json({success: true, message: 'team comp and players deleted'})
            }
        })
        .catch(function (error) {
            console.error("Failed to delete team comp and players", error);
            res.status(500).json({ error: "Something went wrong" });
        })
})

module.exports = router;