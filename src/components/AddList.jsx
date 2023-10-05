import axios, { Axios } from "axios"
import "../style/Addlist.css"
import { useListenForState } from "./Context"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
const Addlist=()=>{
    const {chooseV,SetchooseV,list,AddListDiv}=useListenForState()
    const [addlist,Isaddlist]=useState(false)
    const {t}=useTranslation()
    function closeBtn(){
        AddListDiv(false)
    }
    useEffect(()=>{
        axios.post("http://127.0.0.1:8000/user/mylist/list",{rToken:localStorage.getItem("refresh")})
        .then(response=>{
            if(response.data[0]=="Resources are not available"){
                Isaddlist(true)
            }
        }).catch(err=>{
            console.log(err)
        })
        
    },[])
 
     
    return <div className="Addlist_container">
        <div className="Addlist_box">
            <div className="Addlist_nav">
                <span>{t('AddlistTitle')}</span>
                <button type="button" onClick={closeBtn}  ><svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></button>
            </div>
            <div className="checkDiv">
                
                    <img width="32%" src={chooseV.VideoThumbnails} alt="Thumbnails" className="checkThumb" />
                    <div className="song_Info">
                        <table border={1} width="100%">
                            <thead>
                                <tr>
                                    <th className="tableTitle">{t('AddlistTableTitle')}</th>
                                    <td className="tabletxt"> {chooseV.VideoTitle}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="tableTitle">{t('AddlistTableChannel')}</th>
                                    <td className="tabletxt">{chooseV.ChannelTitle}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="toList">
                             
                               {addlist&&
                                    <div className="createList">
                                        <table border={1} width="100%">
                                            <thead>
                                                <tr>
                                                    <th className="tableTitleCreate">{t('AddlistCreate')}</th>
                                                    <input type="text" className="ceateListinput" placeholder={t('AddlistPlaceholder')} />
                                                </tr>
                                            </thead>
                                       
                                        </table>
                            
                                        
                                    </div>
                                    
                               }
                             
                        </div>
                       
                    </div>
                
                    
                
            </div>
             
            
        </div>
        
        
    </div>
}
export default Addlist