import { useGlobalContext } from '../../components/GlobalContext';
import { useNavigate } from 'react-router-dom';

function PlayerList() {
  const { players, loadingPlayers } = useGlobalContext();
  const navigate = useNavigate();

  if (loadingPlayers) return <p>Loading players...</p>;
  if (players.length === 0) return <p>No players found.</p>;

  return (
    <div>
      <h2>Players</h2>
      <ul>
        {players.map(player => (
          <li key={player.id}>
            {player.name}
            <button onClick={() => navigate(`/players/${player.id}`)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;