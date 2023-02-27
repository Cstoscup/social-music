import React from 'react'

function Search(props: any) {
  console.log("search token: ", props.token);
  return (
    <form method='get' action='/artist'>
      <label htmlFor="artist">Search for an artist: </label>
      <input id="artist" type="text" name='name' />
      <input type="submit" value="Search" />
      <input type="hidden" name="token" value={props.token} />
  </form>
  )
}

export default Search