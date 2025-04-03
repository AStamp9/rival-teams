import { useState } from 'react';
import { useGlobalContext } from '../../components/GlobalContext';
import { useNavigate } from 'react-router-dom';

function CreateComp() {
  const { characters } = useGlobalContext();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [selectedCharacters, setSelectedCharacters] = useState([
    '', '', '', '', '', ''
  ]);
  const [error, setError] = useState(null);

  const handleCharacterChange = (index, value) => {
    const updated = [...selectedCharacters];
    updated[index] = parseInt(value);
    setSelectedCharacters(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const hasDuplicates = new Set(selectedCharacters).size !== selectedCharacters.length;
    if (hasDuplicates) {
      setError('Duplicate characters are not allowed in the same comp.');
      return;
    }

    const [c1, c2, c3, c4, c5, c6] = selectedCharacters;

    fetch('http://localhost:8081/character_comps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        character_1_id: c1,
        character_2_id: c2,
        character_3_id: c3,
        character_4_id: c4,
        character_5_id: c5,
        character_6_id: c6,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          navigate('/comps');
        } else {
          throw new Error('Failed to create composition');
        }
      })
      .catch(err => {
        console.error('Error creating comp:', err);
        setError('Something went wrong creating the comp.');
      });
  };

  return (
    <div>
      <h2>Create Character Composition</h2>
      <form onSubmit={handleSubmit}>
        <label>Name of Composition:</label><br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

        {selectedCharacters.map((charId, index) => (
          <div key={index}>
            <label>Character {index + 1}</label><br />
            <select
              value={charId}
              onChange={(e) => handleCharacterChange(index, e.target.value)}
              required
            >
              <option value="">-- Select a character --</option>
              {characters.map(char => (
                <option key={char.id} value={char.id}>
                  {char.name} ({char.role})
                </option>
              ))}
            </select><br /><br />
          </div>
        ))}

        <button type="submit">Create Comp</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default CreateComp;
