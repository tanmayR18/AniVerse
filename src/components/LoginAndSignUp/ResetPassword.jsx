import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from 'react-hook-form';


const Verify = ({setIsLogin, setResetPassword, setForgotPassword}) => {
    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} =  useForm();
    const [verified, setVerified] = useState(false)

    function onChange(value) {
        console.log("Captcha value:", value);
        setVerified(true)
      }

      const submitHandler = async (data) => {
        try{
            const response = {status: "Ok", code: 404, data:data}
            console.log("Login Resonse",response)
        } catch(error){
            console.log("Login Error", error)
        }   
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
    <div>
        <h1>Reset Password</h1>

        For displaying the errors
        <div>
            
        </div>

        <form
        onSubmit={handleSubmit(submitHandler)}
        >
            <div className='flex flex-col'> 
                <label>
                    Token
                </label>
                    <input
                        className=' text-richblack-90'
                        type='token'
                        name='token'
                        required
                        id='token'
                        // value={password}
                        // onChange={(event) => setPassword(event.target.value)}
                        placeholder='Eg - jdhbjhdbcsdbcjh'
                        {...register("token",{required:true})}
                    />
            </div>

            <div className='flex flex-col'> 
                <label>
                    Password
                </label>
                    <input
                        className=' text-richblack-90'
                        type='password'
                        name='password'
                        required
                        id='password'
                        // value={password}
                        // onChange={(event) => setPassword(event.target.value)}
                        placeholder='Eg - jdhbjhdbcsdbcjh'
                        {...register("password",{required:true})}
                    />
            </div>

            <div className='flex flex-col'> 
                <label>
                    Confirm Password
                </label>
                    <input
                        className=' text-richblack-90'
                        type='password'
                        name='confirmPassword'
                        required
                        id='confirmPassword'
                        // value={password}
                        // onChange={(event) => setPassword(event.target.value)}
                        placeholder='Eg - jdhbjhdbcsdbcjh'
                        {...register("confirmPassword",{required:true})}
                    />
            </div>

            <ReCAPTCHA
                sitekey= "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
                theme={"dark"}
            />

            <button disabled = {!verified}>
                Reset
            </button>
        </form>
        
        <div>
            <p
            onClick={() => {
                setResetPassword(false)
                setForgotPassword(true)
            }}
            >
                Resent OTP
            </p>
            <p
            onClick={() => {
                setIsLogin(true)
                setResetPassword(false)
            }}
            >Login</p>
            
        </div>
    </div>
  )
}

export default Verify