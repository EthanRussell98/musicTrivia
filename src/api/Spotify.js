
 class Spotify {
   static getData(query, callback, token) { 
    let artistList = [];
    if(query){
      const _getProfile = (async function() {
        const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=5&offset=0` ,{
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
        });
        const data = await result.json();
        data.artists.items.forEach(element => {
          artistList.push(element.name)
          callback(artistList)
        });
      })();
    }
    else {
      artistList = null;
      callback(artistList)
    }
    
  }
}
export default Spotify;