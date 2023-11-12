import "../style/EditFrame.css"
import CloseIcon from '@mui/icons-material/Close';
import { useListenForState } from "./Context";
import axios from "axios";
import { useEffect, useState } from "react";
const EditFrame=(props)=>{
    
    const {editFrame,setEditFrame}=useListenForState()
    const [editListInfo,SetEditListInfo]=useState({'listThumbnails':null,'list_id':null,'list_name':null})
    const listData={
        listName:props.inlist.listName,
        listId:props.inlist.listId,
        rToken:localStorage.getItem("refresh")
    }
    useEffect(()=>{
        axios.post('http://127.0.0.1:8000/user/mylist/EditListShow',listData)
        .then(response=>{
            console.log(response   )
           const resData={
                listThumbnails: response.data.listThumbnails,
                list_id: response.data.list_id,
                list_name: response.data.list_name
            }
             
            
             SetEditListInfo(resData)
             console.log(editListInfo)
        }).catch(error=>{
            console.log(error)
        })
    
    },[])
    console.log(editListInfo)
    return <div className="EditFrame_container">
        <div className="EditFrame_box">
            <div className="EditFrame_nav">
                <label>修改 - {editListInfo.list_name}</label>
                <CloseIcon onClick={()=>{setEditFrame(false)}} className="EF_nav_close" />
            </div>
            <div className="EditFrame_body">
                 {editListInfo.list_name}
            </div>
        </div>
    </div>
}
export default EditFrame