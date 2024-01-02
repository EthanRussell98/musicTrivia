import { useState } from 'react';
import icon from '../images/anon.png'
import '../css/Controls.scss'
import pause from '../images/pause-solid.svg'
function Controls(props) {
    const { artistName, imageURL, trackList } = props;
 const [volume, setVolume] = useState(25)
 const handleVolume = (e) =>{
    setVolume(e.target.value)
 }
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
                <h2>{trackList === null ? 0 : trackList.length}</h2>
            </div>
            
        </div>
        <div className='controls'>
            <div className='volumeSlider'>
                <input type="range" min="0" max="100" className='slider' value={volume} onChange={handleVolume}/>
                <div className='fill' style={{width: volume+'%'}}></div>
            </div>
            <div className='buttons'>
                <button><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg></button>
            </div>
        </div>
    </div>
  )
}

export default Controls