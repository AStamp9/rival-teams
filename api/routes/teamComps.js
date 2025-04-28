const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

router.get('/', (req, res) =>{
    knex('team_comps')
        .select('*')
        .then(data => res.json(data))
        .catch(function (error) {
            console.error("Failed to find team compositions", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

router.get('/:id', (req, res) =>{
    let getId = req.params.id

    knex('team_comps')
        .select('*')
        .where({ "id" : parseInt(getId)})
        .first()
        .then(data => {
            if (!data) {
                res.status(404).json({ error: "Proficiency not found" });
            } else {
                res.json(data);
            }
        })
        .catch(function (error) {
            console.error("Failed to get proficiency", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

router.get('/:id/details', (req, res) => {
    const teamCompId = parseInt(req.params.id);
  
    let compData;
  
    knex('team_comp_players')
      .where({ team_comp_id: teamCompId })
      .first()
      .then(comp => {
        if (!comp) {
          return res.status(404).json({ error: 'Team composition details not found' });
        }
  
        compData = comp; // Save comp data
  
        return knex('team_comps').where({ id: teamCompId }).first();
      })
      .then(teamComp => {
        if (!teamComp) {
          throw new Error('Team comp name not found');
        }
  
        const characterIds = [
          compData.character_1_id,
          compData.character_2_id,
          compData.character_3_id,
          compData.character_4_id,
          compData.character_5_id,
          compData.character_6_id,
        ];
  
        const playerIds = [
          compData.player_1_id,
          compData.player_2_id,
          compData.player_3_id,
          compData.player_4_id,
          compData.player_5_id,
          compData.player_6_id,
        ];
  
        return Promise.all([
          knex('characters').whereIn('id', characterIds),
          knex('players').whereIn('id', playerIds),
          knex('player_proficiency')
            .whereIn('player_id', playerIds)
            .whereIn('character_id', characterIds),
          teamComp,
        ]);
      })
      .then(([characters, players, proficiencyData, teamComp]) => {
        const characterIds = [
          compData.character_1_id,
          compData.character_2_id,
          compData.character_3_id,
          compData.character_4_id,
          compData.character_5_id,
          compData.character_6_id,
        ];
  
        const playerIds = [
          compData.player_1_id,
          compData.player_2_id,
          compData.player_3_id,
          compData.player_4_id,
          compData.player_5_id,
          compData.player_6_id,
        ];
  
        const details = characterIds.map((charId, i) => {
          const playerId = playerIds[i];
          const character = characters.find(c => c.id === charId);
          const player = players.find(p => p.id === playerId);
          const prof = proficiencyData.find(
            p => p.character_id === charId && p.player_id === playerId
          );
  
          return {
            character,
            player,
            proficiency: prof ? prof.proficiency : null,
          };
        });
  
        res.json({ 
          team_comp_id: teamCompId, 
          team_comp_name: teamComp.name, 
          details 
        });
      })
      .catch(error => {
        console.error('Failed to fetch team comp details', error);
        res.status(500).json({ error: 'Something went wrong' });
      });
  });

router.post('/', (req, res) => {
    const {
        name, 
        team_id, 
        character_1_id,
        character_2_id, 
        character_3_id, 
        character_4_id, 
        character_5_id, 
        character_6_id 
     } = req.body

     if (!name || !team_id) {
        return res.status(400).json({ error: "Name and team_id are required" });
      }

    knex('team_comps')
        .insert({    
            name, 
            team_id, 
            character_1_id,
            character_2_id, 
            character_3_id, 
            character_4_id, 
            character_5_id, 
            character_6_id })
        .returning('id')
        .then(function([id]){
            res.status(201).json({success: true, id, message: 'team comp created'})
        })
        .catch(function (error) {
            console.error("Failed to add team comp", error);
            res.status(500).json({ error: "Something went wrong" });
            }
          );
})

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const {
        name, 
        team_id, 
        character_1_id,
        character_2_id, 
        character_3_id, 
        character_4_id, 
        character_5_id, 
        character_6_id 
     } = req.body
     
     const updateData = {
        ...(name && { name }),
        ...(team_id && { team_id }),
        ...(character_1_id && { character_1_id }),
        ...(character_2_id && { character_2_id }),
        ...(character_3_id && { character_3_id }),
        ...(character_4_id && { character_4_id }),
        ...(character_5_id && { character_5_id }),
        ...(character_6_id && { character_6_id }),
      };

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

    knex('team_comps')
      .where({id})
      .update( updateData )
      .then(count => {
        if (count === 0) {
          res.status(404).json({ error: "team comp not found" });
        } else {
          res.json({ success: true, message: "team comp updated" });
        }
      })
      .catch(error => {
        console.error("Failed to update team comp", error);
        res.status(500).json({ error: "Something went wrong" });
      });
  });

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    knex('team_comps')
        .where({"id" : id})
        .del()
        .then(function(deleteCount){
            if (deleteCount === 0) {
                res.status(404).json({error: 'team comp doesnt exist'})
            } else {
            res.status(200).json({success: true, message: 'team comp deleted'})
            }
        })
        .catch(function (error) {
            console.error("Failed to delete team comp", error);
            res.status(500).json({ error: "Something went wrong" });
        })
})

module.exports = router;
