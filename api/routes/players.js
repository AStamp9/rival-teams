const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

router.get('/', (req, res) =>{
    knex('players')
        .select('*')
        .then(data => res.json(data))
        .catch(function (error) {
            console.error("Failed to find players", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

router.get('/:id', (req, res) =>{
    let getId = req.params.id
    knex('players')
        .select('*')
        .where({'id' : parseInt(getId)})
        .then(player => {
            if (player.length === 0){
                res.status(404).json({error: "player not found"});
            } else {
                res.json(player)
            }
        })
        .catch(function (error) {
            console.error("Failed to find player", error);
            res.status(500).json({ error: "Something went wrong" });
            })
        })

router.get('/:id/teams', (req, res) => {
    const playerId = parseInt(req.params.id);
    
    knex('player_team')
        .join('teams', 'player_team.team_id', 'teams.id')
        .select('teams.id', 'teams.team_name')
        .where('player_team.player_id', playerId)
        .then(data => {
        res.json(data);
        })
        .catch(err => {
        console.error('Failed to fetch teams for player', err);
        res.status(500).json({ error: 'Something went wrong' });
        });
    });

router.get('/:id/proficiencies', (req, res) => {
    const playerId = parseInt(req.params.id);
    
    knex('player_proficiency')
        .join('characters', 'player_proficiency.character_id', 'characters.id')
        .select(
        'characters.id as character_id',
        'characters.name as character_name',
        'characters.role',
        'player_proficiency.proficiency'
        )
        .where('player_proficiency.player_id', playerId)
        .then(data => {
        res.json(data);
        })
        .catch(error => {
        console.error('Failed to get player proficiencies', error);
        res.status(500).json({ error: 'Something went wrong' });
        });
    });


router.post('/players', (req, res) => {
    const {id, name} = req.body

    knex('players')
        .insert({id, name})
        .returning('id')
        .then(function(){
            res.status(201).json({success: true, id, message: 'Player created'})
        })
        .catch(function (error) {
            console.error("Failed to insert player", error);
            res.status(500).json({ error: "Something went wrong" });
        })
})

router.patch('/:id', (req, res) => {
    let getId = req.params.id
    const {name} = req.body

    knex('players')
        .where({"id" : getId})
        .update({name})
        .then(function(playerExist){
            if (playerExist === 0) {
                res.status(404).json({error: 'player doesnt exist, create new player'})
            } else {
            res.status(201).json({success: true, getId, message: 'Player updated'})
            }
        })
        .catch(function (error) {
            console.error("Failed to insert player", error);
            res.status(500).json({ error: "Something went wrong" });
        })
})

router.delete('/:id', (req, res) => {
    let getId = req.params.id

    knex('players')
        .where({"id" : getId})
        .del()
        .then(function(playerExist){
            if (playerExist === 0) {
                res.status(404).json({error: 'player doesnt exist'})
            } else {
            res.status(200).json({success: true, id: getId, message: 'Player Deleted'})
            }
        })
        .catch(function (error) {
            console.error("Failed to delete player", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

module.exports = router;