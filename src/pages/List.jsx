import { useTranslation } from "react-i18next"
import '../style/List.css'
import { v4 } from "uuid"
import ClassImg from '/src/images/music-playlist-icon-vector-33740985.jpg'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useEffect, useState } from "react"
import MyList from "../components/MyList"
import { useListenForState } from "../components/Context"
import axios from "axios"
import { Skeleton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import EditFrame from "../components/EditFrame";
const List=(props)=>{
    const {t}=useTranslation()
    const {ChooseClass,IsChooseClass,Inlist,Setlist,login,IsLogin,mylist,SetMylist,editFrame,setEditFrame}=useListenForState()
     const [show,Isshow]=useState(false)
     const [myClassEle,setMyClassEle]=useState("Myclass")
     const [ClassDiv,setClassDiv]=useState("ClassDiv")
     
     const [edit,IsEdit]=useState(false)
    let lists=null
    const { loading = false } = props
    
    useEffect(()=>{
        //返回用戶有哪些音樂列表
       
        setEditFrame(false)
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
     
    function editingMode(){
         
        if (!edit){
            let addClass=myClassEle+" editState"
            let addsetClassDiv=ClassDiv+" editThis"
            setMyClassEle(addClass)
            setClassDiv(addsetClassDiv)
            IsEdit(true)
        }else{
            let addClass="Myclass"
            let addsetClassDiv="ClassDiv"
            setMyClassEle(addClass)
            setClassDiv(addsetClassDiv)
            IsEdit(false)
        }
        
    }
     

    function ListImgChange2(event){
        if(edit){
                                                                                
            event.target.style.cssText ="animation: hoverToImg 1.5s   forwards  ;"
        }
    }
    function ListImgChangeLeave2(event){
        if(edit){
            event.target.style.cssText ="opacity:0.8 ; " 
        }
    }

    
    return <div className="Like_container ">
    {/* 若無喜愛名單或未登入 不顯示 */}
    {/* 先選播放清單-> 列出喜愛列表 */}
    {login &&
        
            ChooseClass && 
                <>
                    <h3 className="MylistTitle"  >{t('ListMyClass')} 
                        {!edit && <EditIcon fontSize="small" className="MylistEdit"  onClick={editingMode} />|| edit && <EditOffIcon className="MylistEdit" onClick={editingMode} /> }{edit && <label style={{fontSize:"small" , color:"blue"}}>{t('ListEditStateTxt')}</label>}
                    </h3>
                    <div className={myClassEle}>
                        
                        {mylist!=null &&<>
                                
                                
                                {   
                                
                                mylist.map((list)=>{
                                    // ClassDiv
                                    return <div key={v4()} className={ClassDiv}  >
                                        
                                            {
                                                
                                                    list ? (    
                                                    
                                                        <div key={list.listId}  onClick={(e)=>{!edit && toMyList(list) || edit &&  setEditFrame(true) ,Setlist({"listName":list.listName,"listId":list.listId} )}}>
                                                            <div className="imgDiv" onMouseLeave={(e)=>edit&&(e.target.classList.remove("ClassImgEdit"))  }  onMouseEnter={(e)=>edit &&(e.target.classList.add("ClassImgEdit"))   }  >
                                                                {loading ?<Skeleton animation="wave" key={list.listId}><img src={list.listThumb}   className="ClassImg" /></Skeleton> :
                                                                        
                                                                        <img src={list.listThumb}   className="ClassImg" style={{opacity:"0.8" }} 
                                                                        onMouseLeave={ListImgChangeLeave2}    
                                                                            onMouseEnter={ListImgChange2}   
                                                                        />
                                                                        
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
            ||!ChooseClass &&
                <>
                    <MyList inlist={Inlist}/>
                </>
    || !login &&
    <>
        {t('IsLogin')} 
    </>
        
    
    } 
        {editFrame&& <EditFrame inlist={Inlist}  />}
       
    </div>

    
}
export default List