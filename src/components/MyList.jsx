import { useTranslation } from "react-i18next"
import { useListenForState } from "../components/Context"
import List from "../pages/List"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { v4 } from "uuid"
import VideoFloat from "./VideoFloat"
import IosShareIcon from '@mui/icons-material/IosShare';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton,Typography,Popover,MenuList,MenuItem,ListItemIcon,ListItemText } from "@mui/material"
 
let load = false;
const MyList=(list)=>{
    const {t}=useTranslation()
    const {ChooseClass,IsChooseClass,login,Inlist,Setlist,chooseV,SetchooseV,FrameOpen,IsFrameOpen}=useListenForState()
    const [musicList,setMusicList]=useState([]) 
    const [anchorEl,setAnchorEl]=useState(null)
    const open = Boolean(anchorEl);
    const id = open ? 'optBtn' : undefined;
    const [optXY,setOptXY]=useState([0,0])
    if (!load) {
        
        axios.post("http://127.0.0.1:8000/user/mylist/SongInList",{"listId":Inlist.listId})
                .then(response=>{
                    console.log(response,"1")
                    viedeolistSet(response.data)
                }).catch(err=>{
                    console.log(err)
                     
                })
        load = true;
    }else{
        useEffect(()=>{
            
            axios.post("http://127.0.0.1:8000/user/mylist/SongInList",{"listId":Inlist.listId})
            .then(response=>{
                console.log(response,"2")
                viedeolistSet(response.data)
                 
            }).catch(err=>{
                console.log(err)
                 
            })
        },[])
    }
    let xy=[0,0]
    const handleClick = (event,obj0) => {
         //取選項位置後計算偏移，因是以點擊位置計算
        xy=[event.clientX  ,event.clientY ]
      
        setOptXY(xy)
        console.log(event,"1")
        console.log(obj0,"2")
        setAnchorEl(event.currentTarget);
        SetchooseV({//再把該物件傳到context
            videoId:obj0.videoId,
            videoLink: "https://www.youtube.com/watch?v="+obj0.videoId,
            videoChannelId:obj0.channel_id,
            VideoTitle:obj0.videoTitle,
            VideoThumbnails:obj0.videoThumbnails,
            ChannelTitle:obj0.channel_name,
            VideoDescribe:null,
        })
      };
    const handleClose=()=>{
        setAnchorEl(null)
    }
    function viedeolistSet(val){
        let v_i=[]
        val.forEach(item=>{
            v_i.push(item)
            
        })
        setMusicList(v_i)
        
    }
        
    function delteThis(){
        console.log(chooseV.videoId)
        const delFilter=musicList.filter(item=>item.videoId !== chooseV.videoId )
        setMusicList(delFilter)
        setAnchorEl(null)
        // chooseV值 和列表編號
        const formObj={
            rToken:localStorage.getItem('refresh'),
            thisList:Inlist.listId,
            video_id:chooseV.videoId
        }
        axios.post("http://127.0.0.1:8000/user/mylist/DeleteThis",formObj)
        .then(response=>{
                console.log(response)
        })
        .catch(err=>{
            console.log(err)   
        })
    }
        
    
    function Back2Class(){
        IsChooseClass(true)
        return <List/>
    }
     
    function video2Float(element){
        
        SetchooseV({//再把該物件傳到context
            videoId:element.videoId,
            videoLink: "https://www.youtube.com/watch?v="+element.videoId,
            videoChannelId:element.channel_id,
            VideoTitle:element.videoTitle,
            VideoThumbnails:element.videoThumbnails,
            ChannelTitle:element.channel_name,
            VideoDescribe:null,
        })
        IsFrameOpen(true)
        // KeyWordList[0]=search
        // KeyWordList[1]=element.VideoTitle
        // KeyWordList[2]=ListMusicCheck
        
    }
    console.log(FrameOpen)
    return <>
            {FrameOpen!=false &&
                <VideoFloat  />
            }
             
            <h3 className="thisList_title"> 
                <svg className="BackBTN" onClick={Back2Class} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg> 
                &nbsp;{t('ListMyClass')} - {list.inlist.listName} 
            </h3>
            
                
            {musicList.length!==0 && <div className="List_div">
                    {
                    musicList.map(obj=>{ 
                        return <div className="item" key={v4()} >
                            
                            <div className="itemBlock" onClick={a=>{video2Float(obj)}}>
                                <img src={obj.videoThumbnails}   className="musicThumb"  />
                                <div className="item_info">
                                    <label className="musicTitle">{obj.videoTitle}</label>
                                    <label className="musicchannel_name">{obj.channel_name}</label>
                                    
                                    
                                </div>
                            </div>
                            
                             
                            <IconButton id="optBtn" aria-describedby={id}  onClick={event=>{handleClick(event,obj)}} >
                                <MoreVertIcon />
                            </IconButton>
 
                            <Popover
                                id={id}
                                open={open}
                                onClose={handleClose}
                                elevation={0}
                                anchorReference="anchorPosition"
                                anchorPosition={{  left:optXY[0] ,top: optXY[1]}}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                  }}
                                  sx={{alignItems:"center",width:"30%" }}
                                >
                                 <MenuList>
                                    <MenuItem sx={{borderBottom:1, borderColor:'grey'}}>
                                        <ListItemIcon>
                                            <FeedOutlinedIcon     sx={{color:"black"}} />
                                        </ListItemIcon>
                                        <ListItemText   >{chooseV.VideoTitle}</ListItemText>
                                    </MenuItem>
                                     
                                    <MenuItem sx={{borderBottom:1, borderColor:'grey'}} onClick={delteThis} >
                                        <ListItemIcon>
                                            <DeleteOutlineIcon   sx={{color:"red"}}/>
                                        </ListItemIcon>
                                        <ListItemText >{t('ListDelte')}</ListItemText>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <IosShareIcon  sx={{color:"blue"}} />
                                        </ListItemIcon>
                                        <ListItemText>{t('ListShare')}</ListItemText>
                                    </MenuItem>
                                 </MenuList>
                            </Popover>

                            
                           
                                    
                        </div>
                                
                    })
                }
            </div> 
            || musicList.length==0 && <>
                None
            </>
                        
            }
                
            <div className="order">
                     
            </div>
            
        
        
    </>
}
export default MyList