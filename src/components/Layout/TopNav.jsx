import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useListenForState } from "../Context"

const TopNav=()=>{
    const {t}=useTranslation();
    const {navPage,SetnavPage,TopNavChange,SetTopNavChange}=useListenForState()
     
    return <>
     
            {navPage=="/" && t('LayoutHome')|| navPage=="/Search" && t('LayoutSearch') || navPage=="/MyList" && t('LayoutMyList')}
         
    </>
}

 
export default TopNav