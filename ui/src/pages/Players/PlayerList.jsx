import { useState } from 'react';
import { useGlobalContext } from '../../components/GlobalContext';
import { useNavigate } from 'react-router-dom';

function PlayerList() {
  const { players, loadingPlayers } = useGlobalContext();
  const [newPlayerName, setNewPlayerName] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleCreatePlayer = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:8081/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newPlayerName }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create player');
        return res.json();
      })
      .then(() => {
        setNewPlayerName('');
        setError(null);
        window.location.reload(); 
      })
      .catch(err => {
        console.error('Error creating player:', err);
        setError('Could not create player.');
      });
  };

  const handleDelete = (playerId) => {
    if (!window.confirm('Are you sure you want to delete this player?')) return;
  
    fetch(`http://localhost:8081/players/${playerId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete player');
        return res.json();
      })
      .then(() => {
        window.location.reload(); // Replace with context refresh later
      })
      .catch(err => {
        console.error('Error deleting player:', err);
      });
  };


  if (loadingPlayers) return <p>Loading players...</p>;
  if (players.length === 0) return <p>No players found.</p>;

  return (
    <div>
      <h3>Create New Player</h3>
        <form onSubmit={handleCreatePlayer}>
        <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Enter player name"
            required
        />
        <button type="submit">Create Player</button>
        </form>
      <h2>Players</h2>
      <ul>
        {players.map(player => (
          <li key={player.id}>
            {player.name}
            <button onClick={() => navigate(`/players/${player.id}`)}>View</button>
            <button onClick={() => handleDelete(player.id)}>Delete</button>
          </li>
        ))}
      </ul>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default PlayerList;