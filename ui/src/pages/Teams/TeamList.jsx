import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8081/teams')
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(err => {
        console.error('Failed to load teams', err);
        setError('Could not load teams');
      });
  }, []);

  const handleCreateTeam = (e) => {
    e.preventDefault();

    fetch('http://localhost:8081/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team_name: newTeamName }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create team');
        return res.json();
      })
      .then(() => {
        setNewTeamName('');
        // Refresh the list
        return fetch('http://localhost:8081/teams');
      })
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(err => {
        console.error('Create team error:', err);
        setError('Could not create team');
      });
  };

  return (
    <div>
      <h2>Teams</h2>

      <form onSubmit={handleCreateTeam} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Enter new team name"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: '0.5rem' }}>Create Team</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {teams.map(team => (
          <li key={team.id}>
            {team.team_name}
            <button onClick={() => navigate(`/teams/${team.id}`)} style={{ marginLeft: '1rem' }}>
              View
            </button>
            <button onClick={() => navigate(`/teams/${team.id}/edit`)} style={{ marginLeft: '0.5rem' }}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamList;