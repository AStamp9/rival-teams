import { useGlobalContext } from '../../components/GlobalContext';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditTeam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { players: allPlayers } = useGlobalContext();

  const [teamName, setTeamName] = useState('');
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [loading, setLoading] = useState(true);
  const [playerLinks, setPlayerLinks] = useState([]);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    fetch(`http://localhost:8081/teams/${id}`)
      .then(res => res.json())
      .then(data => {
        setTeamName(data[0]?.team_name || '');
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch team', err);
        setError('Could not load team');
        setLoading(false);
      });

      fetch('http://localhost:8081/player_teams')
      .then(res => res.json())
      .then(data => {
        const links = data.filter(link => link.team_id === parseInt(id));
        setPlayerLinks(links);
      })
      .catch(err => {
        console.error('Error fetching player links:', err);
      });
  }, [id]);

  const handleUpdateTeam = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8081/teams/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team_name: teamName }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update team');
        return res.json();
      })
      .then(() => navigate('/teams'))
      .catch(err => {
        console.error('Error updating team:', err);
        setError('Failed to update team name.');
      });
  };

  const handleAddPlayer = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:8081/player_teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        player_id: parseInt(selectedPlayerId),
        team_id: parseInt(id),
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to assign player');
        return res.json();
      })
      .then(() => {
        setSelectedPlayerId('');
        return fetch('http://localhost:8081/player_teams');
      })
      .then(res => res.json())
      .then(data => {
        const links = data.filter(link => link.team_id === parseInt(id, 10));
        setPlayerLinks(links);
      })
      .catch(err => {
        console.error('Error assigning player:', err);
      });
  };

  const handleRemovePlayer = (linkId) => {
    fetch(`http://localhost:8081/player_teams/${linkId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to remove player');
        return res.json();
      })
      .then(() => {
        // Remove from UI
        setPlayerLinks(prev => prev.filter(link => link.id !== linkId));
      })
      .catch(err => {
        console.error('Error removing player:', err);
      });
  };

  if (loading) return <p>Loading team...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Edit Team</h2>
      <form onSubmit={handleUpdateTeam}>
        <label htmlFor="teamName">Team Name:</label>
        <input
          id="teamName"
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <button type="submit">Update Team Name</button>
      </form>

      <h3>Assigned Players</h3>
      {playerLinks.length === 0 ? (
        <p>No players assigned to this team.</p>
      ) : (
        <ul>
          {playerLinks.map(link => {
            const player = allPlayers.find(p => p.id === link.player_id);
            return (
              <li key={link.id}>
                {player ? player.name : `Player ${link.player_id}`}
                <button onClick={() => handleRemovePlayer(link.id)}>Remove</button>
              </li>
            );
          })}
        </ul>
      )}

      <h4>Add Player to Team</h4>
      <form onSubmit={handleAddPlayer}>
        <select
          value={selectedPlayerId}
          onChange={(e) => setSelectedPlayerId(e.target.value)}
          required
        >
          <option value="">-- Select a player --</option>
          {allPlayers.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        <button type="submit">Add to Team</button>
      </form>
    </div>
  );
  }
  
  export default EditTeam;