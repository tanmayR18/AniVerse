import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../service/apiconnector';
import { auth } from '../../service/apis';
import { toast } from 'react-hot-toast';


const Verify = ({setIsLogin, setResetPassword, setForgotPassword}) => {
    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} =  useForm();
    const [verified, setVerified] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    function onChange(value) {
        console.log("Captcha value:", value);
        setVerified(true)
      }

      const submitHandler = async (data) => {
        try{
            toast.loading("Updating your password")
            const response = await apiConnector("POST", auth.RESET_PASSWORD, data)
            if(response.data.success === true){
                toast.dismiss()
                toast.success("Password Updated successfully")
                setResetPassword(false)
                setIsLogin(true)
            }
            console.log("Login Resonse",response)
        } catch(error){
            console.log("Login Error", error)
            setErrorMsg(error.response.data.message)
        }   
        setTimeout(() => {toast.dismiss()},2500)
        
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                token:"",
                password:"",
                confirmPassword:""
            })
        }
    },[reset, isSubmitSuccessful])
  return (
    <div className=' flex flex-col gap-6  w-full justify-center items-center'>

        {/* Reading */}
        <h1 className=' font-bold text-[1.3rem] tracking-wider '>Reset Password</h1>

        {/* For error display */}
        {
            errorMsg && <div className=' bg-richpink-10 text-socialMedia-reddit w-full font-bold p-1'>
                <p>{errorMsg}</p>
            </div>
        }

        <form
        className=' flex flex-col gap-6 w-full justify-center items-center'
        onSubmit={handleSubmit(submitHandler)}
        >
            {/* Token */}
            <div className='flex flex-col w-full gap-2'> 
                <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>
                    Token
                </label>
                    <input
                        className=' text-richblack-90 p-1 rounded-[4px] outline-none focus:border-2 focus:border-socialMedia-telegram'
                        type='token'
                        name='token'
                        required
                        id='token'
                        placeholder='Eg - jdhbjhdbcsdbcjh'
                        {...register("token",{required:true})}
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
                        id='password'
                        placeholder='Eg - jdhbjhdbcsdbcjh'
                        {...register("password",{required:true})}
                    />
            </div>

            {/* confirmPassword */}
            <div className='flex flex-col w-full gap-2'> 
                <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>
                    Confirm Password
                </label>
                    <input
                        className=' text-richblack-90 p-1 rounded-[4px] outline-none focus:border-2 focus:border-socialMedia-telegram'
                        type='password'
                        name='confirmPassword'
                        required
                        id='confirmPassword'
                        placeholder='Eg - jdhbjhdbcsdbcjh'
                        {...register("confirmPassword",{required:true})}
                    />
            </div>

            <ReCAPTCHA
            className='self-start'
                sitekey= "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
                theme={"dark"}
            />

            <button
            className='w-full text-richblack-90 font-bold bg-richyellow-40 rounded-lg p-2'
            disabled = {!verified}>
                Reset
            </button>
        </form>
        
        <div>
            <p>
                <span
                className=' text-richyellow-40 cursor-pointer'
                onClick={() => {
                    setResetPassword(false)
                    setForgotPassword(true)
                }}
                >
                    Resent OTP
                </span>

                {" "} or {" "}
                
                <span
                className=' text-richyellow-40 cursor-pointer'
                onClick={() => {
                    setIsLogin(true)
                    setResetPassword(false)
                }}
                >Login</span>
            </p>
            
        </div>
    </div>
  )
}

export default Verify