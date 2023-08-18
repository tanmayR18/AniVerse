import React from 'react'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import Verify from './Verify'
import { useState } from 'react'
import {ImCross} from "react-icons/im"



const LoginOverlayer = ({loginVisible, setLoginVisible}) => {
    // const [isLogin, setIsLogin] = useState(true)
    const [isLogin, setIsLogin] = useState(true)
    const [isRegister, setRegister] = useState(false)
    const [isforgotPassword, setForgotPassword] = useState(false)
    const [isVerify, setVerify] = useState(false)

  return (
        <div className= {`${loginVisible ? "flex" : "hidden"}  justify-center items-center w-screen h-screen top-0 left-0 opacity-90 text-richwhite-100 bg-richblack-90 absolute`}>
            {/* Container */}
            {/* ${loginVisible ? "translate-y-0" : "translate-y-20"} transition-all duration-500 */}
            <div className = {`bg-richblack-25  animate-trans-right relative` }>
                <div 
                onClick={() => setLoginVisible(false)}
                className=' bg-richwhite-100 text-richblack-90 cursor-pointer rounded-full w-fit absolute -top-2 -right-2 p-2 text-xs'>
                    <ImCross/>
                </div>
                {
                    isLogin && <Login  setForgotPassword = {setForgotPassword} setVerify = {setVerify} setRegister = {setRegister}/>
                }
                {
                    isRegister && <Register setIsLogin = {setIsLogin} setForgotPassword = {setForgotPassword} setVerify = {setVerify}/>
                }
                {
                    isforgotPassword && <ForgotPassword setIsLogin = {setIsLogin} setVerify = {setVerify} setRegister = {setRegister} />
                }
                {
                    isVerify && <Verify setIsLogin = {setIsLogin} setForgotPassword = {setForgotPassword} setRegister = {setRegister} />
                }
            </div>
        </div>

  )
}

export default LoginOverlayer