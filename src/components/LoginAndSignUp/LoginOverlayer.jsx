import React from 'react'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import Verify from './ResetPassword'
import { useState } from 'react'
import {ImCross} from "react-icons/im"



const LoginOverlayer = ({loginVisible, setLoginVisible}) => {
    // const [isLogin, setIsLogin] = useState(true)
    const [fadeUp, setFadeUp] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [isRegister, setRegister] = useState(false)
    const [isforgotPassword, setForgotPassword] = useState(false)
    const [isRestPassword, setResetPassword] = useState(false)

  return (
        <div className= {`${loginVisible ? "" : "hidden"} flex  justify-center items-center w-screen h-screen top-0 left-0 opacity-90 text-richwhite-100 bg-richblack-90 absolute`}>
            {/* Container */}
            <div className = {`bg-richblack-25 animate-fadeDown  relative` }>
                <div 
                onClick={() => setLoginVisible(false)}
                className=' bg-richwhite-100 text-richblack-90 cursor-pointer rounded-full w-fit absolute -top-2 -right-2 p-2 text-xs'>
                    <ImCross/>
                </div>
                {
                    isLogin && <Login setIsLogin = {setIsLogin}  setRegister = {setRegister}/>
                }
                {
                    isRegister && <Register setIsLogin = {setIsLogin} setRegister = {setRegister} />
                }
                {
                    isforgotPassword && <ForgotPassword setIsLogin = {setIsLogin} setResetPassword = {setResetPassword} setRegister = {setRegister} />
                }
                {
                    isRestPassword && <Verify setIsLogin = {setIsLogin} setForgotPassword = {setForgotPassword} setRegister = {setRegister} />
                }
            </div>
        </div>

  )
}

export default LoginOverlayer