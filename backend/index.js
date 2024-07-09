const express = require('express');
const fs = require('fs').promises; // Use fs.promises for async/await support
const cors = require('cors');

const app = express();
app.use(cors());

async function getListings() {
  const data = await fs.readFile('listings.json', 'utf8');
  return JSON.parse(data);
}

app.get('/api/listings', async (req, res) => {
  try {
    const listings = await getListings();
    res.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).send('Error fetching listings');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});