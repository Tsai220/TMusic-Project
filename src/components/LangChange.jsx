import { FormControl ,InputLabel,Select,MenuItem} from "@mui/material";
import { useListenForState } from "./Context";
import i18next from "i18next";
import LanguageIcon from '@mui/icons-material/Language';
import { useEffect, useState } from "react";
import { v4 } from "uuid";
const LangChange=()=>{
    const {lang,Setlang,langType,SetLangType}=useListenForState()
    
    
    useEffect(()=>{
        let currentLang=i18next.resolvedLanguage
        Setlang(currentLang)
        SetLangType(langAll)
 
    },[])
    let langAll=[
        {type:"zh",name:"繁體中文"},
        {type:"en",name:"English"},
        {type:"ja",name:"日本語"},
     ]
    return <FormControl fullWidth sx={{width:"100%",flexDirection:"row",alignItems:"center" }} >
                            
        <InputLabel id="lang_label" ><LanguageIcon /></InputLabel>
        <Select fullWidth label={<LanguageIcon />} labelId="lang_label" value={lang} defaultValue={lang} onChange={(thisLang)=>{
                            Setlang(thisLang.target.value)
                            i18next.changeLanguage(thisLang.target.value)
                        }}>
                
                {
                    langAll.map(lang=>{
                        return <MenuItem key={v4()} value={lang.type} >{lang.name}</MenuItem>
                        
                    })
                }
          
        </Select>

    </FormControl>
}
export default LangChange