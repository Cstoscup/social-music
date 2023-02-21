import React from 'react';
import './App.css'

function ArtistCards(props: any) {
  const artists = props.artistResults;

  const handleClick = (event: any, id: string) => {
    event.preventDefault();
    props.setArtistResults([]);
    props.getAuthorized(props.searchArtistAlbums, id);
  }

  const formatFollowers =  (count: number) => {
    var formatted: string = "";
    var countStr: string = count.toString();
    var letterCount: number = 0;
    for (var i = countStr.length - 1; i >= 0; i--) {
      letterCount += 1;
      if (countStr.length > 3 && i !== 0 && letterCount % 3 === 0) {
        formatted = ',' + countStr[i] + formatted;
      } else {
        formatted = countStr[i] + formatted;
      }
    }

    return formatted;
  }

  return (
    artists.map((artist: any, index: number) => {
      if (artist.images.length > 0) {
        return (
          <div className='artist-card' key={index} onClick={(e) => { handleClick(e, artist.id) }}>
            <img className='artist-image' src={artist.images[0].url} alt="" />
            <div>{artist.name}</div>
            <div>{artist.genres.join(", ")}</div>
            <div>{formatFollowers(artist.followers.total)} followers</div>
          </div>
        )
      }
    })
  )

}

export default ArtistCards