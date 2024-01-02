import './App.scss';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import generateSpotifyToken from './api/generateSpotifyToken';
import Controls from './components/Controls';
import getArtistInfo from './api/getArtistInfo';
function App() {
  const [token, setToken] = useState(null)
  const handleToken = (data) => {
    setToken(data);
  }
  useEffect(() => {
    // Generate token
    generateSpotifyToken.getToken(handleToken);
    // Refresh the token every 50 minutes
    const refreshTokenInterval = setInterval(() => {
      generateSpotifyToken.getToken(handleToken);
    }, 1000 * 60 * 50);

    
    return () => clearInterval(refreshTokenInterval);
  }, []); 
  const [artistName, setArtistName] = useState(null)
  const [artistSelected, setArtistSelected] = useState(false)
  const handleArtistSelected = (data, artist) =>{
    setArtistSelected(data)
    setArtistName(artist)
    if(artistName !== artist){
      getArtistInfo.getData(token, artist, handleArtistInfo)
    }
    
  }
  const [imageURL, setImageURL] = useState(null)
  const [trackList, setTrackList] = useState(null)
  const handleArtistInfo = (image, tracks) =>{
    setImageURL(image)
    setTrackList(tracks)
  }
  return (
    <div className="App">
      <div className='navBar'>
        <SearchBar token={token} handleArtistSelected={handleArtistSelected}></SearchBar>
      </div>
      <div className='controlsContainer'>
        <Controls artistName={artistName} imageURL={imageURL} trackList={trackList}></Controls>
      </div>
      <div className='gameContainer'>
        {artistSelected && <button>Start</button>}
      </div>
    </div>
  );
}

export default App;
