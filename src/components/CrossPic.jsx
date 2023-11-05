import "../style/CrossPic.css"
import { useListenForState } from "./Context"
import CloseIcon from '@mui/icons-material/Close';
import YouTube from "react-youtube";
import NorthWestIcon from '@mui/icons-material/NorthWest';
import { useRef } from "react";
const CrossPic=()=>{
    const {playerRef,volume,SetVolume,setVideo_Duration,video_Duration,opts,FrameOpen,IsFrameOpen,chooseV,picOpen,isPicOpen}=useListenForState()
     
    
    function closeBtn(){
        isPicOpen(false)
        setVideo_Duration(0)
    }
    function BackToVFloat(){
        
        if(playerRef.current){//檢查是否回傳
            const player=playerRef.current.internalPlayer;
            player.getCurrentTime().then(nowTime=>{
                setVideo_Duration(nowTime)
            })
            isPicOpen(false)
            IsFrameOpen(true)
             
    }}
    
    const Onready=(event)=>{
         
        if(playerRef.current){//檢查是否回傳
            const player=playerRef.current.internalPlayer;
            console.log(player.seekTo())
            player.setVolume(volume)
            player.seekTo(video_Duration,true)
            
        }
    }
     
    return <div className="container_pic">
        <div className="nav_pic"><NorthWestIcon className="BackToVFloat" onClick={BackToVFloat}/><CloseIcon onClick={closeBtn} className="closeBtn_pic"/></div>
        <div className="video_pic" >
            <YouTube 
                videoId={chooseV.videoId} 
                opts={opts}
                onReady={Onready}
                ref={playerRef}
                

              />
        </div>
        <div className="title_pic">
            <div className="titleName_pic">{chooseV.VideoTitle}</div> 
            <div className="titleChName"> {chooseV.ChannelTitle}</div>
        </div>
    </div>
}
export default CrossPic