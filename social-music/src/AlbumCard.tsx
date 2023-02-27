import React from 'react'
import { useNavigate } from 'react-router-dom';

function AlbumCard(props: any) {
  let index = props.index;
  let album = props.album;
  const navigate = useNavigate();

  const handleClick = (event: any, album: any) => {
    event.preventDefault();
    navigate(`/songs?id=${album.id}&name=${album.name}&token=${props.token}`);
  }

  return (
    <div onClick={(e) => { handleClick(e, album) }} key={index}>
    <img src={album.images[1].url} alt="" />
    <div>
      <div className='album-name'>{album.name}</div>
      <div>{album.release_date}</div>
      <div>{album.total_tracks}</div>
      {album.artists.map((artist: any, index: number) => {
        return (
          <div key={index}>{artist.name}</div>
        )
      })}
    </div>
  </div>
  )
}

export default AlbumCard