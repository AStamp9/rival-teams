const express = require('express')
const app = express();
const port = 8081;
const knex = require('knex')(require('./knexfile.js')["development"])

app.get('/', (req, res) =>{
    res.send('Rival Teams Server is under construction')
})

//------------ players GET----------------------------

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


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})