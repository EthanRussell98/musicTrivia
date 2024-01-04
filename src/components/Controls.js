import { useState, useEffect } from 'react';
import icon from '../images/anon.png'
import '../css/Controls.scss'
import YouTube from 'react-youtube';
function Controls({ artistName, imageURL, trackList, numOfTracks, ytURL }) {

    //volume
    const [volume, setVolume] = useState(25)
    const handleVolume = (e) =>{
        setVolume(e.target.value)
        if(ytp!==null){
            ytp.target.setVolume(volume)
        }
    }
    //handle tracklist
   
    //handle play/pause
    const [btnPause, setBtnPause] = useState(false)
    const handleBtnPause = () =>{
        if(ytp !== null){
            btnPause ? ytp.target.pauseVideo() : ytp.target.playVideo()
        }
    }
    
    const [ytp, setYtp] = useState(null)
    const handlePlayPause = () =>{
        setBtnPause(!btnPause)
    }
    useEffect(()=>{
        if(ytURL!==null && btnPause === true){
            setBtnPause(false)
        }
    }, [ytURL])
 
  return (
    <div className='ControlsContainer'>
        <div className='artistInfo'>
            <img src={imageURL === null ? icon : imageURL} alt='anon user'/>
            <div className='artistName'>
                <h5>Artist Name:</h5>
                <h2>{artistName}</h2>
            </div>
            <div className='numTracks'>
                <h5>Tracks:</h5>
                <h2>{numOfTracks === null ? 0 : numOfTracks}</h2>
            </div>
            
        </div>
        <div className='controls'>
            <div className='volumeSlider'>
                <input type="range" step='1' min="-1" max="100" className='slider' value={volume} onChange={handleVolume}/>
                <div className='fill' style={{width: volume+'%'}}></div>
            </div>
            <div className='buttons'>
                {btnPause ? 
                    <button onClick={handleBtnPause}><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg></button> :
                    <button onClick={handleBtnPause}><svg className='svgPlay' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg></button>
                }
                <button><svg svg className='svgSkip' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"/></svg></button>
                <button><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></button>
            </div>
        </div>
        <YouTube className='ytPlayer' videoId={ytURL} opts={{height: '0', width: '0', playerVars: {autoplay: 1,}}} onPause={handlePlayPause} onPlay={handlePlayPause} onReady={(e)=>{setYtp(e); e.target.setVolume(volume);}}/>    
    </div>
    
  )
}

export default Controls