import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
 
import { useTranslation } from "react-i18next";
import "./style/Layout.css"
import Explore from "./pages/Search";
import React, { useEffect, useState ,Component} from "react";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Layout from "./components/Layout";
import List from "./pages/List";
import { ListenForStateProvider, useListenForState } from "./components/Context";
 
 
 import "../src/style/index.css"

 import LoadingProgress from "./components/Loading";


const App=()=>{
    const {t}=useTranslation()
     

    React.useEffect(()=>{
        document.title=t('pageTitle') 
        
    } )
    
    return(

         <>
         <ListenForStateProvider>
            <BrowserRouter >
                <Routes>
                    <Route path="/*" element={<Layout/>}/>
                     
                    <Route path="/SignUp" element={<Signup  />}/>
                    <Route path="/Login" element={<Login  />}/>
                    
                </Routes>
                
                
                
            </BrowserRouter>
            
         </ListenForStateProvider>
         
         </>
    )
}


export default App