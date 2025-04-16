
export default async function handler(req, res) {
    const clientId = process.env.SPOTIFY_CLIENT_ID!
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!
  
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: 'grant_type=client_credentials',
    })
  
    const data = await response.json()
    res.status(200).json(data)
  }
  