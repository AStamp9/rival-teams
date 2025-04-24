const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js')["development"]);

router.get('/', (req, res) =>{
    knex('characters')
        .select('*')
        .then(data => res.json(data))
        .catch(function (error) {
            console.error("Failed to find characters", error);
            res.status(500).json({ error: "Something went wrong" });
        })
});

router.get('/:id', (req, res) =>{
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


router.post('/', (req, res) => {
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

router.patch('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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
});

module.exports = router;

