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
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.interests?.join(', ')}</td>
              <td>{p.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParticipantList;