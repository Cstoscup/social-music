import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import {Buffer} from 'buffer';
import './App.css';
import ArtistCards from './ArtistCards';
import AlbumCards from './AlbumCards';

function App() {
  const [artist, setArtist] = useState('');
  const [artistResults, setArtistResults] = useState([]);
  const [albumResults, setAlbumResults] = useState([]);

  type SearchFunction = (token: string, id: string) => void;

  const getAuthorized = (search: SearchFunction, id: string) => {
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
        search(response.data.access_token, id);
      })
  }

  const searchArtists = (token: string, id: string) => {
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
        setArtistResults(response.data.artists.items);
      })
  }

  const searchArtistAlbums = (token: string, id: string) => {
    axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setAlbumResults(response.data.items);
      })
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setArtist(event.target.value);
  }

  function handleClick(event: React.SyntheticEvent<EventTarget>) {
    event.preventDefault();
    getAuthorized(searchArtists, "");
  }

  return (
    <div className="App">
      <h1>Top Grooves</h1>
      <form onSubmit={handleClick}>
        <label htmlFor="artist">Search for an artist: </label>
        <input id="artist" type="text" onChange={handleChange} />
        <input type="submit" value="Search" />
      </form>
      {artistResults.length > 0 ? <div className="artist-cards">
        <ArtistCards setArtistResults={setArtistResults} getAuthorized={getAuthorized} searchArtistAlbums={searchArtistAlbums} artistResults={artistResults} />
      </div> : null}
      { albumResults.length > 0 ?
        <div>
          <h2>Albums</h2>
          <div className="album-cards">
            <AlbumCards albumResults={albumResults} />
          </div>
        </div>
      : null }
    </div>
  );
}

export default App;
