import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from "react-google-recaptcha";
import { apiConnector } from '../../service/apiconnector';
import { auth } from '../../service/apis';
import { toast } from 'react-hot-toast';


const Register = ({setIsLogin, setRegister, setEmailVerify}) => {
    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} =  useForm();
    const [verified, setVerified] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    function onChange(value) {
        console.log("Captcha value:", value);
        setVerified(true)
      }

      const submitHandler = async (data) => {
        try{
            toast.loading("Registering")
            console.log("Register data",data)
            const response = await apiConnector("POST", auth.SIGN_UP, data)
            console.log("Login Resonse",response)
            if(response.data.success === true){
                toast.dismiss()
                toast.success("Registered successfully")
                setRegister("false")
                setIsLogin("true")
            }
        } catch(error){
            console.log("Login Error", error)
            setErrorMsg(error.response.data.message)
        }   
        setTimeout(() => {toast.dismiss()},2500)
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                userName: "",
                password: "",
                confirmPassword: "",
                email: "",
                otp: "",
                accountType: ""
            })
        }
    },[reset, isSubmitSuccessful])
  return (
    <div className=' flex z-50 flex-col gap-6  w-full justify-center items-center'>

        {/* Heading */}
        <h1
        className=' font-bold text-[1.3rem] tracking-wider '
        >Create an account</h1>

        {/* For error display */}
        {
            errorMsg &&  <div className=' bg-richpink-10 text-socialMedia-reddit w-full font-bold p-1'>
                <p>{errorMsg}</p>
            </div>
        }

        {/* Register form */}
        <form
        className=' flex flex-col gap-6 w-full justify-center items-center'
        onSubmit={handleSubmit(submitHandler)}
        >
            {/* User name */}
            <div className='flex flex-col w-full gap-2'>
                <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>
                    Your name
                </label>
                <input
                    className=' text-richblack-90 p-1 rounded-[4px] outline-none focus:border-2 focus:border-socialMedia-telegram'
                        type='text'
                        name='userName'
                        required
                        id='userName'
                        autoComplete="username"
                        placeholder='Enter Your Name'
                    {...register("userName",{required:true})}
                />
            </div>

            {/* Email address */}
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
                        placeholder='Enter Your Email'
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
                        id='password'
                        placeholder='Password'
                    {...register("password",{required:true})}
                />
            </div>

            {/* Confirm Password */}
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
                        placeholder='Confirm Password'
                    {...register("confirmPassword",{required:true})}
                />
            </div>

            {/* OTP */}
            <div className='flex flex-col w-full gap-2'>
                <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>
                    OTP
                </label>
                <input
                    className=' text-richblack-90 p-1 rounded-[4px] outline-none focus:border-2 focus:border-socialMedia-telegram'
                        type='text'
                        name='otp'
                        required
                        id='otp'
                        placeholder='Eg. 193524'
                    {...register("otp",{required:true})}
                />
            </div>

            {/* Account type */}
            <div className='flex flex-col w-full gap-2'>
                <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>
                    Type
                </label>
                <select
                    className=' text-richblack-90 p-1 rounded-[4px] outline-none focus:border-2 focus:border-socialMedia-telegram'
                        name='accountType'
                        required
                        id='accountType'
                        placeholder='Eg. 193524'
                    {...register("accountType",{required:true})}
                >
                    <option value={"Admin"}>
                        Admin
                    </option>
                    <option value={"User"}>
                        User
                    </option>
                </select>
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
                Register
            </button>

            <div>
                <p>Have an account? {" "}
                <span
                className=' text-richyellow-40 cursor-pointer'
                onClick={() => {
                    setIsLogin(true)
                    setRegister(false)
                }}
                >
                    Login
                </span>
                {" "}
                or
                {" "}
                <span
                className=' text-richyellow-40 cursor-pointer'
                onClick={() => {
                    setRegister(false)
                    setEmailVerify(true)
                }}
                >
                    Resent OTP
                </span>
                </p>
            </div>
        </form>

    </div>
  )
}

export default Register