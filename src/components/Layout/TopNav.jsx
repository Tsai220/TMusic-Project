import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useListenForState } from "../Context"

const TopNav=()=>{
    const {t}=useTranslation();
    const {navPage,SetnavPage,TopNavChange,SetTopNavChange}=useListenForState()
     
    return <>
        <label >
            {navPage=="/" && t('LayoutHome')|| navPage=="/Search" && t('LayoutSearch') || navPage=="/MyList" && t('LayoutMyList')}
        </label>
         
    </>
}

 
export default TopNav