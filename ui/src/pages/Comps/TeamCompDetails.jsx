import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../components/GlobalContext';

function TeamCompDetails() {
  const { id } = useParams(); // team_comp_id
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [bans, setBans] = useState(null);
  const [teamName, setTeamName] = useState('');

  const { characters } = useGlobalContext();

  useEffect(() => {
    fetch(`http://localhost:8081/team_comps/${id}/details`)
      .then(res => res.json())
      .then(data => setDetails(data))
      .catch(err => {
        console.error("Failed to load comp details", err);
        setError("Could not load details");
      });
    fetch(`http://localhost:8081/bans/team_comp/${id}`)
      .then(res => res.json())
      .then(banData => setBans(banData))
      .catch(err => {
        console.warn("No bans found:", err);
        setBans(null);
      });
    fetch(`http://localhost:8081/team_comps/${id}`)
      .then(res => res.json())
      .then(data => {
         const teamId = data.team_id;
         return fetch(`http://localhost:8081/teams/${teamId}`);
        })
      .then(res => res.json())
      .then(teamData => {
        if (Array.isArray(teamData)) {
          setTeamName(teamData[0].team_name);
        }
        })
        .catch(err => {
           console.warn("Failed to fetch team name:", err);
        });
    }, [id]);

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this team comp?")) return;

    fetch(`http://localhost:8081/team_comps/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete comp');
        navigate('/teams'); // or navigate back to the team if you want
      })
      .catch(err => {
        console.error('Delete failed:', err);
        alert('Failed to delete team comp');
      });
  };

  if (error) return <p>{error}</p>;
  if (!details) return <p>Loading...</p>;

  return (
    <div>
      <h2>Team: {teamName}</h2>
      <h2>Comp Composition: {details.team_comp_name}</h2>

      {details.details.map((entry, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <p>
            <strong>Character:</strong> {entry.character?.name} ({entry.character?.role})
          </p>
          <p>
            <strong>Assigned Player:</strong>{' '}
            {entry.player ? `${entry.player.name} (Proficiency: ${entry.proficiency ?? 'N/A'})` : 'Not assigned'}
          </p>
        </div>
      ))}

      <div style={{ marginTop: '1rem' }}>
        <h3>Banned Characters</h3>
        {bans ? (
          <ul>
            <li>{characters.find(c => c.id === bans.ban_character_1_id)?.name || 'Unknown'}</li>
            <li>{characters.find(c => c.id === bans.ban_character_2_id)?.name || 'Unknown'}</li>
          </ul>
        ) : (
          <p>No bans set.</p>
        )}
      </div>

      <button onClick={() => navigate(`/comps/${id}/edit`)}>Edit Composition</button>
      <button onClick={handleDelete} style={{ marginLeft: '1rem', color: 'white' }}>
        Delete Composition
      </button>
    </div>
  );
}

export default TeamCompDetails;
