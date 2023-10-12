import { useTranslation } from "react-i18next"
import '../style/List.css'
import { v4 } from "uuid"
import ClassImg from '/src/images/music-playlist-icon-vector-33740985.jpg'
import { useEffect, useState } from "react"
import MyList from "../components/MyList"
import { useListenForState } from "../components/Context"
import axios from "axios"
 
const List=()=>{
    const {t}=useTranslation()
    const {ChooseClass,IsChooseClass,Inlist,Setlist,login,mylist,SetMylist}=useListenForState()
     const [show,Isshow]=useState(false)
    const Myclass=[{
        classImg:"",
        classTitle:"播放列表1"
    },{
        classImg:"",
        classTitle:"播放列表2"
    }]
    let lists=[{}]
    useEffect(()=>{
        //返回用戶有哪些音樂列表
        
        axios.post("http://127.0.0.1:8000/user/mylist/ShowList",{rToken:localStorage.getItem("refresh")})
        .then(response=>{
 
            lists=[]
 
            response.data.forEach(val=>{
                
                lists.push({
                    listId:val.listId,
                    listName:val.listName,
                    listThumb:val.listThumb,
                })

                
                
            })
            
            console.log(lists)
            SetMylist(lists)
            Isshow(true)
        })
    },[])
    
    function toMyList(list){
        IsChooseClass(false)
        Inlist.classTitle=list.classTitle
    }


    return <div className="Like_container">
    {/* 若無喜愛名單或未登入 不顯示 */}
    {/* 先選播放清單-> 列出喜愛列表 */}
    {login &&

    
        ChooseClass && 
            <>
                <h3>{t('ListMyClass')}</h3>
                <div className="Myclass">
                    
                    {show &&<>
                            
                            {   
                                mylist.map((list)=>{
                                    
                                    return<div key={v4()} className="ClassDiv" onClick={e=>toMyList(list)}>
                                        <img src={ClassImg}   className="ClassImg" alt="" />
                                        <label className="ClassTitle">{list.listName}</label>

                                    </div>
                                })
                            }
                        </>
                    ||!show&&<>
                        wait...
                    </>
                    }

                </div>
                
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
        <h3>{t('ListOftenSeeChannel')}</h3>
    </div>
}
export default List