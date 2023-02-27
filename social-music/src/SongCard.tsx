import React, { useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

function SongCard(props: any) {
  const [playSong, setPlaySong] = useState(false);

  return (
    <div>
      <div onClick={() => {setPlaySong(prev => !prev)}}>{props.song.name}</div>
      { playSong ? <SpotifyPlayer token={props.token} uris={[props.song.uri]} />: null}
    </div>

  )
}

export default SongCard