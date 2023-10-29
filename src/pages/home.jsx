import "../style/home.css"
import { v4 } from "uuid"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import axios from "axios"
import { useListenForState } from "../components/Context"
let load = false;
const Home=()=>{
    
     const {t}=useTranslation()

     const {recomand,SetRecomand}=useListenForState()
        

        useEffect(()=>{
            if (recomand==null){
                 
                axios.post("http://127.0.0.1:8000/user/dialy/daily",{"rToken":localStorage.getItem('refresh')})
                .then(response=>{
         
                    SetRecomand(response.data)
                    
                })
                .catch(err=>{
                    console.log(err)
                })
            }
            
        },[])
    
         
        console.log(recomand)
    return <>
    
        <div className="container">
            <h3>{t('HomeDailyShow')}</h3>{/*分類*/ }
            {/* .map */}
            <div className="daily_hightLight">
                
                {recomand!=null && 
                    
                    recomand.map((a)=>{
                        
                        return(
                            <div className="dailyList" key={v4()} >
                                
                                
                                <div className="img_info_back">
                                    <img src={a.videoThumbnails} width="100%" alt="" className="cd_cover"/>
                                    <div className="info">{a.channel_name}</div>
                                    <div className="info2">{a.videoTitle}</div>
                                </div>
                                {/* <p>{a.videoTitle}</p>
                                <p>{a.channel_name}</p> */}
                            </div>
                        )
                    })
                || recomand==null && <></>
                }
                
            </div>
        </div>
        
    </>
        
    
}
export default Home