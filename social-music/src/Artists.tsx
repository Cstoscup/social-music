import React, { useState, useEffect } from 'react';
import ArtistCards from './ArtistCards';

function Artists(props: any) {
  const [searchTerm, setSearchTerm] = useState<string | null>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    setSearchTerm(name);
    props.getAuthorized(props.searchArtists, name);
  }, []);

  return (
    <div>
      <h3>Artists matching '{searchTerm}'</h3>
      <div className="artist-cards">
        <ArtistCards setArtistResults={props.setArtistResults} getAuthorized={props.getAuthorized} searchArtistAlbums={props.searchArtistAlbums} artistResults={props.artistResults} setArtist={props.setArtist} />
      </div>
    </div>

  )
}

export default Artists