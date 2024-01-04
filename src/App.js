import './App.scss';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import generateSpotifyToken from './api/generateSpotifyToken';
import Controls from './components/Controls';
import getArtistInfo from './api/getArtistInfo';
import getYouTubeURL from './api/getYouTubeURL';
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
  //to pass to controls
  const [ytURL, setytURL] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const [trackList, setTrackList] = useState(null)
  const [numOfTracks, setNumOfTracks] = useState(null)
  const handleArtistInfo = (image, tracks) =>{
    setImageURL(image)
    setTrackList(tracks)
    setNumOfTracks(tracks.length)
  }
 
  
  const [randomTracks, setRandomTracks] = useState(null)
  const handleStartGame = () =>{
    if(trackList!== null){
      let tempRandomTracks = []
      let randomSongIndex = []
      for(let x=0;x<4;x++){
        let randomNum = Math.floor(Math.random() * trackList.length)
        if(randomSongIndex.includes(randomNum)){
          x--;
          continue;
        }
        else{
          randomSongIndex.push(randomNum)
          tempRandomTracks.push(trackList[randomNum])
        }
      }
      setRandomTracks(tempRandomTracks)
      getYouTubeURL.getData(artistName, tempRandomTracks[0], youTubeCallback)
    }
  }
  const youTubeCallback = (videoURL) =>{
    setytURL(videoURL)
  }
  return (
    <div className="App">
      <div className='navBar'>
        <SearchBar token={token} handleArtistSelected={handleArtistSelected}></SearchBar>
      </div>
      <div className='controlsContainer'>
        <Controls artistName={artistName} imageURL={imageURL} trackList={trackList} numOfTracks={numOfTracks} ytURL={ytURL}></Controls>
      </div>
      <div className='gameContainer'>
        {artistSelected && <button onClick={handleStartGame}>Start</button>}
      </div>
      {randomTracks && <p>{String(randomTracks)} </p>}
    </div>
  );
}

export default App;
