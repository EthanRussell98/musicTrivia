import '../css/SearchBar.scss'
import Spotify from '../api/Spotify'
import React, { useState, useEffect } from 'react'
function SearchBar(props) {
  const { token, handleArtistSelected } = props;
  // recieve list of artists from spotify api
  const [recievedArtists, setArtists] = useState(null);
  const handleRecievedArtists = (data) => {
    setArtists(data);
  }
  const [inputVal, setInputVal] = useState('')
  // handle value of input box
  let inputValue = ''
  const handleInputChange = (e) =>{
    setArtistSelected(false)
    inputValue = e.target.value;
    if(/^[a-zA-Z0-9\s]+$/.test(inputValue) || inputValue === ''){
      Spotify.getData(inputValue, handleRecievedArtists, token);
      setInputVal(inputValue)
    }
    else alert("Please use only valid characters. Use letters, numbers, and spaces only.");
  }
  const handleKeyDown = (e) =>{
    if(e.key === 'Enter' && artistSelected === false){
      setInputVal(recievedArtists[0]);
      setArtists(null);
      setArtistSelected(true);
    }
  }
  const [artistSelected, setArtistSelected] = useState(false);
  useEffect(()=>{
    if(artistSelected === true){
      handleArtistSelected(artistSelected, inputVal)
    }
    
  }, [artistSelected, handleArtistSelected, inputVal])
  
  return (
    <div id='searchBar'>
        <input value={inputVal} type="text"  name="myInput" placeholder="Search for Artists.." onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
        {recievedArtists != (null)  ? <ul id="myUL">
          <li onClick={()=>{setInputVal(recievedArtists[0]); setArtists(null); setArtistSelected(true)}}>{recievedArtists[0]}</li>
          <li onClick={()=>{setInputVal(recievedArtists[1]); setArtists(null); setArtistSelected(true)}}>{recievedArtists[1]}</li>
          <li onClick={()=>{setInputVal(recievedArtists[2]); setArtists(null); setArtistSelected(true)}}>{recievedArtists[2]}</li>
          <li onClick={()=>{setInputVal(recievedArtists[3]); setArtists(null); setArtistSelected(true)}}>{recievedArtists[3]}</li>
          <li onClick={()=>{setInputVal(recievedArtists[4]); setArtists(null); setArtistSelected(true)}}>{recievedArtists[4]}</li>
        </ul> :<ul id="myUL"></ul>}
    </div>
  )
}

export default SearchBar