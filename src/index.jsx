import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./style/Layout.css"
import Explore from "./pages/Search";
import React from "react";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Layout from "./components/Layout";
import List from "./pages/List";
import { ListenForStateProvider } from "./components/Context";
import styled from "@emotion/styled";

const App=()=>{
    const {t}=useTranslation()
    // const Layout=()=>{
    //     return<>
    //         <div className="nav">
    //                 <div className="side_nav">
    //                     <SideNav/>
    //                 </div>

    //                 <div className="top_nav">                    
    //                     <div className="top_nav_left">
    //                         {/* {ToPage.home && <p className="PageName"  >{t('LayoutHome')}</p>|| ToPage.search && <p className="PageName">{t('LayoutSearch')}</p>} */}
    //                 </div>
    //                 <div className="top_nav_right">
    //                     <Link to="/SignUp" className="linkb">
    //                         {t('LayoutRigister')}
    //                     </Link>
    //                     <Link to="/Login" className="linkb">
    //                         {t('LayoutLogin')}
    //                     </Link>
    //                 </div>
    //             </div>

    //             <div className="right_main">
    //                 {location.pathname==="/"&& <Home/>}
    //                 {location.pathname==="/Search"&& <Explore/>}
                            
    //             </div>
                        

    //             <div className="login-play_nav">
    //                 <h1>000000000000</h1>
    //             </div>
                    
    //         </div>
    //     </>
        
    // }
    React.useEffect(()=>{
        document.title=t('pageTitle')
         
    })
    return(

        <ListenForStateProvider>
            <BrowserRouter >
                <Routes>
                    {/* Layout內使用組件套用版型除了下面2個在之外的 */}
                    <Route path="/*" element={<Layout/>}></Route> 
                    <Route path="/SignUp" element={<Signup  />}/>
                    <Route path="/Login" element={<Login  />}/>
                     
                </Routes>

            </BrowserRouter>
        </ListenForStateProvider>
    )
}


export default App