import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import ReCAPTCHA from "react-google-recaptcha";
import { apiConnector } from '../../service/apiconnector';
import { auth } from '../../service/apis';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../slices/authSlice';

const Login = ({setIsLogin, setForgotPassword, setEmailVerify, setLoginVisible}) => {
    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} =  useForm();
    const [verified, setVerified] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    // const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    
    
    

    function onChange(value) {
        console.log("Captcha value:", value);
        setVerified(true)
      }
     
    const submitHandler = async (data) => {
        try{
            const response = await apiConnector("POST", auth.LOG_IN, data)
            console.log("Login Resonse",response)

            if(response.data.success === true){
                toast.success("Logged In")
                // setUser(response.data)
                dispatch(logIn(response.data))
                setLoginVisible(false)
                
            }
        } catch(error){
            console.log("Login Error", error)
            setErrorMsg(error.response.data.message)
        }   
    }

    // useEffect(() => {
    //     console.log("User data inside LOGIN page", user)
    //     dispatch(logIn(user))
    // },[user])
 

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email: "",
                password: ""
            })
        }
    },[reset, isSubmitSuccessful])

  return (
    <div className=' flex flex-col gap-6  w-full justify-center items-center'>
        {/* Heading */}
        <h1
        className=' font-bold text-[1.3rem] tracking-wider '
        >Welcome Back!</h1>
        
        {/* For error message */}
        {
            errorMsg && <div className=' bg-richpink-10 text-socialMedia-reddit w-full font-bold p-1'>
                            <p>{errorMsg}</p>
                        </div>
        }
        
        {/* Login form */}
        <form 
        className=' flex flex-col gap-6 w-full justify-center items-center'
        onSubmit={handleSubmit(submitHandler)}> 

            {/* Emial Address */}
            <div className='flex flex-col w-full gap-2'>
                <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>
                    Email Address   
                </label>
                <input
                    className=' text-richblack-90 p-1 rounded-[4px] outline-none focus:border-2 focus:border-socialMedia-telegram'
                        type='text'
                        name='email'
                        required
                        id='email'
                        placeholder='Enter Your Name'
                    {...register("email",{required:true})}
                />
            </div>
                
            {/* Password */}
            <div className='flex flex-col w-full gap-2'> 
                <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>
                    Password
                </label>
                    <input
                        className=' text-richblack-90 p-1 rounded-[4px] outline-none focus:border-2 focus:border-socialMedia-telegram'
                        type='password'
                        name='password'
                        required
                        autoComplete="current-password"
                        id='password'
                        placeholder='Enter the password'
                        {...register("password",{required:true})}
                    />
            </div>

            {/* Remember me and forgot password */}
            <div className='flex w-full justify-between'>
                <div className='flex gap-2'>
                    <input 
                        type='checkbox'
                        name='rememberMe'
                        id='rememberMe'
                        {...register("rememberMe")}
                    />
                    <label
                    className='tracking-wide text-[17px]'
                    htmlFor='rememberMe'>Remember Me</label>
                </div>
                <div>
                    <p
                    className=' text-richyellow-40 cursor-pointer'
                    onClick={() => {
                        setIsLogin(false)
                        setForgotPassword(true)
                    }}
                    >Forgot Password?</p>
                </div>
            </div>
            

            <ReCAPTCHA
                className=' self-start'
                sitekey= "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
                theme={"dark"}
            />

            <button
            className='w-full text-richblack-90 font-bold bg-richyellow-40 rounded-lg p-2'
            disabled = {!verified}>
                Login
            </button>

            {/* Other Navigations */}
            <div className=''>
                Don't have account? 
                {" "}
                <span
                className=' text-richyellow-40 cursor-pointer'
                onClick={() => {
                    setIsLogin(false)
                    setEmailVerify(true)
                }}
                >
                    Register 
                </span>
                
            </div>
        </form>
    </div>
  )
}

export default Login