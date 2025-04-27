const express = require('express')
const app = express();
const port = 8081;
const knex = require('knex')(require('./knexfile.js')["development"]);
const cors = require('cors');

const playersRouter = require('./routes/players');
const charactersRouter = require('./routes/characters');
const characterCompsRouter = require('./routes/characterComps.js')
const teamsRouter = require('./routes/teams.js')
const playerTeamsRouter = require('./routes/playerTeams.js')
const proficiencyRouter = require('./routes/proficiency')
const teamCompsRouter = require('./routes/teamComps')
const teamCompPlayersRouter = require('./routes/teamCompPlayers')
const bansRouter = require('./routes/bans')

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Rival Teams Server is under construction')
})

app.use('/players', playersRouter);
app.use('/characters', charactersRouter);
app.use('/character_comps', characterCompsRouter)
app.use('/teams', teamsRouter)
app.use('/player_teams', playerTeamsRouter)
app.use('/proficiency', proficiencyRouter)
app.use('/team_comps', teamCompsRouter)
app.use('/team_comp_players', teamCompPlayersRouter)
app.use('/bans', bansRouter)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})