import { useTranslation } from "react-i18next"
import '../style/List.css'
import { v4 } from "uuid"
import ClassImg from '/src/images/music-playlist-icon-vector-33740985.jpg'
import { useState } from "react"
import MyList from "../components/MyList"
import { useListenForState } from "../components/Context"
 
const List=()=>{
    const {t}=useTranslation()
    const {ChooseClass,IsChooseClass,Inlist,Setlist}=useListenForState()
     
    const Myclass=[{
        classImg:"",
        classTitle:"播放列表1"
    },{
        classImg:"",
        classTitle:"播放列表2"
    }]


    function toMyList(list){
        IsChooseClass(false)
        Inlist.classTitle=list.classTitle
    }


    return <div className="Like_container">
    {/* 若無喜愛名單或未登入 不顯示 */}
    {/* 先選播放清單-> 列出喜愛列表 */}
    {ChooseClass && 
        <>
            <h3>{t('ListMyClass')}</h3>
            <div className="Myclass">
                
                {
                    Myclass.map((list)=>{
                        return<div key={v4()} className="ClassDiv" onClick={e=>toMyList(list)}>
                            <img src={ClassImg}   className="ClassImg" alt="" />
                            <label className="ClassTitle">{list.classTitle}</label>

                        </div>
                    })
                }

            </div>
            <h3>{t('ListOftenSeeChannel')}</h3>
            {/* 取搜尋常點進的影片的頻道主 */}
        </>
        || !ChooseClass &&
        <>
             
            <MyList inlist={Inlist}/>
        </>
    }
    
        
        
    </div>
}
export default List