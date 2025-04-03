import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTeam() {
    const [teamName, setTeamName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8081/teams", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ team_name: teamName }),
        })

        .then(res => {
            if (!res.ok){
                throw new Error('Failed to create team')
            }
            return res.json();
        })
        .then(() => {
            navigate('/teams')
        })
        .catch(err => {
            console.log(err);
            setError('Could not create team')
        });
    };

    return (
        <div>
            <h2>Create a New Team</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="teamName">Team Name</label>
                <input
                    id="teamName"
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                />
                <button type="submit">Create</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
  }
  
  export default CreateTeam;