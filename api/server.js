const express = require('express')
const app = express();
const port = 8081;
const knex = require('knex')(require('./knexfile.js')["development"])
app.use(express.json())

app.get('/', (req, res) =>{
    res.send('Rival Teams Server is under construction')
})

//------------ players GETs----------------------------

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

//------------ players POST----------------------------

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

//------------ players POST----------------------------

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

//------------ players DELETE----------------------------

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

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})