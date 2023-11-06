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
import { ListenForStateProvider } from "./components/Context";
import { LinearProgress,Typography } from "@mui/material"
 import LogoTMusic from "./components/logo";
 import "../src/style/index.css"

class LoadingProgress extends Component {
    constructor(props){
        super(props)
        this.state={loadingProgress:props.loadingProgress,isLoadDone:props.isLoadDone}

    }
    componentDidMount(){
        const simLoad=()=>{
            const timer=setInterval(()=>{
                if(this.state.loadingProgress<100){
                    //this.setState({ loadingProgress:this.state.loadingProgress +15})
                     this.setState({ loadingProgress:this.state.loadingProgress + Math.floor(Math.random()*15)})
                    
                }
                else{
                    clearInterval(timer)
                    this.setState({isLoadDone:true ,loadingProgress:100})
                    return this.state.isLoadDone==true ,this.state.loadingProgress , console.log(this.state.isLoadDone ,this.state.loadingProgress)
                }
            },500)
        }
        simLoad()
    }
    
    render(){
        return <div>
            {this.state.loadingProgress<100? ( <div className="progress" style={{display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",textAlign:"center"}}>
                    <LogoTMusic  />
                    <br/>
                    <div  style={{display:"flex", alignItems:"center" , justifyContent:"center",width:"70%"}}>
                        <LinearProgress  variant="determinate" value={this.state.loadingProgress} style={{width:"50%"}} />
                        &nbsp;<Typography variant="h6" >{this.state.loadingProgress}%</Typography>
                        
                    </div>
                </div>
            ):(

                <Routes>
                                
                    {/* Layout內使用組件套用版型除了下面2個在之外的 */}
                    <Route path="/*" element={<Layout/>}/>
                    <Route path="/SignUp" element={<Signup  />}/>
                    <Route path="/Login" element={<Login  />}/>
                </Routes>

            )

            }
            
        </div>
    }
}

const App=()=>{
    const {t}=useTranslation()
     

    React.useEffect(()=>{
        document.title=t('pageTitle')
    })
    
    return(

         <>
         <ListenForStateProvider>
            <BrowserRouter >
                <LoadingProgress isLoadDone={false} loadingProgress={0} />
            </BrowserRouter>
            
         </ListenForStateProvider>
         
         </>
    )
}


export default App