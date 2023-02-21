import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import {Buffer} from 'buffer';
import './App.css';
import Artists from './Artists';
import AlbumCards from './AlbumCards';
import Search from './Search';
import { Routes, Route } from "react-router-dom"

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
        console.log(response);
        search(response.data.access_token, id);
      })
  }

  const searchArtists = (token: string, id: string) => {
    axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: id,
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

  return (
    <div className="App">
      <h1>Top Grooves</h1>

      <Routes>
        <Route path="/" element={<Search setArtist={setArtist} getAuthorized={getAuthorized} searchArtists={searchArtists} />} />
        <Route path="/artist" element={<Artists getAuthorized={getAuthorized} searchArtists={searchArtists} artistResults={artistResults} setArtistResults={setArtistResults} setArtist={setArtist} />} />
      </Routes>

      {/* {artistResults.length > 0 ? <div className="artist-cards">
        <ArtistCards setArtistResults={setArtistResults} getAuthorized={getAuthorized} searchArtistAlbums={searchArtistAlbums} artistResults={artistResults} />
      </div> : null}
      { albumResults.length > 0 ?
        <div>
          <h2>Albums</h2>
          <div className="album-cards">
            <AlbumCards albumResults={albumResults} />
          </div>
        </div>
      : null } */}
    </div>
  );
}

export default App;
