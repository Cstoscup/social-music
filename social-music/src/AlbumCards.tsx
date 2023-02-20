import React from 'react';
import AlbumCard from './AlbumCard';

function AlbumCards(props: any) {
  const albums = props.albumResults;
  return (
    albums.map((album: any, index: number) => {
      return <AlbumCard album={album} index={index} />
    })
  )
}

export default AlbumCards