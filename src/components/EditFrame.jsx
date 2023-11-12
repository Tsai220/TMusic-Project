import "../style/EditFrame.css"
import CloseIcon from '@mui/icons-material/Close';
import { useListenForState } from "./Context";
const EditFrame=(props)=>{
    
    const {editFrame,setEditFrame}=useListenForState()
    return <div className="EditFrame_container">
        <div className="EditFrame_box">
            <div className="EditFrame_nav">
                <label>修改</label>
                <CloseIcon onClick={()=>{setEditFrame(false)}} className="EF_nav_close" />
            </div>
            <div className="EditFrame_body">
                {props.inlist.listName}
            </div>
        </div>
    </div>
}
export default EditFrame