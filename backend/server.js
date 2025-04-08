const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // optional, for public assets

// Simulated login
app.post('/api/stalker-login', (req, res) => {
  const { portalUrl, mac } = req.body;

  if (!portalUrl || !mac) {
    return res.status(400).json({ success: false, message: 'Missing portal URL or MAC' });
  }

  // Fake login token
  return res.json({ success: true, token: 'demo_token_123' });
});

// Dummy channel list
app.get('/api/channels', (req, res) => {
  const channels = [
    {
      name: "News Channel",
      stream_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      thumb: "https://via.placeholder.com/300x140?text=News"
    },
    {
      name: "Sports HD",
      stream_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      thumb: "https://via.placeholder.com/300x140?text=Sports"
    },
    {
      name: "Movies 24",
      stream_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      thumb: "https://via.placeholder.com/300x140?text=Movies"
    }
  ];

  res.json(channels);
});

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
