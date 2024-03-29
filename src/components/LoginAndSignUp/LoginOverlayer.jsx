import React from 'react'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import Verify from './ResetPassword'
import { useState } from 'react'
import {ImCross} from "react-icons/im"
import EmailVerification from './EmailVerification'



const LoginOverlayer = ({loginVisible, setLoginVisible}) => {
    // const [isLogin, setIsLogin] = useState(true)
    //const [fadeUp, setFadeUp] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [isRegister, setRegister] = useState(false)
    const [isforgotPassword, setForgotPassword] = useState(false)
    const [isResetPassword, setResetPassword] = useState(false)
    const [isEmailVerify, setEmailVerify] = useState(false)

  return (
            // overflow-y-auto was added below
        <div className= {`${loginVisible ? "" : "hidden"} z-40 flex p-2  h-screen   justify-center items-center w-screen overflow-y-auto top-0 left-0 opacity-90 text-richwhite-100 bg-richblack-90 absolute`}>
            {/* Container */}
            {/* overflow-y-auto was added below */}
            <div className ={` bg-richblack-20 p-14  scrollbar  h-auto ${isRegister ? "mt-[40%] mb-[10%] ": ""} rounded-3xl w-[35%] animate-fadeDown  relative`}>

                <div 
                onClick={() => setLoginVisible(null)}
                className={` bg-richwhite-100 ${""}  text-richblack-90 cursor-pointer rounded-full w-fit absolute -top-2 -right-2 p-2 text-xs`}>
                    <ImCross/>
                </div>

                {/* Login page */}
                {
                    isLogin && <Login setIsLogin = {setIsLogin}  setEmailVerify = {setEmailVerify} setForgotPassword = {setForgotPassword} setLoginVisible = {setLoginVisible}/>
                }

                {/* Register */}
                {
                    isRegister && <Register setIsLogin = {setIsLogin} setRegister = {setRegister} setEmailVerify = {setEmailVerify} />
                }

                {/* Forgot password */}
                {
                    isforgotPassword && <ForgotPassword setIsLogin = {setIsLogin} setResetPassword = {setResetPassword} setForgotPassword = {setForgotPassword} />
                }

                {/* Reset password */}
                {
                    isResetPassword && <Verify setIsLogin = {setIsLogin} setResetPassword = {setResetPassword} setForgotPassword = {setForgotPassword}/>
                }

                {/* Email Verification for register */}
                {
                    isEmailVerify && <EmailVerification setIsLogin = {setIsLogin} setEmailVerify = {setEmailVerify}  setRegister = {setRegister}/>
                }
            </div>
        </div>

  )
}

export default LoginOverlayer