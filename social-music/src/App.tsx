import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [song, setSong] = useState('');

  useEffect(() => {
    console.log(process.env.CLIENT_ID);
  }, [])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setSong(event.target.value);
  }

  function handleClick(event: React.SyntheticEvent<EventTarget>) {
    event.preventDefault();
    console.log(song);
  }

  return (
    <div className="App">
      <h1>Top Grooves</h1>
      <form onSubmit={handleClick}>
        <label htmlFor="song">Search for a song: </label>
        <input id="song" type="text" onChange={handleChange} />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}

export default App;
