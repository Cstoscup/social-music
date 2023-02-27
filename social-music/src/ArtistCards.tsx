import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'

function ArtistCards(props: any) {
  const artists = props.artistResults;
  const navigate = useNavigate();

  const handleClick = (event: any, artist: any) => {
    event.preventDefault();
    navigate(`/albums?id=${artist.id}&name=${artist.name}&token=${props.token}`);
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
          <div className='artist-card' key={index} onClick={(e) => { handleClick(e, artist) }}>
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