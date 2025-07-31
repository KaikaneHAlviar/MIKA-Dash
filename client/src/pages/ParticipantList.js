import { useEffect, useState } from 'react';

function ParticipantList() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetch('/api/participants') // this endpoint will be created in backend later
      .then((res) => res.json())
      .then((data) => setParticipants(data))
      .catch((err) => console.error('Failed to fetch participants', err));
  }, []);

  return (
    <div>
      <h2>Participant List</h2>
      <ul>
        {participants.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantList;