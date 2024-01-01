import './App.scss';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import generateSpotifyToken from './api/generateSpotifyToken';
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

  return (
    <div className="App">
     <SearchBar token={token}></SearchBar>
    </div>
  );
}

export default App;
