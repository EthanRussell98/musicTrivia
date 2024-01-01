import '../css/SearchBar.scss'
import Spotify from '../api/Spotify'
import React, { useState } from 'react'
function SearchBar(props) {
  const { token } = props;
  // recieve list of artists from spotify api
  const [recievedArtists, setArtists] = useState(null);
  const handleRecievedArtists = (data) => {
    setArtists(data);
  }
  const [inputVal, setInputVal] = useState('')
  // handle value of input box
  let inputValue = ''
  const handleInputChange = (e) =>{
    inputValue = e.target.value;
    Spotify.getData(inputValue, handleRecievedArtists, token);
    setInputVal(inputValue)
  }
  return (
    <div id='searchBar'>
        <input value={inputVal} type="text" name="myInput" placeholder="Search for Artists.." onChange={handleInputChange}></input>
        {recievedArtists != (null)  ? <ul id="myUL">
          <li onClick={()=>{setInputVal(recievedArtists[0]); setArtists(null)}}>{recievedArtists[0]}</li>
          <li onClick={()=>{setInputVal(recievedArtists[1]); setArtists(null)}}>{recievedArtists[1]}</li>
          <li onClick={()=>{setInputVal(recievedArtists[2]); setArtists(null)}}>{recievedArtists[2]}</li>
          <li onClick={()=>{setInputVal(recievedArtists[3]); setArtists(null)}}>{recievedArtists[3]}</li>
          <li onClick={()=>{setInputVal(recievedArtists[4]); setArtists(null)}}>{recievedArtists[4]}</li>
        </ul> :<ul id="myUL"></ul>}
    </div>
  )
}

export default SearchBar