const express = require('express');
const router = express.Router();

// Temporary mock data
const mockParticipants = [
  {
    id: 1,
    name: 'Kaleo Maka',
    age: 12,
    interests: ['Language', 'Music'],
    contact: 'kaleo@example.com'
  },
  {
    id: 2,
    name: 'Leilani Keawe',
    age: 10,
    interests: ['Culture', 'Dance'],
    contact: 'leilani@example.com'
  },
  {
    id: 3,
    name: 'Nohea Akana',
    age: 13,
    interests: ['History', 'Chant'],
    contact: 'nohea@example.com'
  }
];

router.post('/', (req, res) => {
  const { name, age, interests, contact } = req.body;

  const newParticipant = {
    id: Date.now(), // use DB ID later
    name,
    age,
    interests,
    contact
  };

  mockParticipants.push(newParticipant); // temporary in-memory storage

  res.status(201).json(newParticipant);
});

router.get('/', (req, res) => {
  res.json(mockParticipants);
});

module.exports = router;