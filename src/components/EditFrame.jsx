import "../style/EditFrame.css"
import CloseIcon from '@mui/icons-material/Close';
import { useListenForState } from "./Context";
import axios from "axios";
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { styled ,Button} from "@mui/material";
const EditFrame=(props)=>{
    
    const {editFrame,setEditFrame,login,IsLogin}=useListenForState()
    const [editListInfo,SetEditListInfo]=useState({'listThumbnails':null,'list_id':null,'list_name':null})
    const listData={
        listName:props.inlist.listName,
        listId:props.inlist.listId,
        rToken:localStorage.getItem("refresh")
    }
    const ShowUpload=styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    })
     
    useEffect(()=>{
        axios.post('http://127.0.0.1:8000/user/mylist/EditListShow',listData)
        .then(response=>{
            console.log(response   )
            if(response.data.listThumbnails==null){
                response.data.listThumbnails="../src/images/music-playlist-icon-vector-33740985.jpg"
            }
           const resData={
                listThumbnails: response.data.listThumbnails,
                list_id: response.data.list_id,
                list_name: response.data.list_name
            }
             
            
             SetEditListInfo(resData)
             console.log(editListInfo)
        }).catch(error=>{
            console.log(error)
            IsLogin(false)
            setEditFrame(false)
        })
    
    },[])
    console.log(editListInfo)
    return <div className="EditFrame_container">
        <div className="EditFrame_box">
            <div className="EditFrame_nav">
                <label>修改 - {editListInfo.list_name}</label>
                <CloseIcon onClick={()=>{setEditFrame(false)}} className="EF_nav_close" />
            </div>
            {login && <>
                
                <div className="EditFrame_body">
                    
                    <img src={editListInfo.listThumbnails} width="35%" alt="" onClick={()=>{<ShowUpload type="file"  />}} />
                    <label> {editListInfo.list_name}</label>
                    <Button component="label" variant="contained" startIcon={<AddPhotoAlternateIcon/>}  ><ShowUpload type="file" onChange={e=>console.log(e.target.value)}  />Upload</Button>
                    
                </div>
            </>
            || !login && <>未登入</>
            }
            
        </div>
    </div>
}
export default EditFrame