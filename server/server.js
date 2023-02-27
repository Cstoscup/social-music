const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
const port = 3001
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/login', (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000/',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  })
  spotifyApi.authorizationCodeGrant(code).then((data) => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  }).catch((error) => {
    console.log(error);
    res.sendStatus(400);
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})