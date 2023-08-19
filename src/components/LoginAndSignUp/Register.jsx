import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from "react-google-recaptcha";

const Register = ({setIsLogin, setRegister, setEmailVerify}) => {
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
                name: "",
                password: "",
                confirmPassword: "",
                email: ""
            })
        }
    },[reset, isSubmitSuccessful])
  return (
    <div>

        <h1>Create an account</h1>

        {/* For error display */}

        <form
        className='flex flex-col'
        onSubmit={handleSubmit(submitHandler)}
        >
            <div className='flex flex-col'>
                <label>
                    Your name
                </label>
                <input
                    className=' text-richblack-90'
                        type='text'
                        name='name'
                        required
                        id='name'
                        // value={name}
                        // onChange={(event) => setName(event.target.value)}
                        placeholder='Enter Your Name'
                    {...register("name",{required:true})}
                />
            </div>

            <div className='flex flex-col'>
                <label>
                    Email Address
                </label>
                <input
                    className=' text-richblack-90'
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
                        // value={name}
                        // onChange={(event) => setName(event.target.value)}
                        placeholder='Password'
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
                        // value={name}
                        // onChange={(event) => setName(event.target.value)}
                        placeholder='Confirm Password'
                    {...register("confirmPassword",{required:true})}
                />
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