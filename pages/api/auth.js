// pages/api/auth.js
import { Buffer } from 'node:buffer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const credentials = `${clientId}:${clientSecret}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials', 
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Spotify API Error:', data);
        return res.status(response.status).json({ error: 'Failed to retrieve access token' });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error('Fetch Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
