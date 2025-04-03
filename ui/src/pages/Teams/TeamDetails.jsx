import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../../components/GlobalContext';

function TeamDetails() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { players: allPlayers } = useGlobalContext();
  

  useEffect(() => {
    fetch(`http://localhost:8081/teams/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('Team data from /teams/:id:', data); 
        setTeam(data[0]); 
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching team:', err);
        setError('Could not load team');
        setLoading(false);
      });

      fetch(`http://localhost:8081/teams/${id}/players`)
      .then(res => res.json())
      .then(data => setPlayers(data))
      .catch(err => {
        console.error('Error fetching team players:', err);
      });
  }, [id]);

  if (loading) return <p>Loading team...</p>;
  if (error) return <p>{error}</p>;
  if (!team) return <p>Team not found.</p>;

  return (
    <div>
           <h2>Team Details</h2>
      <p><strong>Name:</strong> {team.team_name}</p>
      <p><strong>ID:</strong> {team.id}</p>

      <h3>Players on this Team</h3>
      {players.length === 0 ? (
        <p>No players assigned to this team.</p>
      ) : (
        <ul>
          {players.map(player => (
            <li key={player.id}>
            <Link to={`/players/${player.id}`}>{player.name}</Link>
          </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default TeamDetails;