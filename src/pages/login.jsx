import { useTranslation } from "react-i18next"
import logo from '../images/logo.png'
import {redirect } from "react-router-dom"
import { TextField ,FormHelperText} from "@mui/material"
import axios from "axios"
import { useState } from "react"
import '../style/login.css'
import Home from "./home"
import { useListenForState } from "../components/Context"

const Login=()=>{
    const {AccessToken,setAccessToken}=useListenForState()
    const {t}=useTranslation()
    const [user,Setuser]=useState({
        email:null,
        password:null
    })
    const [loginState,IsLogin]=useState(false)
    const [errorOutput,SeterrorOutput]=useState([null,null])
    const saveErr_msg = [null, null]
    const errMSG=[t('LoginErrMsg0'),t('LoginErrMsg1')]
    const NoEnter="請輸入"
    const handleChange=(e)=>{
        console.log(user)
        Setuser((p)=>({
            ...p,
            [e.target.name]:e.target.value 
        }))
    }

    let emailReg=new RegExp(/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,"g")
    let passwdReg=new RegExp(/^[a-zA-Z]\w{4,10}$/,"g")
    const Reg=[emailReg,passwdReg]
    
    const accountChack=(event)=>{
        const inputArry=[user.email,user.password]
        event.preventDefault()
        
        for(let submitCheck=0;submitCheck<inputArry.length;submitCheck++) {
            if(inputArry[submitCheck]?.match(Reg[submitCheck])){
                saveErr_msg[submitCheck]=null
                
            }else{
                if(!inputArry[submitCheck]?.match(Reg[submitCheck]) && inputArry[submitCheck]!=null){
                    saveErr_msg[submitCheck]=errMSG[submitCheck]
                }else if(inputArry[submitCheck]==null){
                    saveErr_msg[submitCheck]=NoEnter
                }
                
            }
        }
        SeterrorOutput(saveErr_msg)
        
        if(errorOutput[0]==null && errorOutput[1]==null){
            let forminfo=inputArry.concat()
            const formData=({
                email:forminfo[0],
                password:forminfo[1]
            })
            loginConn(formData)
            console.log(forminfo)
        }else if(errorOutput[0]!=null && errorOutput[1]!=null){
            console.log("禁止")
        }
    }

    

   function loginConn(formData){
 
            axios.post('http://127.0.0.1:8000/user/api/Login',formData  )
                .then(function(response){
                    console.log(response)
                    if(response.status=200){
                        console.log("成功")
                        localStorage.setItem("access",response.data.access)
                        localStorage.setItem("refresh",response.data.refresh)
                        setAccessToken(response.data.access)
                        window.location.href="http://localhost:5173/"
                    }else if(response.status=401){
                        console.log("no")
                        IsLogin(false)
                    }
                    
                }).catch(function(error){
                    console.log(error)
                    IsLogin(false)
                })
    }

    return <>
         
        <div className="login_container">
            <a href="/"><img id="img_logo" src={logo} width={"150px"} alt="" /></a>
            <h2>{t('LoginTitle')}</h2>
            <form id="login_form" onSubmit={accountChack} method="post">
                <div className="email_div">
                    <TextField  label={t('LoginEmail')} error={errorOutput[0]!=null&& true} name="email" type="text" variant="outlined" size="small" fullWidth onChange={handleChange}
                        onBlur={a=>{
                            const scanErr=errorOutput
                            if(typeof user.email == "string"){
                                if(!user.email.match(emailReg)){//當不符格式
                                    scanErr[0]=errMSG[0]
                                    SeterrorOutput({...errorOutput,scanErr,error:true})//()
                                }else{
                                    scanErr[0]=null
                                    SeterrorOutput({...errorOutput,scanErr,error:true})
                                }
                            }else if(user.email==""|| user.email==null){//當沒輸入 或 ""
                                scanErr[0]=NoEnter
                                SeterrorOutput({...errorOutput,scanErr,error:true})
                            }
    
                        }}
                    />
                    {errorOutput[0]!=null &&
                        <FormHelperText style={{color:'red'}} className="error_div">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="15" fill="red"><path d="M479.982-280q14.018 0 23.518-9.482 9.5-9.483 9.5-23.5 0-14.018-9.482-23.518-9.483-9.5-23.5-9.5-14.018 0-23.518 9.482-9.5 9.483-9.5 23.5 0 14.018 9.482 23.518 9.483 9.5 23.5 9.5ZM453-433h60v-253h-60v253Zm27.266 353q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Z"/></svg>
                            &nbsp;
                            <label className="err_warnning" >{errorOutput[0]}</label>
                        </FormHelperText>
                    }
                </div>
                <br/>
                <div className="password_div">
                    <TextField label={t('LoginPasswd')} error={errorOutput[1]!=null && true} name="password" type="password" variant="outlined" size="small" fullWidth onChange={handleChange}
                    onBlur={a=>{
                        const scanErr=errorOutput
                        if(typeof user.password == "string"){
                            if(!user.password.match(passwdReg)){
                                scanErr[1]=errMSG[1]
                                SeterrorOutput({...errorOutput,scanErr,error:true})
                            }else{
                                scanErr[1]=null
                                SeterrorOutput({...errorOutput,scanErr,error:true})
                            }
                        }else if(user.password==""|| user.password==null){
                            scanErr[1]=NoEnter
                            SeterrorOutput({...errorOutput,scanErr,error:true})
                        }
    
                    }}
                    />
                    {errorOutput[1]!=null &&
                        <FormHelperText style={{color:'red'}} className="error_div">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="15" fill="red"><path d="M479.982-280q14.018 0 23.518-9.482 9.5-9.483 9.5-23.5 0-14.018-9.482-23.518-9.483-9.5-23.5-9.5-14.018 0-23.518 9.482-9.5 9.483-9.5 23.5 0 14.018 9.482 23.518 9.483 9.5 23.5 9.5ZM453-433h60v-253h-60v253Zm27.266 353q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Z"/></svg>
                            &nbsp;
                            <label className="err_warnning" >{errorOutput[1]}</label>
                        </FormHelperText>
                    }
                </div>
                <br/>
                <button type="submit" id="submit_btn">{t('LoginBtn')}</button>
                <hr/>
                <p >{t('LoginNoHasTxt')}<a href="/SignUp" style={{color:"blue" ,textDecoration:"underline"}}>{t('LogingoReg')}</a></p>
            </form>
        </div>
         
    
    </>
    
}
export default Login