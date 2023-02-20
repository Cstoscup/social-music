import React from 'react'

function AlbumCard(props: any) {
  let index = props.index;
  let album = props.album;
  return (
    <div key={index}>
    <img src={album.images[1].url} alt="" />
    <div>
      <div>{album.name}</div>
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