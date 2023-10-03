import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../images/logo.png"
import "../style/Layout.css"
import { useTranslation } from 'react-i18next';
import  Explore from "../pages/Search";
import Home from "../pages/home";
import TopNav from "./Layout/TopNav";
import SideNav from "./Layout/SideNav";
import List from "../pages/List";
import jwt_decode from "jwt-decode";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useListenForState } from "./Context";
const Layout=()=>{
    
    const {t}=useTranslation()
    const {AccessToken,setAccessToken,login,IsLogin}=useListenForState()
 
    const SaveAccesssToken=localStorage.getItem('access') 
    console.log(AccessToken)
    useEffect(()=>{
        
        if(SaveAccesssToken){
            setAccessToken(SaveAccesssToken)
            console.log(AccessToken,"asdasdwqqw")
             
            axios.post("http://127.0.0.1:8000/api/token/verify/",{
                "token": SaveAccesssToken
            },{headers: {
                
                "Content-Type": "application/json",
                'Authorization': `Bearer ${AccessToken}`,
                 
                }})
            .then(response=>{
                if(response.statusText="OK"){
                    IsLogin(true)
                }
                console.log( response ,"success" )
            }).catch(err=>{
                //沒傳AccessToken出去? SaveAccesssToken有
                
                if(err.response.statusText="Unauthorized"){
                    console.log("Token Expired")
                    IsLogin(false)
                    axios.post("http://127.0.0.1:8000/api/token/refresh/",{"refresh":localStorage.getItem('refresh')  })
                    .then(response=>{
                        console.log(response.data.access,"新token")
                        localStorage.setItem("access",response.data.access)
                        setAccessToken(response.data.access)
                        IsLogin(true)
                    })
                    .catch(error=>{
                        localStorage.removeItem("access")
                        localStorage.removeItem("refresh")
                        console.log(error,"新token失敗 refresh也失效?")
                        IsLogin(false)
                    })
                }else{
                    console.log("no login")
                    IsLogin(false)
                }
                
            })
        }
        
         
    },[])
    return(
        <>
         
            <div className="nav">
                <div className="side_nav">
                    <SideNav />
 
                </div>

                <div className="top_nav">                    
                    <div className="top_nav_left">
                         <TopNav/>
                         
                    </div>
                    <div className="top_nav_right">
                        {login && <>
                            <p>a</p>
                        </>
                            
                        || !login &&<>
                            <Link to="/SignUp" className="linkb">
                                {t('LayoutRigister')}
                            </Link>
                            <Link to="/Login" className="linkb">
                                {t('LayoutLogin')}
                            </Link>
                        </>
                        }
                        
                    </div>
                </div>

                <div className="right_main">
                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path="/Search" element={<Explore/>}/>
                        <Route path="/MyList" element={<List/>}/>
                    </Routes>
                     
                </div>
                

                <div className="login-play_nav">
                    <h1>000000000000</h1>
                </div>
                
            </div>
             
        </>
    )
}



export default Layout