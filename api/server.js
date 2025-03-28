const express = require('express')
const app = express();
const port = 8081;
const knex = require('knex')(require('../knexfile.js')["development"])

app.get('/', (req, res) =>{
    res.send('Rival Teams Server is under construction')
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})