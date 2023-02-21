import React from 'react'

function Search(props: any) {
  return (
    <form method='get' action='/artist'>
      <label htmlFor="artist">Search for an artist: </label>
      <input id="artist" type="text" name='name' />
      <input type="submit" value="Search" />
  </form>
  )
}

export default Search