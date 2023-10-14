import axios, { Axios } from "axios"
import "../style/Addlist.css"
import { FormControl, FormHelperText, IconButton, TextField } from "@mui/material"
import { useListenForState } from "./Context"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import OutlinedInput from '@mui/material/OutlinedInput';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { InputLabel } from '@mui/material';
import { NativeSelect } from '@mui/material';
import { v4 } from "uuid"
 
const Addlist=()=>{
    const {chooseV,SetchooseV,list,AddListDiv,login,IsLogin,P_musicList,Set_P_musicList}=useListenForState()
    const [addlist,Isaddlist]=useState(false)
    const [listName,SetListName]=useState("")
    const [selected,SetSelected]=useState()
    const [hasAdd,IshasAdd]=useState(false)
    const [listLen,setListLen]=useState(true)
    const {t}=useTranslation()
    function closeBtn(){
        AddListDiv(false)
    }

    
    useEffect(()=>{
        axios.post("http://127.0.0.1:8000/user/mylist/list",{rToken:localStorage.getItem("refresh")})
        .then(response=>{
            console.log(response)
            if(response.data[0]=="Resources are not available"){
                Isaddlist(true)
                console.log(P_musicList)
                console.log("ssssaa")
                
            }
        }).catch(err=>{
            console.log("herer")
            Isaddlist(true)
        })
        
    },[])
    let Mylist=null
    useEffect(()=>{
        if(addlist==false){
            console.log("重複檢查")
            axios.post("http://127.0.0.1:8000/user/mylist/listShow",{rToken:localStorage.getItem("refresh")})
            .then(response=>{
                let res_data=response.data
                if(response.data[0]=="Resources are not available"){
                    Isaddlist(true)
                }else{
                    let pushData=null
                    Mylist=[]
                    res_data.forEach(element => {
                        pushData={
                            list_id:element.list_id,
                            list_name:element.list_name,
                            listThumbnails:element.listThumbnails
                        }
                        Mylist.push(pushData)
                    });
                    console.log(Mylist.length,"輸入")
                    Set_P_musicList(Mylist)
                    SetSelected(Mylist[0].list_id)
                    console.log(selected)
                    if(Mylist.length ==3){
                        setListLen(false)
                    }
                }
                
                console.log(response)
            }) 
        }
        
    },[addlist])
    
    
    
    const createList=()=>{
        const listdata={
            listTitle:listName ,
            rToken:localStorage.getItem("refresh")
         }
         axios.post("http://127.0.0.1:8000/user/mylist/listCr",listdata)
         .then(response=>{
            if (response.statusText=="OK"){
                
                Isaddlist(false)
                //出現放音樂至列表流程
            }
            console.log(response)
         }).catch(err=>{
            if(err.response.statusText=="Forbidden"){
                setListLen(false)
            }
         })
    }
    const createList2=()=>{
        Isaddlist(true)
        const listdata={
            listTitle:listName ,
            rToken:localStorage.getItem("refresh")
         }
         axios.post("http://127.0.0.1:8000/user/mylist/listCr",listdata)
         .then(response=>{
            if (response.statusText=="OK"){
                Isaddlist(false)
                //出現放音樂至列表流程
            }
            console.log(response)
         }).catch(err=>{
            if(err.response.statusText=="Forbidden"){
                setListLen(false)
            }
         })
    }

    const AddtoMylist=()=>{
        IshasAdd(true)
        const AddMusicTo={
            selectedListId:selected,
            videoId:chooseV.videoId,
            videoChannelId:chooseV.videoChannelId,
            VideoTitle:chooseV.VideoTitle,
            VideoThumbnails:chooseV. VideoThumbnails,
            ChannelTitle:chooseV.ChannelTitle,

        }
        axios.post("http://127.0.0.1:8000/user/mylist/listAdd",AddMusicTo)
            .then(response=>{
                AddListDiv(false)
                alert("已新增")
                console.log(response)
            }).catch(err=>{
                console.log(err)
            })

            
    }
    
    let errMsg=null
    const [titleErr,IstitleErr]=useState(false)
    return <div className="Addlist_container">
        <div className="Addlist_box">
            <div className="Addlist_nav">
                <span>{t('AddlistTitle')}</span>
                <button type="button" onClick={closeBtn}  ><svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></button>
            </div>
            <div className="checkDiv">
                    <div className="Video_Thumbnails">
                        <img width="100%"   src={chooseV.VideoThumbnails} alt="Thumbnails" className="checkThumb" />
                    </div>
                    
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

                    </div>
                
                    
                
            </div>
            <div className="toList">
                {login &&
                    addlist  &&
                        <div className="createList">
                            <FormControl variant="outlined" sx={{ width: '50%' }}>
                                <InputLabel   htmlFor="ceateListinput"    >{t('AddlistCreate')}</InputLabel>
                                <OutlinedInput error={titleErr} id="ceateListinput" className="ceateListinput"   placeholder={t('AddlistPlaceholder')} 
                                
                                onChange={val=>{
                                     console.log(val)
                                    if(val.target.value.length<=15){
                                        errMsg=null
                                        IstitleErr(false)
                                        SetListName(val.target.value ) 
                                    }else{
                                        errMsg=t('AddlistErrMsg')
                                        IstitleErr(true)
                                    }
                                    
                    
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                        borderColor: errMsg != null ? 'black' : 'red', // 根据错误状态设置边框颜色
                                        },
                                    }}
                                    endAdornment={ !titleErr &&
                                    <PlaylistAddIcon className="addListBtn" onClick={createList}>新增</PlaylistAddIcon>
                                        
                                    }
                                    label={t('AddlistErrMsg')}
                                    />
                                </FormControl>
                                {titleErr &&
                                    <FormHelperText>
                                            <label style={{color:"red",fontSize:"0.9rem"}}>{t('AddlistErrMsg')}</label>
                                    </FormHelperText>
        
                                }

                        </div>
                    || !addlist && <>
                        <FormControl  sx={{width:"90%"}}>
                            <InputLabel variant="standard" htmlFor="Mylist_select" disableAnimation={true} shrink={true} >{t('AddlistChooseLabel')}</InputLabel>
                            
                            <NativeSelect  defaultValue={P_musicList[0]} inputProps={{id:'Mylist_select', name:'Mylist'}}  onChange={(a)=>{
                                SetSelected(a.target.value)

                                }} >
                                    {
                                        
                                        P_musicList.map((element)=>{
                                            
                                            return <option  key={v4()}    value={element.list_id} >{element.list_name}</option> 
                                                
                                            
                                        
                                        })
                                    }

                            </NativeSelect>
                            
                        </FormControl>
                        <IconButton color="primary" aria-label="add to list" sx={{ textAlign:'center' }} onClick={AddtoMylist} >
                            <PlaylistAddIcon />
                        </IconButton> 
                        <div className="createList" style={{margin:"1.5% 0% 1.5% 2.5%"}}>
                            {listLen && <>
                                
                                <FormControl variant="outlined" sx={{ width: '50%' }}>
                                    <InputLabel   htmlFor="ceateListinput"    >{t('AddlistCreate')}</InputLabel>
                                    <OutlinedInput error={titleErr} id="ceateListinput" className="ceateListinput"   placeholder={t('AddlistPlaceholder')} 
                                    
                                    onChange={val=>{
                                        
                                        if(val.target.value.length<=15){
                                            errMsg=null
                                            IstitleErr(false)
                                            SetListName(val.target.value ) 
                                        }else{
                                            errMsg=t('AddlistErrMsg')
                                            IstitleErr(true)
                                        }
                                        
                        
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                            borderColor: errMsg != null ? 'black' : 'red', // 根据错误状态设置边框颜色
                                            },
                                        }}
                                        endAdornment={ !titleErr &&
                                        <PlaylistAddIcon className="addListBtn" onClick={createList2}>新增</PlaylistAddIcon>
                                            
                                        }
                                        label={t('AddlistErrMsg')}
                                        />
                                    </FormControl>
                                    {titleErr &&
                                        <FormHelperText>
                                                <label style={{color:"red",fontSize:"0.9rem"}}>{t('AddlistErrMsg')}</label>
                                        </FormHelperText>
            
                                    }

                                
                            
                            </>
                            || !listLen && <>
                                
                                創建播放清單數量上限!
                                
                            </>
                            }
                        </div>
                        
                    </>
                ||  !login  && <>
                        <label className="noLoginTxt">{t('IsLogin')}</label> 
                        <p >{t('SignUpHasTxt')}  <a href="/Login" style={{color:"blue" ,textDecoration:"underline"}}>{t('SignUpHasLink')}</a></p> 
                        <p >{t('LoginNoHasTxt')}<a href="/SignUp" style={{color:"blue" ,textDecoration:"underline"}}>{t('LogingoReg')}</a></p>
                    </>        
                }

                
            </div>
            
        </div>
        
        
    </div>
}
export default Addlist