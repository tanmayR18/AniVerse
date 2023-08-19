import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
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
                email: ""
            })
        }
    },[reset, isSubmitSuccessful])
  return (
    <div>

        <h1>Reset Password</h1>

        <form
        onSubmit={handleSubmit(submitHandler)}
        >
            <div className='flex flex-col'> 
                <label>
                    Your email
                </label>
                    <input
                        className=' text-richblack-90'
                        type='email'
                        name='email'
                        required
                        id='email'
                        // value={password}
                        // onChange={(event) => setPassword(event.target.value)}
                        placeholder='Eg: abc@gmail.com'
                        {...register("email",{required:true})}
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
        </form>

    </div>
  )
}

export default ForgotPassword