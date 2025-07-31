import { useState } from 'react';

function AddParticipantForm({ onParticipantAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    interests: '',
    contact: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      age: parseInt(formData.age),
      interests: formData.interests.split(',').map((s) => s.trim())
    };

    try {
      const res = await fetch('/api/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to add participant');

      const newParticipant = await res.json();
      onParticipantAdded(newParticipant);

      setFormData({ name: '', age: '', interests: '', contact: '' });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Add New Participant</h3>
      <div>
        <label>Name: </label>
        <input name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Age: </label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
      </div>
      <div>
        <label>Interests (comma-separated): </label>
        <input name="interests" value={formData.interests} onChange={handleChange} />
      </div>
      <div>
        <label>Contact: </label>
        <input name="contact" value={formData.contact} onChange={handleChange} />
      </div>
      <button type="submit">Add Participant</button>
    </form>
  );
}

export default AddParticipantForm;