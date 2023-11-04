import "../style/CrossPic.css"
import { useListenForState } from "./Context"
import CloseIcon from '@mui/icons-material/Close';
import YouTube from "react-youtube";
import NorthWestIcon from '@mui/icons-material/NorthWest';
const CrossPic=()=>{
    const {FrameOpen,IsFrameOpen,chooseV,isPicOpen}=useListenForState()
    function closeBtn(){
        isPicOpen(false)
    }
    function BackToVFloat(){
        isPicOpen(false)
        IsFrameOpen(true)
    }
    return <div className="container_pic">
        <div className="nav_pic"><NorthWestIcon className="BackToVFloat" onClick={BackToVFloat}/><CloseIcon onClick={closeBtn} className="closeBtn_pic"/></div>
        <div className="video_pic" >
            <YouTube 
                videoId={chooseV.videoId} 
 
              />
        </div>
        <div className="title_pic">
            <div className="titleName_pic">{chooseV.VideoTitle}</div> 
            <div className="titleChName"> {chooseV.ChannelTitle}</div>
        </div>
    </div>
}
export default CrossPic