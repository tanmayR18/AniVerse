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
    const [errorMsg, setErrorMsg] = useState(null)

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
    <div className=' flex flex-col gap-6  w-full justify-center items-center'>

        {
            errorMsg && <div>
                            <p>
                                {errorMsg}
                            </p>
                        </div>
        }

        <h1 className=' font-bold text-[1.3rem] tracking-wider '>Reset Password</h1>

        <form
        className=' flex flex-col gap-6 w-full justify-center items-center'
        onSubmit={handleSubmit(submitHandler)}
        >
            <div className='flex flex-col w-full gap-2'> 
                <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>
                    Your email
                </label>
                    <input
                        className=' text-richblack-90 p-1 rounded-[4px] outline-none focus:border-2 focus:border-socialMedia-telegram'
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
                className=' self-start'
                sitekey= "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChange}
                theme={"dark"}
            />

            <button 
            className='w-full text-richblack-90 font-bold bg-richyellow-40 rounded-lg p-2'
            disabled = {!verified}>
                Send OTP
            </button>
        </form>

        <div>
            <p>
                Have an account? {" "}
                <span
                className=' text-richyellow-40 cursor-pointer'
                onClick={() => {
                setForgotPassword(false)
                setIsLogin(true)
            }}
                >
                    LogIn 
                </span>
            </p>
        </div>

    </div>
  )
}

export default ForgotPassword