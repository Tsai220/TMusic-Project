import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
 
import { useTranslation } from "react-i18next";
import "./style/Layout.css"
import Explore from "./pages/Search";
import React, { useEffect, useState } from "react";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Layout from "./components/Layout";
import List from "./pages/List";
import { ListenForStateProvider } from "./components/Context";
import LoadingProgress from "./components/Loading";

const App=()=>{
    const {t}=useTranslation()
     
    const [load,isloadDone]=useState(loadState.props.isLoadDone)
    React.useEffect(()=>{
        document.title=t('pageTitle')
        
        
         
    })
    const timer=(loadVal)=>setInterval(()=>{
        if (!loadVal){
            isloadDone(true)
        }
    },600)
    timer(load)
    return(

        <ListenForStateProvider>
            <BrowserRouter >
                
                {!load&&
                    <>
                    <LoadingProgress isLoadDone={false} loadingProgress={0}  />
                    
                    </>
                ||load&&
                    <Routes>
                        
                        {/* Layout內使用組件套用版型除了下面2個在之外的 */}
                        <Route path="/*" element={<Layout/>}/>
                        <Route path="/SignUp" element={<Signup  />}/>
                        <Route path="/Login" element={<Login  />}/>
                    
                    </Routes>

                }
                 
                
                
                 
                

            </BrowserRouter>
        </ListenForStateProvider>
    )
}


export default App