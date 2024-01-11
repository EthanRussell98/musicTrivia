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
  const [answer, setAnswer] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)
  const handleStartGame = () =>{
    if(trackList!== null){
      setGameStarted(true)
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
      getYouTubeURL.getData(artistName, tempRandomTracks[0], youTubeCallback, tempRandomTracks)
    }
  }
  const youTubeCallback = (videoURL, options) =>{
    setytURL(videoURL)
    setAnswer(options[0])
    options.sort(() => Math.random() - 0.5);
    console.log(options)
    setRandomTracks(options)
  }
  return (
    <div className="App">
      <div className='navBar'>
        <SearchBar token={token} handleArtistSelected={handleArtistSelected}></SearchBar>
      </div>
      <div className='controlsContainer'>
        <Controls artistName={artistName} imageURL={imageURL} numOfTracks={numOfTracks} ytURL={ytURL}></Controls>
      </div>
      <div className='gameContainer'>
        {randomTracks && <button onClick={()=>{console.log('aa')}} className='btnA optionBtn'>{String(randomTracks[0])} </button>}
        {randomTracks && <button className='btnA optionBtn'>{String(randomTracks[1])} </button>}
        {randomTracks && <button className='btnA optionBtn'>{String(randomTracks[2])} </button>}
        {randomTracks && <button className='btnA optionBtn'>{String(randomTracks[3])} </button>}
        <div className='startBtncontainer'>
          {artistSelected && <button onClick={handleStartGame}>Start</button>}
        </div>
      </div>
      
      
    
    </div>
  );
}

export default App;
