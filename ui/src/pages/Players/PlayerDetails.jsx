import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../components/GlobalContext';

function PlayerDetails() {
  const { id } = useParams();
  const [playerName, setPlayerName] = useState('');
  const [proficiencies, setProficiencies] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCharId, setNewCharId] = useState('');
  const [newProf, setNewProf] = useState(1);
  const { characters, loadingCharacters } = useGlobalContext();

  useEffect(() => {
    fetch(`http://localhost:8081/players/${id}`)
      .then(res => res.json())
      .then(data => {
        setPlayerName(data[0]?.name || 'Unknown');
      })
      .catch(err => {
        console.error('Error loading player info:', err);
        setLoading(false);
      });
      

    fetch(`http://localhost:8081/players/${id}/proficiencies`)
      .then(res => res.json())
      .then(data => {
        setProficiencies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading proficiencies', err);
        setLoading(false);
      });

    fetch(`http://localhost:8081/players/${id}/teams`)
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(err => console.error('Error loading player teams:', err));
  }, [id]);

  const handleUpdatePlayer = (e) => {
    e.preventDefault();
  
    fetch(`http://localhost:8081/players/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: playerName }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update player');
        return res.json();
      })
      .then(() => {
        console.log('Player updated successfully');
      })
      .catch(err => {
        console.error('Error updating player:', err);
      });
  };

  const handleAddProficiency = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:8081/proficiency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        player_id: parseInt(id),
        character_id: parseInt(newCharId),
        proficiency: newProf,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add proficiency');
        return res.json();
      })
      .then(() => {
        setNewCharId('');
        setNewProf(1);
        return fetch(`http://localhost:8081/players/${id}/proficiencies`);
      })
      .then(res => res.json())
      .then(data => setProficiencies(data))
      .catch(err => console.error('Error adding proficiency:', err));
  };

  const handleUpdateProficiency = (charId, newValue) => {
    fetch('http://localhost:8081/proficiency', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        player_id: parseInt(id),
        character_id: charId,
        proficiency: newValue,
      }),
    })
    .then(() => {
        return fetch(`http://localhost:8081/players/${id}/proficiencies`);
      })
      .then(res => res.json())
      .then(data => {
        setProficiencies(data);
      })
      .catch(err => console.error('Error updating proficiency:', err));
  };

  if (loading) return <p>Loading player...</p>;

  return (
    <div>
      <h2>Player Details</h2>

      <h3>Edit Player Name</h3>
        <form onSubmit={handleUpdatePlayer}>
        <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
        />
        <button type="submit">Update Name</button>
        </form>

        <h3>Teams</h3>
            {teams.length === 0 ? (
            <p>This player is not on any teams.</p>
            ) : (
            <ul>
                {teams.map(team => (
                <li key={team.id}>{team.team_name}</li>
                ))}
            </ul>
            )}

      <h3>Character Proficiencies:</h3>
      {proficiencies.length === 0 ? (
        <p>No proficiencies found.</p>
        ) : (
        <ul>
          {proficiencies.map((entry, i) => (
          <li key={i}>
          {entry.character_name} ({entry.role}) —
            <select
                value={entry.proficiency}
                onChange={(e) =>
                handleUpdateProficiency(entry.character_id, parseInt(e.target.value))
                }
            >
                {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
                ))}
            </select>
          </li>
          ))}
        </ul>
      )}

        <h3>Add New Character Proficiency</h3>
        <form onSubmit={handleAddProficiency}>
        <select
            value={newCharId}
            onChange={(e) => setNewCharId(e.target.value)}
            required
        >
            <option value="">-- Select Character --</option>
            {characters.map((char) => (
            <option key={char.id} value={char.id}>
                {char.name} ({char.role})
            </option>
            ))}
        </select>

        <select
            value={newProf}
            onChange={(e) => setNewProf(parseInt(e.target.value))}
        >
            {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
            ))}
        </select>

        <button type="submit">Add</button>
        </form>
    </div>
  );
}

export default PlayerDetails;