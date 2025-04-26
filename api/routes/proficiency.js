const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

router.get('/proficiency', (req, res) =>{
    knex('player_proficiency')
        .select('*')
        .then(data => res.json(data))
        .catch(function (error) {
            console.error("Failed to find players proficiencies", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

router.get('/proficiency/:player_id/:character_id', (req, res) =>{
    const { player_id, character_id } = req.params;

    knex('player_proficiency')
        .where({ player_id, character_id })
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

router.post('/proficiency', (req, res) => {
    const {player_id, character_id, proficiency} = req.body

    if (!Number.isInteger(proficiency) || proficiency < 1 || proficiency > 5) {
        return res.status(400).json({ error: "Proficiency must be an integer between 1 and 5" });
      }

    knex('player_proficiency')
        .insert({player_id, character_id, proficiency})
        .then(function(){
            res.status(201).json({success: true, message: 'proficiency added'})
        })
        .catch(function (error) {
            console.error("Failed to add proficiency", error);
            if (error.code === '23505') {
              // Unique constraint violation
              res.status(409).json({ error: "Proficiency already exists for this player/character" });
            } else {
              res.status(500).json({ error: "Something went wrong" });
            }
          });
})

router.patch('/proficiency', (req, res) => {
    const { player_id, character_id, proficiency } = req.body;
  
    if (!Number.isInteger(proficiency) || proficiency < 1 || proficiency > 5) {
      return res.status(400).json({ error: "Proficiency must be an integer between 1 and 5" });
    }
  
    knex('player_proficiency')
      .where({ player_id, character_id })
      .update({ proficiency })
      .then(count => {
        if (count === 0) {
          res.status(404).json({ error: "Proficiency not found" });
        } else {
          res.json({ success: true, message: "Proficiency updated" });
        }
      })
      .catch(error => {
        console.error("Failed to update proficiency", error);
        res.status(500).json({ error: "Something went wrong" });
      });
  });

router.delete('/proficiency', (req, res) => {
    const { player_id, character_id} = req.body;

    knex('player_proficiency')
        .where({player_id, character_id})
        .del()
        .then(function(proficiencyExist){
            if (proficiencyExist === 0) {
                res.status(404).json({error: 'proficiency doesnt exist'})
            } else {
            res.status(200).json({success: true, message: 'proficiency deleted'})
            }
        })
        .catch(function (error) {
            console.error("Failed to delete proficiency", error);
            res.status(500).json({ error: "Something went wrong" });
        })
})

module.exports = router;