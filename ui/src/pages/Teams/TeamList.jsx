import { useState, useEffect } from 'react'
import TeamCard from '../../components/TeamCard';

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

    const handleDelete = (id) => {
        fetch(`http://localhost:8081/teams/${id}`, {
          method: 'DELETE',
        })
          .then(res => {
            if (!res.ok) {
              throw new Error('Failed to delete team');
            }
            setTeams(prev => prev.filter(team => team.id !== id));
          })
          .catch(err => console.error('Delete error:', err));
      };

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
                <TeamCard key={team.id} team={team} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </div>
    )
  }
  
  export default TeamList;