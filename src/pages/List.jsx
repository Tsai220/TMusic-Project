import { useTranslation } from "react-i18next"
import '../style/List.css'
import { v4 } from "uuid"
import ClassImg from '/src/images/music-playlist-icon-vector-33740985.jpg'
import { useEffect, useState } from "react"
import MyList from "../components/MyList"
import { useListenForState } from "../components/Context"
import axios from "axios"
import { Skeleton } from "@mui/material"
const List=(props)=>{
    const {t}=useTranslation()
    const {ChooseClass,IsChooseClass,Inlist,Setlist,login,IsLogin,mylist,SetMylist}=useListenForState()
     const [show,Isshow]=useState(false)
     
    let lists=[{}]
    useEffect(()=>{
        //返回用戶有哪些音樂列表
        
        axios.post("http://127.0.0.1:8000/user/mylist/ShowList",{rToken:localStorage.getItem("refresh")})
        .then(response=>{
            console.log("aaaa")
            lists=[]
 
            response.data.forEach(val=>{
                if(val.listThumb==null){
                    val.listThumb="../src/images/music-playlist-icon-vector-33740985.jpg"
                }
                lists.push({
                    listId:val.listId,
                    listName:val.listName,
                    listThumb:val.listThumb,
                })

                
                
            })
            
            console.log(lists)
            SetMylist(lists)
            Isshow(true)
        }).catch(err=>{
            IsLogin(false)
        })
    },[])
    
    function toMyList(list){
        console.log(list)
        IsChooseClass(false)
        Setlist({
            "listName":list.listName,
            "listId":list.listId
        })
        Inlist.listName=list.listName
        Inlist.listId=list.listId
    }

    const { loading = false } = props
    return <div className="Like_container">
    {/* 若無喜愛名單或未登入 不顯示 */}
    {/* 先選播放清單-> 列出喜愛列表 */}
    {login &&

    
        ChooseClass && 
            <>
                <h3>{t('ListMyClass')}</h3>
                <div className="Myclass">
                    
                    {show &&<>
                            
                            {/* {   
                            
                                mylist.map((list)=>{
                                    
                                    return<div key={v4()} className="ClassDiv" onClick={e=>toMyList(list)}>
                                        <div className="imgDiv">
                                            <img src={list.listThumb}   className="ClassImg" alt="" />
                                        </div>
                                        <div className="titleDiv">
                                            <label className="ClassTitle">{list.listName}</label>
                                            

                                        </div>

                                    </div>
                                })
                            } */}
                            {   
                            
                            mylist.map((list)=>{
                                
                                return <>
                                    
                                        {
                                            
                                                list ? (
                                                    <div key={v4()} className="ClassDiv" onClick={e=>toMyList(list)}>
                                                        <div className="imgDiv">
                                                            {loading ? <Skeleton animation="wave"  ><img src={list.listThumb}   className="ClassImg"/></Skeleton>:
                                                                    
                                                                    <img src={list.listThumb}   className="ClassImg" style={{opacity:"0.7"}} />  
                                                                    // 有骨架
                                                            }
                                                            
                                                            
                                                        </div>
                                                        <div className="titleDiv">
                                                            <label className="ClassTitle">{list.listName}</label>
                                                        </div>

                                                    </div>
                                                ) : (
                                                    <Skeleton animation="wave" className="ClassImg" variant="rectangular"  />
                                                )
                                            
                                        }
                                          
                                    </>
                                     
                                
                                 
                            })
                        }


                            
                        </>
                    ||!show&&<>
                        wait...
                    </>
                    }

                </div>
                <h3>{t('ListOftenSeeChannel')}</h3>
                {/* 取搜尋常點進的影片的頻道主 */}
            </>
            || !ChooseClass &&
            <>
                
                <MyList inlist={Inlist}/>
            </>
    || !login &&
    <>
        {t('IsLogin')}
    </>
        
    
    } 
       
    </div>
}
export default List