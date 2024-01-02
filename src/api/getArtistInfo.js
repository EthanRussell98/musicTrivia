
class getArtistInfo {
    static getData(token, artistName, handleArtistInfo) {    
        let tracks = [];   
       const _getID = (async function() {
        const result = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1&offset=0` ,{
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
            });
            const data = await result.json();
            let imgURL = data.artists.items[0].images[0].url
            let artistID = data.artists.items[0].id
            _getAlbums(artistID, imgURL)
       })(); 

       const _getAlbums = async (artistID, imageURL) => {
        const result = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?&limit=20&offset=0` ,{
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
        });
        const data = await result.json();
        let albumIDs = [];
        data.items.forEach(e => {
            albumIDs.push(e.id)
        });
        albumIDs.forEach((e,a)=>{
            _getTracks(e, imageURL, albumIDs.length-1, a)
        })
        }

        const _getTracks = async (albumId, imageURL, numAlbums, curIndex) => {
            const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=30` ,{
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
            });
            const data = await result.json();
            const bannedWords = ['Skit', 'Live', 'Instrumental', 'Acapella']
            data.items.forEach(e => {
                if(!tracks.includes(e.name) && !bannedWords.some(word=> e.name.includes(word))){
                    tracks.push(e.name)
                }
            });
            
            if (numAlbums === curIndex){
                console.log(tracks)
                handleArtistInfo(imageURL, tracks)
            }
        }
   }
 }
 export default getArtistInfo;