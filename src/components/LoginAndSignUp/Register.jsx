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

        <h1
        className=' font-bold text-[1.3rem] tracking-wider '
        >Create an account</h1>

        {/* For error display */}
        {
            errorMsg &&  <div>
                <p>{errorMsg}</p>
            </div>
        }

        <form
        className=' flex flex-col gap-6 w-full justify-center items-center'
        onSubmit={handleSubmit(submitHandler)}
        >
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
                        // value={name}
                        // onChange={(event) => setName(event.target.value)}
                        placeholder='Enter Your Name'
                    {...register("userName",{required:true})}
                />
            </div>

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
                        // value={name}
                        // onChange={(event) => setName(event.target.value)}
                        placeholder='Enter Your Email'
                    {...register("email",{required:true})}
                />
            </div>

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
                        // value={name}
                        // onChange={(event) => setName(event.target.value)}
                        placeholder='Password'
                    {...register("password",{required:true})}
                />
            </div>

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
                        // value={name}
                        // onChange={(event) => setName(event.target.value)}
                        placeholder='Confirm Password'
                    {...register("confirmPassword",{required:true})}
                />
            </div>

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
                        // value={name}
                        // onChange={(event) => setName(event.target.value)}
                        placeholder='Eg. 193524'
                    {...register("otp",{required:true})}
                />
            </div>

            <div className='flex flex-col'>
                <label>
                    Type
                </label>
                <select
                    className=' text-richblack-90'
                        name='accountType'
                        required
                        id='accountType'
                        // value={name}
                        // onChange={(event) => setName(event.target.value)}
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
                sitekey= "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
                theme={"dark"}
            />

            <button disabled = {!verified}>
                Register
            </button>

            <div>
                <p>Have an account? 
                <span
                onClick={() => {
                    setIsLogin(true)
                    setRegister(false)
                }}
                >
                    Login
                </span>
                or
                <span
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