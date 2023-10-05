
import { Search } from "@mui/icons-material"
import "../style/explore.css"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { v4 } from "uuid"
import VideoFloat from "../components/VideoFloat"
import { useListenForState } from "../components/Context"
import he from 'he'
import Addlist from "../components/AddList"

const  Explore=()=>{
    const {t}=useTranslation();
     
    const {FrameOpen,IsFrameOpen,chooseV,SetchooseV ,searchFor,SetSearchFor, KeyWordList,SetKeyWordList,ListMusicCheck,SetListMusicCheck,list,AddListDiv}=useListenForState()
    const [search,Setsearch]=useState("");
    const [showResault,IsshowResault]=useState(false);
    
    let reserArr=[]
    const [searchResault,SetserchResault]=useState({
        videoId:null,
        videoLink:null,
        videoChannelId:null,
        VideoTitle:null,
        // VideoLocalTitle:null,
        VideoThumbnails:null,
        ChannelTitle:null,
        VideoDescribe:null
    });
    let fianlResault=[]
     
     
    const searchChange=(a)=>{{
        Setsearch(a.target.value)
        SetSearchFor(a.target.value) //可不用?
        
    }}
    let APIkey="AIzaSyAA4OG0ZDoNpvrkcUL5on11rCHspzlIwUI"
    const searchAPI=(e)=>{
         
         
        if(search!=''&& search!=null){
             
            IsshowResault(false)
            fianlResault=[]
             
            let ApiUrl=`https://www.googleapis.com/youtube/v3/search?key=${APIkey}&q=${search}&type=video&VideoCategoryId=10&maxResults=10&part=snippet&videoLicense=youtube&order=relevance`
            
            axios.get(ApiUrl)
                .then(response=>{
                    let foreachPush=[]
                    let GetTitle=[]
                    const videos=response.data.items;
                    
                    videos.forEach(video => {
                        
                        const GetvideoId=video.id.videoId;
                        const GetvideoChannelId=video.snippet.channelId;
                         
                        const GetVideoTitle=he.decode(video.snippet.title);
                        // const GetVideoLocalTitle=video.snippet.localized.title
                        const GetVideoThumbnails=video.snippet.thumbnails.medium.url;
                        const GetChannelTitle=video.snippet.channelTitle
                        const ToVideoLink=`https://www.youtube.com/watch?v=${GetvideoId}`;
                        const GetVideoDescribe=video.snippet.description
                         
                        let search2array={
                            videoId:GetvideoId,
                            videoLink:ToVideoLink,
                            videoChannelId:GetvideoChannelId,
                            VideoTitle:GetVideoTitle,
                            // VideoLocalTitle:GetVideoLocalTitle,
                            VideoThumbnails:GetVideoThumbnails,
                            ChannelTitle:GetChannelTitle,
                            VideoDescribe:GetVideoDescribe,
                            VideoTime:null,
                        }
                        foreachPush.push(search2array)
                        GetTitle.push(search2array.VideoTitle)
                        //ListMusicCheck.push(search2array.VideoTitle)
                        
                        console.log(search2array)
                        
                         
                        //console.log(videos,videos.contentDetails)
                        // SetserchResault(p=>[...p,search2array])
                    });
                    
                    fianlResault=foreachPush
                    
                    SetserchResault(fianlResault)
                    SetListMusicCheck(GetTitle)
                    IsshowResault(true)
                    // console.log(fianlResault)
                    

                })
                .catch(error=>{
                    // console.log(error.message)
                })
        }else{
            console.log("no type")
        }
        e.preventDefault()
        
    }
    
    const Change2Floate=(element)=>{
        //IsFrameOpen(a=>!FrameOpen) //true時!FrameOpen變false , false時!FrameOpen變true

        // let GetVideoTime=""
        // axios.post(`https://www.googleapis.com/youtube/v3/videos?id=${element.videoId}&key=${APIkey}&part=contentDetails`)
        // .then(response=>{
        //     console.log(response,"8787aa")
        //     //GetVideoTime=response.contentDetails.duration
        // }).catch(err=>{console.log(err,"0122213")})
        SetchooseV({//再把該物件傳到context
            videoId:element.videoId,
            videoLink: element.videoLink,
            videoChannelId:element.videoChannelId,
            VideoTitle:element.VideoTitle,
            // VideoLocalTitle:null,
            VideoThumbnails:element.VideoThumbnails,
            ChannelTitle:element.ChannelTitle,
            VideoDescribe:element.VideoDescribe,
            //VideoTime:GetVideoTime
        })
         
        KeyWordList[0]=search
        KeyWordList[1]=element.VideoTitle
        KeyWordList[2]=ListMusicCheck
        
        
        console.log(element,GetVideoTime)
    }
    function aaa(){
        const aaaw=({
            reToken:localStorage.getItem("refresh")
        })
        axios.post("http://127.0.0.1:8000/user/Mylist/list",aaaw)
        .then(re=>{
            console.log(re)
        })
        
    }
    
     
    
    return  <div className="container">
        {FrameOpen!=false &&
            <VideoFloat  />
        }
        {list&&<>
            <Addlist/>
        </>

        }
         
        <div className="Search_container">
           <h3>{t('SearchTitle')}</h3>
            <form className="search_box" onSubmit={searchAPI}>
                <input type="search" name="search" id="searchInput" placeholder={t('SearchInput')} onChange={searchChange}/>
                <button type="submit" id="searchInputBTN" ><Search/></button>
            </form>
            
           <div className="search_resault" >
                  
                {showResault==true&&
                    
                    searchResault.map((re)=>{ //re為查到的物件
                        console.log(re)
                        let key=v4()
                        return <div key={key} className="videoItem" >
                            <div className="video" onClick={e=>{
                                 IsFrameOpen(a=>!FrameOpen) 
                                 Change2Floate(re)}
                                 }>
                                <img  className="Video_samune" src={re.VideoThumbnails}  />
                                
                                <div className="Video_title">
                                    <label className="Video_link" >
                                        {/* {re.VideoLocalTitle!=null&&re.VideoLocalTitle||re.VideoLocalTitle==null&&re.VideoTitle} */}
                                        {re.VideoTitle}
                                    </label>
                                </div>
                            </div>
                            <div className="list_tool">
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={e=>{
                                    AddListDiv(true)
                                    Change2Floate(re)}
                                    } height="80%" viewBox="0 -960 960 960" width="24" fill="" stroke=" " className="addLike"  ><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/></svg>
                            {/* 愛心 判斷是否該歌已加入清單 若有變紅愛心 */}
                            </div>
                        </div>
                    })
                }

                 
           </div>
        </div>
        
    </div>
}
// 點影片會放大 且旁邊會有字幕
export default Explore