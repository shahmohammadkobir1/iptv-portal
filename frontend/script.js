// ⚠️ Replace this with your Glitch backend URL
const BACKEND_URL = 'https://YOUR-BACKEND.glitch.me';

// For index.html
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const portalUrl = document.getElementById('portalUrl').value;
    const mac = document.getElementById('mac').value;

    const res = await fetch(`${BACKEND_URL}/api/stalker-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ portalUrl, mac })
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem('token', data.token); // optional
      window.location.href = 'channels.html';
    } else {
      alert("Login failed");
    }
  });
}

// For channels.html
if (document.getElementById('channelGrid')) {
  fetch(`${BACKEND_URL}/api/channels`)
    .then(res => res.json())
    .then(channels => {
      const grid = document.getElementById('channelGrid');
      channels.forEach(c => {
        const card = document.createElement('div');
        card.className = 'channel-card';
        card.innerHTML = `
          <div class="channel-thumb" style="background-image:url('${c.thumb}')"></div>
          <div class="channel-name">${c.name}</div>
          <button class="play-btn" onclick="window.open('${c.stream_url}')">Play</button>
        `;
        grid.appendChild(card);
      });
    });
}
