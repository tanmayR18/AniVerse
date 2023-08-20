import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../service/apiconnector';
import { auth } from '../../service/apis';
import { toast } from 'react-hot-toast';

const ForgotPassword = ({setIsLogin, setResetPassword, setForgotPassword}) => {
    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} =  useForm();
    const [verified, setVerified] = useState(false)

    function onChange(value) {
        console.log("Captcha value:", value);
        setVerified(true)
      }

      const submitHandler = async (data) => {
        try{
            toast.loading("Sending reset token")
            const response = await apiConnector("POST", auth.RESET_TOKEN, data)
            console.log("Login Resonse",response)
            if(response.data.success === true){
                toast.dismiss()
                toast.success("Reset token sent to your email")
                setForgotPassword(false)
                setResetPassword(true)
            }
        } catch(error){
            console.log("Login Error", error)
        }
        setTimeout(() => {toast.dismiss()},2500)
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
                Send OTP
            </button>
        </form>

        <div>
            <p 
            onClick={() => {
                setForgotPassword(false)
                setIsLogin(true)
            }}
            >
                Login
            </p>
        </div>

    </div>
  )
}

export default ForgotPassword