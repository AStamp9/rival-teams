import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../components/GlobalContext';

function AssignComp() {
  const { comp_id, team_id } = useParams();
  const { players } = useGlobalContext();
  const [comp, setComp] = useState(null);
  const [team, setTeam] = useState(null);
  const [assignments, setAssignments] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:8081/character_comps/${comp_id}/details`).then(res => res.json()),
      fetch(`http://localhost:8081/teams/${team_id}`).then(res => res.json()),
    ])
      .then(([compData, teamData]) => {
        setComp(compData);
        setTeam(teamData[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        setLoading(false);
      });
  }, [comp_id, team_id]);

  const handleSelect = (charIndex, playerId) => {
    setAssignments(prev => ({
      ...prev,
      [`player_${charIndex + 1}_id`]: parseInt(playerId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const playerIds = Object.values(assignments);
    const hasDuplicates = new Set(playerIds).size !== playerIds.length;
    if (hasDuplicates) {
      alert('Each player can only be assigned to one character.');
      return;
    }

    const teamCompPayload = {
      name: comp.name,
      team_id: parseInt(team_id),
      character_1_id: comp.character_1_id,
      character_2_id: comp.character_2_id,
      character_3_id: comp.character_3_id,
      character_4_id: comp.character_4_id,
      character_5_id: comp.character_5_id,
      character_6_id: comp.character_6_id,
    };

    fetch('http://localhost:8081/team_comps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamCompPayload),
    })
      .then(res => res.json())
      .then(data => {
        const teamCompId = data.id.id;

        const compPlayersPayload = {
          name: comp.name,
          team_comp_id: teamCompId,
          character_1_id: comp.character_1_id,
          character_2_id: comp.character_2_id,
          character_3_id: comp.character_3_id,
          character_4_id: comp.character_4_id,
          character_5_id: comp.character_5_id,
          character_6_id: comp.character_6_id,
          ...assignments,
        };
        console.log('Submitting compPlayersPayload:', compPlayersPayload); // Troubleshooting 
        return fetch('http://localhost:8081/team_comp_players', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(compPlayersPayload),
        })
          .then(res2 => res2.json())
          .then(data2 => {
            if (data2.success) {
              navigate(`/team_comps/${teamCompId}/details`);
            } else {
              throw new Error('Failed to assign players to comp');
            }
          });
      })
      .catch(err => {
        console.error('Assignment failed:', err);
      });
  };

  if (loading || !comp || !team) return <p>Loading...</p>;

  const characters = comp.characters || [];

  return (
    <div>
      <h2>Assign Comp: {comp.name}</h2>
      <p><strong>Team:</strong> {team.team_name}</p>

      <form onSubmit={handleSubmit}>
        {characters.map((char, index) => (
          <div key={index}>
            <p><strong>{char.name}</strong> ({char.role})</p>
            <select
              value={assignments[`player_${index + 1}_id`] || ''}
              onChange={(e) => handleSelect(index, e.target.value)}
              required
            >
              <option value="">-- Select Player --</option>
              {players.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button type="submit" style={{ marginTop: '1rem' }}>
          Confirm Assignment
        </button>
      </form>
    </div>
  );
}

export default AssignComp;