import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import ReCAPTCHA from "react-google-recaptcha";
import { apiConnector } from '../../service/apiconnector';
import { auth } from '../../service/apis';
import { toast } from 'react-hot-toast';

const Login = ({setIsLogin, setForgotPassword, setEmailVerify, setLoginVisible}) => {
    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} =  useForm();
    const [verified, setVerified] = useState(false)
    // const recaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY

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
                setLoginVisible(false)
                
            }
        } catch(error){
            console.log("Login Error", error)
        }   
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email: "",
                password: ""
            })
        }
    },[reset, isSubmitSuccessful])

  return (
    <div>
        <h1>Welcome Back!</h1>
        <div>
        {
                    errors.rememberMe && (
                        <span>
                            Please click "I am not a robot"
                        </span>
                    )
        }
        </div>
        <form 
        className=' flex flex-col'
        onSubmit={handleSubmit(submitHandler)}> 
            <div className='flex flex-col'>
                <label>
                    Email:
                </label>
                <input
                    className=' text-richblack-90'
                        type='text'
                        name='email'
                        required
                        id='email'
                        // value={name}
                        // onChange={(event) => setName(event.target.value)}
                        placeholder='Enter Your Name'
                    {...register("email",{required:true})}
                />
            </div>
                
            
            <div className='flex flex-col'> 
                <label>
                    Password:
                </label>
                    <input
                        className=' text-richblack-90'
                        type='password'
                        name='password'
                        required
                        id='password'
                        // value={password}
                        // onChange={(event) => setPassword(event.target.value)}
                        placeholder='Enter the password'
                        {...register("password",{required:true})}
                    />
            </div>


            
            <div className='flex'>
                <div>
                    <input 
                        type='checkbox'
                        name='rememberMe'
                        id='rememberMe'
                        {...register("rememberMe")}
                    />
                    <label htmlFor='rememberMe'>Remember Me</label>
                </div>
                <div>
                    <p
                    onClick={() => {
                        setIsLogin(false)
                        setForgotPassword(true)
                    }}
                    >Forgot Password?</p>
                </div>
            </div>
            
            <ReCAPTCHA
                sitekey= "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
                theme={"dark"}
            />

            <button disabled = {!verified}>
                Submit
            </button>

            <div>
                <p>Don't have account? 
                <span
                onClick={() => {
                    setIsLogin(false)
                    setEmailVerify(true)
                }}
                >
                    Register 
                </span>
                </p>
            </div>
        </form>
    </div>
  )
}

export default Login