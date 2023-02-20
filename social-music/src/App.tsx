import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import {Buffer} from 'buffer';
import './App.css';

function App() {
  const [artist, setArtist] = useState('');
  const [artistResults, setArtistResults] = useState([]);

  const getAuthorized = () => {
    const data = { grant_type: "client_credentials" };
    const options = {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(process.env.REACT_APP_CLIENT_ID + ":" + process.env.REACT_APP_CLIENT_SECRET).toString("base64"),
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(data),
      url: "https://accounts.spotify.com/api/token",
    };
    axios(options)
      .then((response) => {
        searchArtists(response.data.access_token);
      })
  }

  const searchArtists = (token: string) => {
    axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: artist,
        type: "artist"
      }
    })
      .then((response) => {
        console.log(response.data.artists.items);
        setArtistResults(response.data.artists.items);
      })
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setArtist(event.target.value);
  }

  function handleClick(event: React.SyntheticEvent<EventTarget>) {
    event.preventDefault();
    getAuthorized();
  }

  return (
    <div className="App">
      <h1>Top Grooves</h1>
      <form onSubmit={handleClick}>
        <label htmlFor="artist">Search for an artist: </label>
        <input id="artist" type="text" onChange={handleChange} />
        <input type="submit" value="Search" />
      </form>
      {artistResults.length > 0 ? artistResults.map((artist: any) => {
        return (
          <div>
            <div>{artist.name}</div>
            {artist.images.length > 0 ? <img src={artist.images[0].url} alt="" /> : <div>No images</div>}
          </div>
        )
      }) : null}
    </div>
  );
}

export default App;
