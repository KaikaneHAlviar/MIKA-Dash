const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'MIKA Dashboard Backend is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});