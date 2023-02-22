import React from 'react'

function SongCard(props: any) {
  console.log(props.song);
  return (
    <div>{props.song.name}</div>
  )
}

export default SongCard