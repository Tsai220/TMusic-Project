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
     
    let lists=null
    const { loading = false } = props
    useEffect(()=>{
        //返回用戶有哪些音樂列表
       
    
        if (mylist==null){
            const data = {rToken:localStorage.getItem("refresh")}
            
            axios.post("http://127.0.0.1:8000/user/mylist/ShowList",data)
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

                SetMylist(lists)
                Isshow(true)
            }).catch(err=>{
                IsLogin(false)
            })
        }
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

    
    return <div className="Like_container">
    {/* 若無喜愛名單或未登入 不顯示 */}
    {/* 先選播放清單-> 列出喜愛列表 */}
    {login &&

    
        ChooseClass && 
            <>
                <h3>{t('ListMyClass')}</h3>
                <div className="Myclass">
                    
                    {mylist!=null &&<>
                            
                             
                            {   
                            
                            mylist.map((list)=>{
                                 
                                return <div key={v4()} className="ClassDiv">
                                    
                                        {
                                            
                                                list ? (
                                                    <div key={list.listId}  onClick={()=>toMyList(list)}>
                                                        <div className="imgDiv">
                                                            {loading ?<Skeleton animation="wave" key={list.listId}><img src={list.listThumb}   className="ClassImg"/></Skeleton> :
                                                                    
                                                                    <img src={list.listThumb}   className="ClassImg" style={{opacity:"0.7"}} />
                                                                    // 有骨架
                                                            }
                                                            
                                                            
                                                        </div>
                                                        <div className="titleDiv">
                                                            <label className="ClassTitle">{list.listName}</label>
                                                        </div>

                                                    </div>
                                                ) : (
                                                    <Skeleton key={list.listId} animation="wave" className="ClassImg" variant="rectangular"  />
                                                )
                                            
                                        }
                                          
                                    </div>
                                     
                                
                                 
                            })
                        }


                            
                        </>
                    ||mylist==null&&<>
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