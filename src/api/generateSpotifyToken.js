
class generateSpotifyToken {
    static getToken(callback) { 
     const clientID = 'dd4a3fb7db6543ceb9bb207ac9050c58';
     const clientSecret = '5b2a9cdb448744cf8204fe3cad43d9e1';
     (async function() {
             const result = await fetch('https://accounts.spotify.com/api/token',{
                 method: 'POST',
                 headers:{
                     'Content-type' : 'application/x-www-form-urlencoded',
                     'Authorization' : 'Basic ' + btoa(clientID + ':' + clientSecret)
                 },
                 body: 'grant_type=client_credentials'
             });
 
             const data = await result.json()
             callback(data.access_token)
         })();
   }
 }
 export default generateSpotifyToken;