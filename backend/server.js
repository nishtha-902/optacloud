require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Mock database
let savedAddresses = [];

// Endpoint to save address
app.post('/api/addresses', (req, res) => {
  const { address } = req.body;
  savedAddresses.push(address);
  res.status(201).send({ message: 'Address saved!', address });
});

// Endpoint to fetch addresses
app.get('/api/addresses', (req, res) => {
  res.status(200).send(savedAddresses);
});

// Endpoint to delete address
app.delete('/api/addresses/:id', (req, res) => {
  const { id } = req.params;
  savedAddresses = savedAddresses.filter((_, index) => index !== parseInt(id));
  res.status(200).send({ message: 'Address deleted!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
