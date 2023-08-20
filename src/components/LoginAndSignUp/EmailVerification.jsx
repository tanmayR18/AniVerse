import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../../service/apiconnector';
import { auth } from '../../service/apis';


const EmailVerification = ({setIsLogin, setEmailVerify, setRegister}) => {
    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} =  useForm();
    const [verified, setVerified] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    function onChange(value) {
        console.log("Captcha value:", value);
        setVerified(true)
      }

      const submitHandler = async (data) => {
        try{
            toast.loading("Sending OTP")
            const response = await apiConnector("POST", auth.SEND_OTP, data)
            console.log(response)

            if(response.data.success === true){
                toast.dismiss()
                setEmailVerify(false)
                setRegister(true)
                toast.success("OTP Sent on the email")
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
                email: ""
            })
        }
    },[reset, isSubmitSuccessful])
  return (
    <div>
        <h1>Email Verification</h1>

        {/* For error display */}
        {
            <div>
                errorMsg && <p>{errorMsg}</p>
            </div>
        }

        <form
        onSubmit={handleSubmit(submitHandler)}
        >
             <div className='flex flex-col'>
                <label>
                    Email Address
                </label>
                <input
                    className=' text-richblack-90'
                        type='email'
                        name='email'
                        required
                        id='email'
                        // value={name}
                        // onChange={(event) => setName(event.target.value)}
                        placeholder='Eg. abc@gmail.com'
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

            <div>
                <p>Have an account?
                    <span
                        onClick={() => {
                            setEmailVerify(false)
                            setIsLogin(true)
                        }}
                    >Login</span>
                </p>
            </div>
        </form>
    </div>
  )
}

export default EmailVerification