const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

router.get('/', (req, res) =>{
    knex('player_team')
        .select('*')
        .then(data => res.json(data))
        .catch(function (error) {
            console.error("Failed to find teams", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

router.get('/:id', (req, res) =>{
    let getId = req.params.id
    knex('player_team')
        .select('*')
        .where({'id' : parseInt(getId)})
        .then(player_team => {
            if (player_team.length === 0){
                res.status(404).json({error: "player team link not found"});
            } else {
                res.json(player_team)
            }
        })
        .catch(function (error) {
            console.error("Failed to find player team link", error);
            res.status(500).json({ error: "Something went wrong" });
            })
        })


router.post('/', (req, res) => {
    const {id, player_id, team_id} = req.body

    knex('player_team')
        .insert({id, player_id, team_id})
        .returning('id')
        .then(([id]) => {
            res.status(201).json({success: true, id, message: 'player added to team'})
        })
        .catch(function (error) {
            console.error("Failed to add player to team", error);
            res.status(500).json({ error: "Something went wrong" });
        })
})

router.delete('/:id', (req, res) => {
    let getId = req.params.id

    knex('player_team')
        .where({"id" : getId} )
        .del()
        .then(function(playerTeamExist){
            if (playerTeamExist === 0) {
                res.status(404).json({error: 'link not'})
            } else {
            res.status(200).json({success: true, id: getId, message: 'player team link deleted'})
            }
        })
        .catch(function (error) {
            console.error("Failed to delete link", error);
            res.status(500).json({ error: "Something went wrong" });
        })
})

module.exports = router;