import { Link } from "react-router-dom"
import logo from'/src/images/logo.png'
import { useTranslation } from "react-i18next"
import { useListenForState } from "../Context"
 
const SideNav=(props)=>{
    const {t}=useTranslation()
    const {navPage,SetnavPage}=useListenForState()
     
    
    return <>
        <div className="Icon_div">
            <img src={logo} width={100} alt="brand_icon" className="brand_icon"/><br/>
        </div>
        <Link  className="linka" to="/"  id="Home" style={{backgroundColor:navPage=="/"? "rgb(141, 207, 230)":"lightblue"}} onClick={()=>{SetnavPage("/")}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="38"><path d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z"/></svg>
            <span className="linka_title">{t('LayoutHome')}</span>
        </Link>
        {/* <Link  className="linka" to="/">
            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="38"><path d="m323-205 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-355Z"/></svg>
            {t('LayoutDaily')}
        </Link> */}
        <Link  className="linka" to="/Search"  id="Search"  style={{backgroundColor:navPage=="/Search"? "rgb(141, 207, 230)":"lightblue"}} onClick={()=>{SetnavPage("/Search")}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="38"><path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z"/></svg>
            <span className="linka_title">{t('LayoutSearch')}</span>
        </Link>
        <Link  className="linka" to="/MyList"  id="MyList" style={{backgroundColor:navPage=="/MyList"? "rgb(141, 207, 230)":"lightblue"}} onClick={()=>{SetnavPage("/MyList")}} >
            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="38"><path d="M640.118-160Q591-160 556-193.559q-35-33.559-35-81.5t33.542-81.441Q588.083-390 636-390q16 0 31.5 3t30.5 10v-343h182v71H758v375q0 47.5-34.382 80.75-34.383 33.25-83.5 33.25ZM120-330v-60h306v60H120Zm0-165v-60h473v60H120Zm0-165v-60h473v60H120Z"/></svg>
            <span className="linka_title">{t('LayoutMyList')}</span>
        </Link>
        {/* <Link  className="linka" to="/Like"  id="Love" style={{backgroundColor:navPage=="/Like"? "rgb(141, 207, 230)":"lightblue"}} onClick={()=>{SetnavPage("/Like")}} >
            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="38" ><path d="m480-121-41-37q-105.768-97.121-174.884-167.561Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.155 60.5-150.577Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.423Q880-733.155 880-643q0 46-16.5 91T806-451.5Q765-396 695.884-325.561 626.768-255.121 521-158l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712-426 750.5-476t54-89.135q15.5-39.136 15.5-77.72Q820-709 778-751.5T670.225-794q-51.524 0-95.375 31.5Q531-731 504-674h-49q-26-56-69.85-88-43.851-32-95.375-32Q224-794 182-751.5t-42 108.816Q140-604 155.5-564.5t54 90Q248-424 314-358t166 158Zm0-297Z"/></svg>
            <span className="linka_title">{t('LayoutLove')}</span>
        </Link> */}
        <Link  className="linka" to="/Analyze"  id="Analyze" style={{backgroundColor:navPage=="/Analyze"? "rgb(141, 207, 230)":"lightblue"}} onClick={()=>{SetnavPage("/Analyze")}} >
            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="38"><path d="M172-120q-41.777 0-59.388-39Q95-198 124-230l248-280v-270h-52q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T320-840h320q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T640-780h-52v270l248 280q29 32 11.388 71-17.611 39-59.388 39H172Zm-12-60h640L528-488v-292h-96v292L160-180Zm318-300Z"/></svg>
            <span className="linka_title">{t('LayoutAnalyze')}</span>
        </Link>
                     
        
        <div className="other_settings_nav">
                        
        </div>
    </>
}
export default SideNav