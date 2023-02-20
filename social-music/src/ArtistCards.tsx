import React from 'react';
import './App.css'

function ArtistCards(props: any) {
  const artists = props.artistResults;

  const handleClick = (event: any, id: string) => {
    event.preventDefault();
    props.setArtistResults([]);
    props.getAuthorized(props.searchArtistAlbums, id);
  }

  return (
    artists.map((artist: any, index: number) => {
      if (artist.images.length > 0) {
        return (
          <div className='artist-card' key={index} onClick={(e) => { handleClick(e, artist.id) }}>
            <img className='artist-image' src={artist.images[0].url} alt="" />
            <div>{artist.name}</div>
            <div>{artist.genres.join(", ")}</div>
            <div>Followers: {artist.followers.total}</div>
          </div>
        )
      }
    })
  )

}

export default ArtistCards