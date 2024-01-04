
class getYouTubeURL {
    static getData(artist, songname, callback) { 
        const ytKey = 'AIzaSyA_uNB6h2UmA1XO3zIl8atidHtjChLXPrc';
         (async function(){
            fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${artist + ' ' + songname}&videoEmbeddable=true&type=video&key=${ytKey}`)
            .then(res => res.json())
            .then(data => {console.log(data.items[0].id.videoId);callback(data.items[0].id.videoId)})
        })();
   }
 }
 export default getYouTubeURL;