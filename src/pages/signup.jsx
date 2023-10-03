import { useState } from "react"


import logo from '../images/logo.png'
import axios from "axios"
import { useTranslation } from 'react-i18next';
import { Box,TextField ,FormHelperText} from "@mui/material";
import '../style/signup.css'
const Signup=()=>{
    

    const {t}=useTranslation()
    const [reg,Isreg]=useState(false)
    
    const [user,setUser]=useState({
        email:null,
        password:null,
        passwordV2:null,
        nickname:null,
        birth:null,
        gender:"boy"
    })
     
       
    const handleChange=(e)=>{
        setUser((prev)=>({
            ...prev,
            [e.target.name]:e.target.value, //[e.target.name] 是指當前input的name 
             
        }))
        console.log(user)
        console.log([e.target.name])
    }
     
     
    const [errorInput,setInputError]=useState([
        null,null,null,null,null,null
    ])
    

    let emailReg=new RegExp(/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,"g")
    let passwdReg=new RegExp(/^[a-zA-Z]\w{4,10}$/,"g")
    let passwdReg2=new RegExp(`^${user.password}$`)
    let nicknameReg=new RegExp(/^[A-Za-z0-9]{4,10}$/,"g")
    let birthReg= new RegExp(/^\d{4}-\d{1,2}-\d{1,2}/,"g")
    let genderReg= new RegExp(/^(boy|girl|neutral|noAws)$/,"g")
    
    const Reg_array=[
        emailReg,
        passwdReg,
        passwdReg2,
        nicknameReg,
        birthReg,
        genderReg,
    ]

    
    const ErrMsg=[
        t('SignUpErrMsg0'),
        t('SignUpErrMsg1'),
        t('SignUpErrMsg2'),
        t('SignUpErrMsg3'),
        t('SignUpErrMsg4'),
        t('SignUpErrMsg5'),
    ]
    const ErrMsg2=t('SignUpNoEnter')

    
    const saveErr_msg = [null, null, null, null, null]
    
    //提交格式驗證
    const submit_click=(event) =>{
        const UserArry=[user.email,user.password,user.passwordV2,user.nickname,user.birth,user.gender]
        event.preventDefault();
       

        
        for (let UsrArr_check = 0; UsrArr_check < UserArry.length; UsrArr_check++) {
            if (UserArry[UsrArr_check]?.match(Reg_array[UsrArr_check])) { 

                saveErr_msg[UsrArr_check] = null
                

            } else {
                if (!UserArry[UsrArr_check]?.match(Reg_array[UsrArr_check]) && UserArry[UsrArr_check] != null) { ////錯誤情況:不符格式
                    saveErr_msg[UsrArr_check] = ErrMsg[UsrArr_check]
                    
                } else if (UserArry[UsrArr_check] == null) { //錯誤情況:未輸入 (將沒被輸入的input顯示錯誤)
                    saveErr_msg[UsrArr_check] = ErrMsg2
                    

                }
            }

        }
        setInputError(saveErr_msg)
        

        if (saveErr_msg[0] == null && saveErr_msg[1] == null && saveErr_msg[2] == null && saveErr_msg[3] == null && saveErr_msg[4] == null && saveErr_msg[5] == null) { //檢查6個input中是否有錯誤訊息 若沒繼續傳資料
            //可放行
            
            let formInfo=UserArry.concat()
            const formData={        
                
                user:formInfo[3],
                email:formInfo[0],
                password:formInfo[1],
                birthday:formInfo[4],
                gender:formInfo[5]
            }
            checkForm_format(formData)
            
            
            
        } else if ((saveErr_msg[0] == null && saveErr_msg[1] == null && saveErr_msg[2] == null && saveErr_msg[3] == null && saveErr_msg[4] == null && saveErr_msg[5] == null) == false) {
            //不放行:重新輸入正確資料
            return
        }

    }
  
    function checkForm_format(formData){
        console.log(formData)
        axios.post("http://127.0.0.1:8000/user/api/Register",formData)
            .then(function(response){
                console.log(response)
                
                if(response.status==200){
                    Isreg(true)
                    alert(response.data)
                }
                
                    
                
                //完成回傳後轉跳
            })
            .catch(error=>{
                console.log(error)
                if(error.response.status==409){
                    Isreg(false)
                    document.getElementById('sign_form').reset()
                    setUser({email:null,password:null,passwordV2:null,nickname:null,birth:null,gender:"boy"})
                    alert("該電子郵件已被註冊")
                }
                //顯示錯誤種類:1.已註冊 2.錯誤欄位(紅字) 
            })
        //python後端: django ; 資料庫 postgresql
    }

    if(reg){
        return <div className="RegDone_container">
            <a href="/"><img id="img_logo" src={logo} width={"150px"} alt="" /></a>
            <h2 className="RegDoneTitle">{t('SignUpRegdonetitle')}</h2>
            <a href="/Login"><button className="RegDoneBtn">{t('SignUpRegdoneBtn')}</button></a>
        </div>
    }

    
    return <div id="sign_container">
        <a href="/"><img id="img_logo" src={logo} width={"150px"} alt="" /></a>
        <h1 style={{margin:"2%"}}>{t('SignUpTitle')}</h1>
        <br/>
        <form id="sign_form"  onSubmit={submit_click}  >
            <div id="email_div">
                 
                <TextField   error={errorInput[0] != null}   label={t('SignUpEmail')} name="email"  type="text" className="email_input"  variant="outlined"  size="small" fullWidth  onChange={handleChange} onBlur={a=>{
                    
                    const lastSaveErr=errorInput

                    if ( typeof user.email === 'string') {//user.email 變每個input都可
                        if(!user.email.match(emailReg)){
                            lastSaveErr[0]=ErrMsg[0]
                            
                            setInputError({...errorInput,lastSaveErr,error:true})
                            
                        }else{
                            lastSaveErr[0] = null
                            setInputError({...errorInput,lastSaveErr })
                        }
                    }else if (user.email===''||user.email==null){
                        lastSaveErr[0]=ErrMsg2
                        setInputError({...errorInput,lastSaveErr,error:true})
                    }
                }} sx={{
                    '& .MuiOutlinedInput-root': {
                      borderColor: errorInput[0] != null ? 'black' : 'red', // 根据错误状态设置边框颜色
                    },
                  }}/>
                 
                {errorInput[0]!=null &&

                    <FormHelperText style={{color:'red'}} className="error_div">  
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="15" fill="red"><path d="M479.982-280q14.018 0 23.518-9.482 9.5-9.483 9.5-23.5 0-14.018-9.482-23.518-9.483-9.5-23.5-9.5-14.018 0-23.518 9.482-9.5 9.483-9.5 23.5 0 14.018 9.482 23.518 9.483 9.5 23.5 9.5ZM453-433h60v-253h-60v253Zm27.266 353q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Z"/></svg>
                        &nbsp;
                        <label className="err_warnning" >{errorInput[0]}</label>
                    </FormHelperText>
                }
            </div>
            <br/>
            <div id="passwd_div">
                <TextField type="password"   error={errorInput[1] != null} name="password" label={t('SignUpPasswd')} variant="outlined"  size="small" fullWidth    onChange={handleChange}  onBlur={a=>{
                        const lastSaveErr=errorInput
                        if ( typeof user.password === 'string') {//user.email 變每個input都可
                            if(!user.password.match(passwdReg)){
                                lastSaveErr[1]=ErrMsg[1]
                                setInputError({...errorInput,lastSaveErr,error:true})
                            }else{
                                lastSaveErr[1] = null
                                setInputError({...errorInput,lastSaveErr,error:true})
                            }
                        }else if (user.password===''||user.password==null){
                            lastSaveErr[1]=ErrMsg2
                            setInputError({...errorInput,lastSaveErr,error:true})
                        }
                    }} sx={{
                        '& .MuiOutlinedInput-root': {
                          borderColor: errorInput[1] != null ? 'black' : 'red', 
                        },
                      }}/>
                {errorInput[1]!=null &&
                    <FormHelperText style={{color:'red'}} className="error_div">  
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="15" fill="red"><path d="M479.982-280q14.018 0 23.518-9.482 9.5-9.483 9.5-23.5 0-14.018-9.482-23.518-9.483-9.5-23.5-9.5-14.018 0-23.518 9.482-9.5 9.483-9.5 23.5 0 14.018 9.482 23.518 9.483 9.5 23.5 9.5ZM453-433h60v-253h-60v253Zm27.266 353q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Z"/></svg>
                        &nbsp;
                        <label className="err_warnning" >{errorInput[1]}</label>
                    </FormHelperText>
                }
                {/* 顯示密碼 */}
            </div><br/>
            <div id="passwd_div2">
                <TextField  error={errorInput[2] != null}  type="password" id="passwd2_input" label={t('SignUpPasswdV2')} variant="outlined"  size="small" fullWidth name="passwordV2"  onChange={handleChange} onBlur={a=>{
                    const lastSaveErr=errorInput
                    if ( typeof user.passwordV2 === 'string') {
                        if(!user.passwordV2.match(passwdReg2)){
                            lastSaveErr[2]=ErrMsg[2]
                            setInputError({...errorInput,lastSaveErr})
                        }else{
                            lastSaveErr[2] = null
                            setInputError({...errorInput,lastSaveErr})
                        }
                    }else if (user.passwordV2===''||user.passwordV2==null){
                        lastSaveErr[2]=ErrMsg2
                        setInputError({...errorInput,lastSaveErr})
                    }
                }} sx={{
                    '& .MuiOutlinedInput-root': {
                      borderColor: errorInput[2] != null ? 'black' : 'red', // 根据错误状态设置边框颜色
                    },
                  }}/>
                {errorInput[2]!=null &&
                    <FormHelperText style={{color:'red'}} className="error_div">  
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="15" fill="red"><path d="M479.982-280q14.018 0 23.518-9.482 9.5-9.483 9.5-23.5 0-14.018-9.482-23.518-9.483-9.5-23.5-9.5-14.018 0-23.518 9.482-9.5 9.483-9.5 23.5 0 14.018 9.482 23.518 9.483 9.5 23.5 9.5ZM453-433h60v-253h-60v253Zm27.266 353q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Z"/></svg>
                        &nbsp;
                        <label className="err_warnning" >{errorInput[2]}</label>
                    </FormHelperText>
                }
            </div>
            <br/>
            <div id="name_div">
                <TextField error={errorInput[3] != null}    type="text" name="nickname" label={t('SignUpName')} variant="outlined"  size="small" fullWidth onChange={handleChange} onBlur={a=>{
                    const lastSaveErr=errorInput
                    if ( typeof user.nickname === 'string') {//user.email 變每個input都可
                        if(!user.nickname.match(nicknameReg)){
                            lastSaveErr[3]=ErrMsg[3]
                             setInputError({...errorInput,lastSaveErr})
                        }else{
                            lastSaveErr[3] = null
                             setInputError({...errorInput,lastSaveErr})
                        }
                    }else if (user.nickname===''||user.nickname==null){
                        lastSaveErr[3]=ErrMsg2
                        setInputError({...errorInput,lastSaveErr})
                    }
                }} sx={{
                    '& .MuiOutlinedInput-root': {
                      borderColor: errorInput[3] != null ? 'black' : 'red', // 根据错误状态设置边框颜色
                    },
                  }}/>
                {errorInput[3]!=null &&
                    <FormHelperText style={{color:'red'}} className="error_div">  
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="15" fill="red"><path d="M479.982-280q14.018 0 23.518-9.482 9.5-9.483 9.5-23.5 0-14.018-9.482-23.518-9.483-9.5-23.5-9.5-14.018 0-23.518 9.482-9.5 9.483-9.5 23.5 0 14.018 9.482 23.518 9.483 9.5 23.5 9.5ZM453-433h60v-253h-60v253Zm27.266 353q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Z"/></svg>
                        &nbsp;
                        <label className="err_warnning" >{errorInput[3]}</label>
                    </FormHelperText>
                }
            </div>
            <br/>
            <div id="birth_div">

                <TextField label={t('SignUpBirth')}   error={errorInput[4] != null} type="date" name="birth"size="small" fullWidth  onChange={handleChange} onBlur={a=>{
                    const lastSaveErr=errorInput
                    if ( typeof user.birth === 'string') {
                        if(!user.birth.match(birthReg)){
                            lastSaveErr[4]=ErrMsg[4]
                            setInputError({...errorInput,lastSaveErr})
                        }else{
                            lastSaveErr[4] = null
                            setInputError({...errorInput,lastSaveErr})
                        }
                    }else if (user.birth===''||user.birth==null){
                        lastSaveErr[4]=ErrMsg2
                        setInputError({...errorInput,lastSaveErr})
                    }

                }} sx={{
                    '& .MuiOutlinedInput-root': {
                    borderColor: errorInput[0] != null ? 'black' : 'red', // 根据错误状态设置边框颜色
                    },
                }}  InputLabelProps={{shrink:true}} 
                />
                {errorInput[4]!=null &&
                    <FormHelperText style={{color:'red'}} className="error_div">  
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="15" fill="red"><path d="M479.982-280q14.018 0 23.518-9.482 9.5-9.483 9.5-23.5 0-14.018-9.482-23.518-9.483-9.5-23.5-9.5-14.018 0-23.518 9.482-9.5 9.483-9.5 23.5 0 14.018 9.482 23.518 9.483 9.5 23.5 9.5ZM453-433h60v-253h-60v253Zm27.266 353q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Z"/></svg>
                        &nbsp;
                        <label className="err_warnning" >{errorInput[4]}</label>
                    </FormHelperText>
                }
            </div>
            <br/>
            <label style={{fontWeight:700 }}>{t('SignUpGender')}</label> 
            <div id="gender_div">
                <div  id="radio_boy"><input type="radio" name="gender" value="boy" defaultChecked  onChange={handleChange} /><label>{t('SignUpBoy')}</label></div>
                <div id="radio_girl"><input type="radio"  name="gender" value="girl"  onChange={handleChange}/><label>{t('SignUpGirl')}</label></div>
                <div id="radio_neutral"><input type="radio"  name="gender" value="neutral" onChange={handleChange} /><label>{t('SignUpNeutral')}</label></div>
                <div id="radio_genderNo"><input type="radio"  name="gender" value="noAws" onChange={handleChange}/><label>{t('SignUpNo')}</label></div>
            </div>
            <button type="submit" id="submit_btn">{t('SignUpSignUpBTN')}</button>
            <hr/>
            <p >{t('SignUpHasTxt')}  <a href="/Login" style={{color:"blue" ,textDecoration:"underline"}}>{t('SignUpHasLink')}</a></p>
        </form>
        
    
    </div>
}
export default Signup