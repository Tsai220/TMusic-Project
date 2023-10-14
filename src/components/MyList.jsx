import { useTranslation } from "react-i18next"
import { useListenForState } from "../components/Context"
import List from "../pages/List"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { v4 } from "uuid"
import VideoFloat from "./VideoFloat"
let load = false;
const MyList=(list)=>{
    const {t}=useTranslation()
    const {ChooseClass,IsChooseClass,login,Inlist,Setlist,chooseV,SetchooseV,FrameOpen,IsFrameOpen}=useListenForState()
    const [musicList,setMusicList]=useState([]) 
    
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
    
    function viedeolistSet(val){
        let v_i=[]
        val.forEach(item=>{
            v_i.push(item)
            
        })
        setMusicList(v_i)
        
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
                        return <div className="item" key={v4()} onClick={a=>{video2Float(obj)}}>
                                
                            <img src={obj.videoThumbnails}   className="musicThumb"  />
                            <div className="item_info">
                                <label className="musicTitle">{obj.videoTitle}</label>
                                <label className="musicchannel_name">{obj.channel_name}</label>
                            </div>
                                    
                                    
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