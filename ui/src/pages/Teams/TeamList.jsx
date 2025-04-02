import { useState, useEffect } from 'react'

function TeamList() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        fetch("http://localhost:8081/teams") 
            .then(res => res.json())
            .then(data => {
                setTeams(data);
                setLoading(false)
            })    
            .catch(error => {
                console.error('Error fetching teams:', error);
                setLoading(false)
            })
        
    }, [])

    if (loading) {
        return <p>Loading teams... </p>
    }

    return (
        <div>
        <h2>Teams</h2>
        {teams.length === 0 ? (
          <p>No teams found.</p>
        ) : (
          <ul>
            {teams.map(team => (
              <li key={team.id}>{team.team_name}</li>
            ))}
          </ul>
        )}
      </div>
    )
  }
  
  export default TeamList;