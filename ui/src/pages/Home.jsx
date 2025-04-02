import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
    
    return ( 
    <div>
        <h1>Marvel Rivals Team Comp Generator</h1>

        <div>
            <button onClick={() => navigate('/teams')}>View Teams</button>
            <button onClick={() => navigate('/teams/create')}>Create Team</button>
            <button onClick={() => navigate('/players')}>View Players</button>
            <button onClick={() => navigate('/players/create')}>Add Player</button>
            <button onClick={() => navigate('/comps')}>View Character Comps</button>
            <button onClick={() => navigate('/comps/create')}>Create Character Comp</button>
      </div>

    </div>
  )
}
  
  export default Home;