import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';

function Songs(props: any) {
  const [name, setName] = useState<string | null>("");
  const [testToken, setTestToken] = useState<string | null>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const name = params.get('name');
    const tokenURL = params.get('token');
    setTestToken(tokenURL);
    setName(name);
    props.searchAlbumSongs(tokenURL, id);
  }, [])

  return (
    <div>
      <h3>{name}</h3>
      <div className='song-cards'>
        {props.songResults.map((song: any, index: number) => {
          return (
            <SongCard song={song} key={index} token={testToken} />
          )
        })}
      </div>
    </div>

  )
}

export default Songs