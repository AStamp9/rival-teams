import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditTeam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing team name
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
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8081/teams/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team_name: teamName }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update team');
        }
        navigate('/teams');
      })
      .catch(err => {
        console.error('Failed to update team', err);
        setError('Could not update team');
      });
  };

  if (loading) return <p>Loading team...</p>;

  return (
    <div>
      <h2>Edit Team</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="teamName">Team Name:</label>
        <input
          id="teamName"
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
  }
  
  export default EditTeam;