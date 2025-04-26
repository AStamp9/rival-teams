const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

router.get('/teams', (req, res) =>{
    knex('teams')
        .select('*')
        .then(data => res.json(data))
        .catch(function (error) {
            console.error("Failed to find teams", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

router.get('/teams/:id', (req, res) =>{
    let getId = req.params.id
    knex('teams')
        .select('*')
        .where({'id' : parseInt(getId)})
        .then(teams => {
            if (teams.length === 0){
                res.status(404).json({error: "teams not found"});
            } else {
                res.json(teams)
            }
        })
        .catch(function (error) {
            console.error("Failed to find team", error);
            res.status(500).json({ error: "Something went wrong" });
            })
        })

router.get('/teams/:id/players', (req, res) => {
    const teamId = parseInt(req.params.id);
    
   knex('player_team')
        .join('players', 'player_team.player_id', 'players.id')
        .select('players.id', 'players.name')
        .where('player_team.team_id', teamId)
        .then(players => {
            res.json(players);  
        })
    .catch (error => {
        console.error('Failed to get players for team', error);
        res.status(500).json({ error: 'Something went wrong' });
        });
    });

router.get('/teams/:id/comps', (req, res) => {
    const teamId = parseInt(req.params.id);
    knex('team_comps')
        .where({ team_id: teamId })
        .then(comps => res.json(comps))
        .catch(error => {
            console.error("Failed to fetch comps for team", error);
            res.status(500).json({ error: "Something went wrong" });
        });
});


router.post('/teams', (req, res) => {
    const {id, team_name} = req.body

    knex('teams')
        .insert({id, team_name})
        .returning('id')
        .then(function(){
            res.status(201).json({success: true, id, message: 'Team Added'})
        })
        .catch(function (error) {
            console.error("Failed to add team", error);
            res.status(500).json({ error: "Something went wrong" });
        })
})

router.patch('/teams/:id', (req, res) => {
    let getId = req.params.id
    const {team_name} = req.body

    knex('teams')
        .where({"id" : getId})
        .update({team_name})
        .then(function(teamExist){
            if (teamExist === 0) {
                res.status(404).json({error: 'team doesnt exist, create new team'})
            } else {
            res.status(201).json({success: true, getId, message: 'Team updated'})
            }
        })
        .catch(function (error) {
            console.error("Failed to update team", error);
            res.status(500).json({ error: "Something went wrong" });
        })
})

router.delete('/teams/:id', (req, res) => {
    let getId = req.params.id

    knex('teams')
        .where({"id" : getId})
        .del()
        .then(function(teamExist){
            if (teamExist === 0) {
                res.status(404).json({error: 'team doesnt exist'})
            } else {
            res.status(200).json({success: true, id: getId, message: 'Teams Deleted'})
            }
        })
        .catch(function (error) {
            console.error("Failed to delete team", error);
            res.status(500).json({ error: "Something went wrong" });
        })
})

module.exports = router;