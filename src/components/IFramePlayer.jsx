import { useState,useEffect ,React} from "react"
import "../style/videoFloat.css"
import YouTube from 'react-youtube';
import YouTube from "react-youtube"

class VideoPlayer extends React.Component {
    render() {
      const opts={

        playerVars:{
            autoplay:1,
            rel:0,
            controls:0,
            enablejsapi:1,
            
        },
        event:{
            'onPlay': onplay,
            'onPause': onpause,
        }
    }
  
      return <>         
        <YouTube 
            videoId={chooseV.videoId} 
            opts={opts} 
            iframeClassName="react-player" 
            onPlay={ onplay } 
            onPause={ onpause} 
        />
     </>
}
const VideoFloat=( )=>{
    const {FrameOpen,IsFrameOpen,chooseV,SetchooseV}=usePageChageActive()
    const [playPause,IsplayPause]=useState(true)
    const CloseBtn=()=>{
        IsFrameOpen(false)
    }
 
    
        onplay=(event)=>{
            IsplayPause(true) 
            event.target.playVideo();
            console.log("播放中")
        }
    
        onpause = (event) => {
            IsplayPause(false) 
            event.target.stopVideo()
            console.log("暫停中")
       };
    
 
    const onPlayerReady = (event) => {
        
    };
    
    
    
 
     
   
}
export default VideoPlayer