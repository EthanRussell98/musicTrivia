
class getYouTubeURL {
    static getData(artist, songname, callback, answers) { 
        const ytKey = 'AIzaSyCAF2FkHJeh-dvCgsfyWCdtiI2O0LDTuUQ';
         (async function(){
            fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${artist + ' ' + songname}&videoEmbeddable=true&type=video&key=${ytKey}`)
            .then(res => res.json())
            .then(data => {callback(data.items[0].id.videoId, answers)})
        })();
   }
 }
 export default getYouTubeURL;