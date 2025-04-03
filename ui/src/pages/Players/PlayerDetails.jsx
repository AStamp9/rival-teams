import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PlayerDetails() {
  const { id } = useParams();
  const [playerName, setPlayerName] = useState('');
  const [proficiencies, setProficiencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get player name (from /players)
    fetch(`http://localhost:8081/players/${id}`)
      .then(res => res.json())
      .then(data => {
        setPlayerName(data[0]?.name || 'Unknown');
      });

    // Get proficiency list
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
  }, [id]);

  if (loading) return <p>Loading player...</p>;

  return (
    <div>
      <h2>Player Details</h2>
      <p><strong>Name:</strong> {playerName}</p>
      <h3>Character Proficiencies:</h3>
      {proficiencies.length === 0 ? (
        <p>No proficiencies found.</p>
      ) : (
        <ul>
          {proficiencies.map((entry, i) => (
            <li key={i}>
              {entry.character_name} ({entry.role}) — Proficiency: {entry.proficiency}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlayerDetails;