import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();

    return ( 
    <div>
        <h1>Marvel Rivals Team Comp Generator</h1>

        <div>
            <button onClick={() => navigate('/teams')}>Teams</button>
            <button onClick={() => navigate('/players')}>Players</button>
            <button onClick={() => navigate('/comps')}>Character Comps</button>
    
      </div>

    </div>
  )
}
  
  export default Home;