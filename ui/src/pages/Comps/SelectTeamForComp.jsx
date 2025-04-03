import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SelectTeamForComp() {
  const { comp_id } = useParams();
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8081/teams')
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(err => console.error('Failed to load teams:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTeamId) {
      navigate(`/comps/${comp_id}/assign/${selectedTeamId}`);
    }
  };

  return (
    <div>
      <h2>Select Team to Assign This Comp</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="team">Choose a Team:</label>
        <select
          id="team"
          value={selectedTeamId}
          onChange={(e) => setSelectedTeamId(e.target.value)}
          required
        >
          <option value="">-- Select a Team --</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>
              {team.team_name}
            </option>
          ))}
        </select>

        <button type="submit" style={{ marginLeft: '1rem' }}>
          Continue
        </button>
      </form>
    </div>
  );
}

export default SelectTeamForComp;