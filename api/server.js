const express = require('express')
const app = express();
const port = 8081;
const knex = require('knex')(require('./knexfile.js')["development"])
app.use(express.json())

app.get('/', (req, res) =>{
    res.send('Rival Teams Server is under construction')
})

// ----------------- players CRUD---------------------

app.get('/players', (req, res) =>{
    knex('players')
        .select('*')
        .then(data => res.json(data))
        .catch(function (error) {
            console.error("Failed to find players", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

app.get('/players/:id', (req, res) =>{
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


app.post('/players', (req, res) => {
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

app.patch('/players/:id', (req, res) => {
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

app.delete('/players/:id', (req, res) => {
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
})

//------------------------characters CRUD----------------------------------

app.get('/characters', (req, res) =>{
    knex('characters')
        .select('*')
        .then(data => res.json(data))
        .catch(function (error) {
            console.error("Failed to find characters", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

app.get('/characters/:id', (req, res) =>{
    let getId = req.params.id
    knex('characters')
        .select('*')
        .where({'id' : parseInt(getId)})
        .then(characters => {
            if (characters.length === 0){
                res.status(404).json({error: "characters not found"});
            } else {
                res.json(characters)
            }
        })
        .catch(function (error) {
            console.error("Failed to find character", error);
            res.status(500).json({ error: "Something went wrong" });
            })
        })


app.post('/characters', (req, res) => {
    const {id, name, role} = req.body

    knex('characters')
        .insert({id, name, role})
        .returning('id')
        .then(function(){
            res.status(201).json({success: true, id, message: 'Character Added'})
        })
        .catch(function (error) {
            console.error("Failed to add", error);
            res.status(500).json({ error: "Something went wrong" });
        })
})

app.patch('/characters/:id', (req, res) => {
    let getId = req.params.id
    const {name, role} = req.body

    knex('characters')
        .where({"id" : getId})
        .update({name, role})
        .then(function(characterExist){
            if (characterExist === 0) {
                res.status(404).json({error: 'character doesnt exist, create new character'})
            } else {
            res.status(201).json({success: true, getId, message: 'Character updated'})
            }
        })
        .catch(function (error) {
            console.error("Failed to add character", error);
            res.status(500).json({ error: "Something went wrong" });
        })
})

app.delete('/characters/:id', (req, res) => {
    let getId = req.params.id

    knex('characters')
        .where({"id" : getId})
        .del()
        .then(function(characterExist){
            if (characterExist === 0) {
                res.status(404).json({error: 'Character doesnt exist'})
            } else {
            res.status(200).json({success: true, id: getId, message: 'Character Deleted'})
            }
        })
        .catch(function (error) {
            console.error("Failed to delete character", error);
            res.status(500).json({ error: "Something went wrong" });
        })
})

//------------------------teams CRUD----------------------------------

app.get('/teams', (req, res) =>{
    knex('teams')
        .select('*')
        .then(data => res.json(data))
        .catch(function (error) {
            console.error("Failed to find teams", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

app.get('/teams/:id', (req, res) =>{
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


app.post('/teams', (req, res) => {
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

app.patch('/teams/:id', (req, res) => {
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

app.delete('/teams/:id', (req, res) => {
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

//------------------------player_team CRUD----------------------------------

app.get('/player_teams', (req, res) =>{
    knex('player_team')
        .select('*')
        .then(data => res.json(data))
        .catch(function (error) {
            console.error("Failed to find teams", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

app.get('/player_teams/:id', (req, res) =>{
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


app.post('/player_teams', (req, res) => {
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

app.delete('/player_teams/:id', (req, res) => {
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

//------------------player_proficiency CRUD------------------------------

app.get('/proficiency', (req, res) =>{
    knex('player_proficiency')
        .select('*')
        .then(data => res.json(data))
        .catch(function (error) {
            console.error("Failed to find players proficiencies", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

app.get('/proficiency/:player_id/:character_id', (req, res) =>{
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

app.post('/proficiency', (req, res) => {
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

app.patch('/proficiency', (req, res) => {
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

app.delete('/proficiency', (req, res) => {
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

//------------------team_comps CRUD------------------------------

app.get('/team_comps', (req, res) =>{
    knex('team_comps')
        .select('*')
        .then(data => res.json(data))
        .catch(function (error) {
            console.error("Failed to find team compositions", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

app.get('/team_comps/:id', (req, res) =>{
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

app.post('/team_comps', (req, res) => {
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

app.patch('/team_comps/:id', (req, res) => {
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

app.delete('/team_comps/:id', (req, res) => {
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

//------------------team_comp_players CRUD------------------------------

app.get('/team_comp_players', (req, res) =>{
    knex('team_comp_players')
        .select('*')
        .then(data => res.json(data))
        .catch(function (error) {
            console.error("Failed to find team comp players", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

app.get('/team_comp_players/:id', (req, res) =>{
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

app.post('/team_comp_players', (req, res) => {
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

app.patch('/team_comp_players/:id', (req, res) => {
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

app.delete('/team_comp_players/:id', (req, res) => {
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

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})