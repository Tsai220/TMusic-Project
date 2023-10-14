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
import { useListenForState } from "./Context";

const Layout=()=>{
    
    const {t}=useTranslation()
    const {chooseV,AccessToken,setAccessToken,login,IsLogin,userNick,SetUserNick}=useListenForState()
    console.log(AccessToken)
    let SaveAccesssToken=localStorage.getItem('access') //可能導致錯誤
     
    useEffect(()=>{
        
        if(SaveAccesssToken){
            setAccessToken(SaveAccesssToken)
           
            // "http://127.0.0.1:8000/api/token/verify/"
            axios.post("http://127.0.0.1:8000/user/api/auth",{
                "token": SaveAccesssToken,
                'rToken':localStorage.getItem("refresh")
            },{headers: {
                
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                 
                }})
            .then(response=>{
                console.log(response,"qwdwq")
                if(response.statusText="OK"){
                    SetUserNick(response.data)
                    IsLogin(true)
                    
                }
                 
            }).catch(err=>{
                //沒傳AccessToken出去? SaveAccesssToken有
                 
                if(err.response.statusText="Unauthorized"){
                    console.log("Token Expired")
                    IsLogin(false)
                    axios.post("http://127.0.0.1:8000/api/token/refresh/",{"refresh":localStorage.getItem('refresh')  })
                    .then(response=>{
                        console.log(response)
                        console.log(response.data.access,"新token")
                        localStorage.setItem("access",response.data.access)
                        setAccessToken(response.data.access)
                        SetUserNick(response.data)
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
    console.log(login,"登入狀態")
     
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
                            <p>{userNick}</p>
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
                    <h1>Sample Layout</h1>
                     
                </div>
                
            </div>
           
             
        </>
    )
}



export default Layout