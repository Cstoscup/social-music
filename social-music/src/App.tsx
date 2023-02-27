import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import {Buffer} from 'buffer';
import './App.css';
import Artists from './Artists';
import Albums from './Albums';
import Songs from './Songs';
import Search from './Search';
import { Routes, Route, useNavigate } from "react-router-dom"

function App() {
  const [artist, setArtist] = useState<string>('');
  const [artistResults, setArtistResults] = useState([]);
  const [albumResults, setAlbumResults] = useState([]);
  const [songResults, setSongResults] = useState([]);
  const [token, setToken] = useState('');

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    axios.post('http://localhost:3001/login', { code })
      .then((response) => {
        setToken(response.data.accessToken);
      })
  }, []);

  type SearchFunction = (token: string, id: string) => void;

  const getAuthorized = (search: SearchFunction, id: string) => {
    console.log('TOKEN: ', token);
    search(token, id);
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

  const searchAlbumSongs = (token: string, id: string) => {
    axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response);
        setSongResults(response.data.items);
      })
  }

  const navigate = useNavigate();

  return (
    <div className="App">
      <h1 className='title' onClick={() => { navigate('/'); }}>Top Grooves</h1>
      <a href={AUTH_URL}>Login With Spotify</a>
      <Routes>
        <Route path="/" element={<Search token={token} setArtist={setArtist} getAuthorized={getAuthorized} searchArtists={searchArtists} />} />
        <Route path="/artist" element={<Artists token={token} setToken={setToken} getAuthorized={getAuthorized} searchArtists={searchArtists} artistResults={artistResults} setArtistResults={setArtistResults} setArtist={setArtist} />} />
        <Route path="/albums" element={<Albums token={token} setToken={setToken} getAuthorized={getAuthorized} searchArtistAlbums={searchArtistAlbums} albumResults={albumResults} setAlbumResults={setAlbumResults} />} />
        <Route path="/songs" element={<Songs token={token} setToken={setToken} getAuthorized={getAuthorized} searchAlbumSongs={searchAlbumSongs} songResults={songResults} setSongResults={setSongResults} />} />
      </Routes>

    </div>
  );
}

export default App;
