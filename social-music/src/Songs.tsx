import React, { useState, useEffect } from 'react';
import SongCard from './SongCard';

function Songs(props: any) {
  const [name, setName] = useState<string | null>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const name = params.get('name');
    setName(name);
    props.getAuthorized(props.searchAlbumSongs, id);
  }, [])

  return (
    <div>
      <h3>{name}</h3>
      <div className='song-cards'>
        {props.songResults.map((song: any, index: number) => {
          return (
            <SongCard song={song} key={index} />
          )
        })}
      </div>
    </div>

  )
}

export default Songs