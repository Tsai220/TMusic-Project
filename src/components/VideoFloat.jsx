import { useState,useRef ,React} from "react"
import "../style/videoFloat.css"
import { useListenForState } from "./Context"
import YouTube from "react-youtube"
import { Slider } from "@mui/material"
import KeywordComparison from "./lyrics"
import axios from "axios"
 
const VideoFloat=(props )=>{
    const {FrameOpen,IsFrameOpen,chooseV,SetchooseV,searchFor,SetSearchFor }=useListenForState()
    const [loop,IsLoop]=useState(0)
    const [muted,Ismute]=useState(false)
    const [volume,SetVolume]=useState(10)
    const [playPause,IsplayPause]=useState(true)
    const [restart,IsRestart]=useState(false)
    const playerRef=useRef(null)
     
    console.log(chooseV,"asdaw")

    const CloseBtn=()=>{{
        IsFrameOpen(false)
         
    }}
    
    const onEnd=()=>{
        IsRestart(true)
    }
     
    const Onready=(event)=>{
        if(playerRef.current){//檢查是否回傳
            const player=playerRef.current.internalPlayer;
            player.setVolume(10)
            
        }
    }
    const playandpause=(event)=>{
        if(playerRef.current){//檢查是否回傳
            const player=playerRef.current.internalPlayer;

            if(player){//檢查是否回傳
                player.getPlayerState().then(playerstate=>{ //回報為Promise 所以要用then()取得返回值
                    console.log(playerstate)
                    switch (playerstate){
                        case 1://播放中 要求暫停
                            player.pauseVideo(2)
                            IsplayPause(false)
                            break
                        case 2://暫停中 要求繼續
                            player.playVideo(1)
                            IsplayPause(true)
                            break
                        case 0:
                            IsRestart(false)
                            IsplayPause(false)
                            player.seekTo(0)
                            break
                    }
 
                })
                
            }

        }
    }

    
    const VolumeStateIcon=()=>{
        if(playerRef.current){
            const player=playerRef.current.internalPlayer;
            if(player){
                if(muted==false){//當有聲時，按靜音
                    player.mute()
                    SetVolume(0)
                    player.setVolume(0)
                    Ismute(true)
      
                }else if(muted==true){//當無聲時，按開聲
                    player.unMute()
                    SetVolume(10)
                    player.setVolume(10)
                    Ismute(false)
 
                } 
                // else if( 滑條變0)
            }
        }
    }

    const VolumeChange=(now)=>{
        console.log(now,'DFSFSDF')
        if(playerRef.current){
            const player=playerRef.current.internalPlayer;
            if(player){
                if(now>1){
                    Ismute(false)
                    player.unMute()
                    player.setVolume(now)
                }else if(now=1){
                    Ismute(true)
                    player.mute()
                    player.setVolume(null)
                    
                    console.log("MUTE")
                }
                // else if( 滑條變0)
            }
        }
    }
    const forward5=()=>{
        if(playerRef.current){
            const player=playerRef.current.internalPlayer
            if(player){
                player.getCurrentTime().then(nowTime=>{
                    player.seekTo(nowTime+5,true)
                })
            }
        }
    }

    const back5=()=>{
        if(playerRef.current){
            const player=playerRef.current.internalPlayer
            if(player){
                player.getCurrentTime().then(nowTime=>{
                    player.seekTo(nowTime-5,true)
                })
            }
        }
    }

 

    const VideoSpeed=()=>{
        
    }

    onplay=()=>{
        console.log("asda")
        IsplayPause(true)
        IsRestart(false)
    }
    
    onpause = () => {
        IsplayPause(false)
        
    };
     

    const opts={

        playerVars:{
            autoplay:1,
            rel:0,
            controls:0,
            enablejsapi:1,
            loop:loop,
            
        } 
    }
    
    const GetSongAbout=()=>{
        axios.get("https://api.genius.com/search?q={}")
    }
     
    return <>
        {FrameOpen!=false   && 
            
            <div className="video_frame_container" >
    
                <div className="box">
                    <div className="frame_nav">
                        <div className="nav_title_frame"> YouTube - {chooseV.VideoTitle}</div>
                        <button type="button" onClick={CloseBtn} className="close_video_frame"  ><svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></button>
                    </div>
                    <div className="video_frame">
                        <div id="player_container" >
                            <YouTube 
                                videoId={chooseV.videoId} 
                                opts={opts}
                                iframeClassName="react-player" 
                                ref={playerRef}
                                onPlay={onplay}
                                onPause={onpause}
                                onReady={Onready}
                                onEnd={onEnd}
                                onPlaybackRateChange={VideoSpeed}
                                
                                
                            />
                        </div>
                        
                        <div className="Subtitles">
                            <div  style={{fontSize:"1%"}} >
                                傳入歌詞
                                目前誰唱的
                                將搜索欄的詞和結果影片和浮動視窗的物件詞，然後比對是哪首歌
                                <KeywordComparison />
                            </div>
                        </div>
                    </div>
                    
                    <div className="footer" style={{fontSize:"1%"}}>
                        <div className="PlayPause">
                                {!playPause & !restart  && 
                                    <button onClick={playandpause} 
                                        className="playBtn"><svg xmlns="http://www.w3.org/2000/svg" height="80%" viewBox="0 -960 960 960" width="100%" fill="black"><path d="M320-200v-560l440 280-440 280Z"/></svg>
                                    </button>
                                    || playPause & !restart  &&
                                    <button onClick={playandpause} 
                                        className="pauseBtn"><svg xmlns="http://www.w3.org/2000/svg" height="80%" viewBox="0 -960 960 960" width="100%" fill="black"><path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z"/></svg>
                                    </button>
                                    || restart &&
                                    <button onClick={playandpause} 
                                        className="restartBtn"><svg xmlns="http://www.w3.org/2000/svg" height="80%" viewBox="0 -960 960 960" width="80%" fill="black"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z"/></svg>
                                    </button>


                                }
                                 
                                
                        </div>
                        <div className="VolumeControl">
                            {muted && 
                                <svg onClick={VolumeStateIcon} className="volume_btn" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/></svg>
                                || 
                                !muted &&
                                <svg onClick={VolumeStateIcon} className="volume_btn"  xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%"><path d="M200-360v-240h160l200-200v640L360-360H200Zm440 40v-322q45 21 72.5 65t27.5 97q0 53-27.5 96T640-320ZM480-606l-86 86H280v80h114l86 86v-252ZM380-480Z"/></svg>
                                 
                            }
                            
                            <Slider aria-label="Volume" value={volume}   className="volume"  size="small" valueLabelDisplay="auto" 
                                onChange={c=>{SetVolume(c.target.value);  VolumeChange(c.target.value); }} />
                              
                            
                            
                        </div>
                        {/* 快轉10 倒退10 */}
                        
                        <div className="TimeBackGo">
                            
                            <svg className="TimeBack"  onClick={back5} xmlns="http://www.w3.org/2000/svg" height="80%" viewBox="0 -960 960 960" width="100%"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80ZM380-320v-60h120v-40H380v-140h180v60H440v40h80q17 0 28.5 11.5T560-420v60q0 17-11.5 28.5T520-320H380Z"/></svg>
                            
                            <svg className="TimeGo" onClick={forward5} xmlns="http://www.w3.org/2000/svg" height="80%" viewBox="0 -960 960 960" width="100%"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800h6l-62-62 56-58 160 160-160 160-56-58 62-62h-6q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440h80q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80ZM380-320v-60h120v-40H380v-140h180v60H440v40h80q17 0 28.5 11.5T560-420v60q0 17-11.5 28.5T520-320H380Z"/></svg>
                            
                        </div>
                        
                        
                        <div className="otherSetting">
                        </div>
                        
                        
                        
                    </div>
                </div>
            </div>
        }
    </>
}
export default VideoFloat