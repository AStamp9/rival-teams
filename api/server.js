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

//------------------------characters CRUD
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

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})