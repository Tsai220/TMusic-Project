import axios, { Axios } from "axios"
import "../style/Addlist.css"
import { useListenForState } from "./Context"
import { useEffect } from "react"
const Addlist=()=>{
    const {chooseV,SetchooseV,list,AddListDiv}=useListenForState()
    function closeBtn(){
        AddListDiv(false)
    }
    useEffect(()=>{
        axios.post("http://127.0.0.1:8000/user/Mylist/list",{rToken:localStorage.getItem("refresh")})
        .then(re=>{
            console.log(re)
        }).catch(err=>{
            console.log(err)
        })
        
    },[])
     
    return <div className="Addlist_container">
        <div className="Addlist_box">
            <div className="Addlist_nav">
                <span>加入歌單</span>
                <button type="button" onClick={closeBtn}  ><svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></button>
            </div>
            <div className="checkDiv">
                
                    <img width="32%" src={chooseV.VideoThumbnails} alt="Thumbnails" className="checkThumb" />
                    <div className="song_Info">
                        <table border={1} width="100%">
                            <thead>
                                <tr>
                                    <th className="tableTitle">影片標題:</th>
                                    <td className="tabletxt"> {chooseV.VideoTitle}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="tableTitle">頻道:</th>
                                    <td className="tabletxt">{chooseV.ChannelTitle}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="toList">
                            {
                               
                            }
                        </div>
                       
                    </div>
                
                    
                
            </div>
             
            
        </div>
        
        
    </div>
}
export default Addlist