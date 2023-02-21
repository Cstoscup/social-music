import React, { useState, useEffect } from 'react';
import ArtistCards from './ArtistCards';

function Artists(props: any) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    props.getAuthorized(props.searchArtists, name);
  }, []);

  return (
    <div className="artist-cards">
      <ArtistCards setArtistResults={props.setArtistResults} getAuthorized={props.getAuthorized} searchArtistAlbums={props.searchArtistAlbums} artistResults={props.artistResults} />
    </div>
  )
}

export default Artists