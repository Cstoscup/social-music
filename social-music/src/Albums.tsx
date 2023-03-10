import React, { useState, useEffect } from 'react'
import AlbumCards from './AlbumCards';

function Albums(props: any) {
  const [namePos, setNamePos] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const name = params.get('name');
    const tokenURL = params.get('token');
    props.setToken(tokenURL);
    if (name !== null) {
      if (name[name.length - 1] === 's') {
        setNamePos(name + "'");
      } else {
        setNamePos(name + "'s");
      }
    }

    props.searchArtistAlbums(tokenURL, id);
  }, []);

  return (
    <div>
      <h3>{namePos} Albums</h3>
      <div className="album-cards">
        <AlbumCards token={props.token} albumResults={props.albumResults} />
      </div>
    </div>
  )
}

export default Albums