import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CompList() {
  const [comps, setComps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8081/character_comps')
      .then(res => res.json())
      .then(data => {
        setComps(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load character comps:', err);
        setLoading(false);
      });
  }, []);

  const handleAssign = (compId) => {
    // User will choose team on the next page
    navigate(`/comps/${compId}/assign/select`);
  };

  if (loading) return <p>Loading comps...</p>;

  return (
    <>
    <div style={{ marginBottom: '1rem' }}>
        <Link to="/comps/create">
            <button>Create New Character Composition</button>
        </Link>
   </div>
    <div>
      <h2>Character Compositions</h2>
      {comps.length === 0 ? (
        <p>No comps available.</p>
      ) : (
        <ul>
          {comps.map(comp => (
            <li key={comp.id}>
              <h3>{comp.name}</h3>
              <ul>
                {comp.characters.map((char, index) => (
                  <li key={index}>
                    {char.name} ({char.role})
                  </li>
                ))}
              </ul>
              <button onClick={() => handleAssign(comp.id)}>
                Assign to Team
              </button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
}

export default CompList;