import { useTranslation } from "react-i18next"
import { useListenForState } from "../components/Context"
import List from "../pages/List"
const MyList=(list)=>{
    const {t}=useTranslation()
    const {ChooseClass,IsChooseClass,login}=useListenForState()
    function Back2Class(){
        IsChooseClass(true)
        return <List/>
    }
    console.log("list")
    return <>
             
            <h3 className="thisList_title"> 
                <svg className="BackBTN" onClick={Back2Class} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg> 
                &nbsp;{t('ListMyClass')} - {list.inlist.classTitle}
            </h3>
            <div className="List_div">
                
                <div className="order">
                    {list.inlist.classTitle}
                </div>
            </div> 
        
        
    </>
}
export default MyList