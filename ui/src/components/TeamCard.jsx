import { useNavigate } from 'react-router-dom';

function TeamCard({ team, onDelete }) {
    const navigate = useNavigate()

    return (
      <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
        <h3>{team.team_name}</h3>
        <div>
          <button onClick={() => navigate(`/teams/${team.id}`)}>View</button>
          <button onClick={() => navigate(`/teams/${team.id}/edit`)}>Edit</button>
          <button onClick={() => onDelete(team.id)}>Delete</button>
        </div>
      </div>
    );
  }
  
  export default TeamCard;