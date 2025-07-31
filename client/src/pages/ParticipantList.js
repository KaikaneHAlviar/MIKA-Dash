import { useEffect, useState } from 'react';
import AddParticipantForm from '../components/AddParticipantForm';

function ParticipantList() {
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState(null);

  const fetchParticipants = () => {
    fetch('/api/participants')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => setParticipants(data))
      .catch((err) => setError(err.message));
  };

  const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this participant?')) return;

  try {
    const res = await fetch(`/api/participants/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) throw new Error('Failed to delete participant');

    setParticipants((prev) => prev.filter((p) => p.id !== id));
  } catch (err) {
    alert(err.message);
  }
};

const updateField = (id, field, value) => {
  setParticipants((prev) =>
    prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
  );
};

const saveUpdates = async (participant) => {
  try {
    const res = await fetch(`/api/participants/${participant.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(participant)
    });

    if (!res.ok) throw new Error('Failed to update participant');

  } catch (err) {
    alert(err.message);
  }
};

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleNewParticipant = (newParticipant) => {
    setParticipants((prev) => [...prev, newParticipant]);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Participant List</h2>

      <AddParticipantForm onParticipantAdded={handleNewParticipant} />

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <table border="1" cellPadding="8" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Interests</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr key={p.id}>
            <td>
                <input
                value={p.name}
                onChange={(e) => updateField(p.id, 'name', e.target.value)}
                />
            </td>
            <td>
                <input
                type="number"
                value={p.age}
                onChange={(e) => updateField(p.id, 'age', parseInt(e.target.value))}
                />
            </td>
            <td>
                <input
                value={p.interests.join(', ')}
                onChange={(e) =>
                    updateField(p.id, 'interests', e.target.value.split(',').map((s) => s.trim()))
                }
                />
            </td>
            <td>
                <input
                value={p.contact}
                onChange={(e) => updateField(p.id, 'contact', e.target.value)}
                />
            </td>
            <td>
                <button onClick={() => saveUpdates(p)}>Save</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParticipantList;