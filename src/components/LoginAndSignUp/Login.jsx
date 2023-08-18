import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'

const Login = () => {
    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} =  useForm();
    // const [name, setName] = useState("")
    // const [password, setPassword] = useState("")
     
    const submitHandler = async (data) => {
        // console.log("Login Data", data)
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
                password: ""
            })
        }
    },[reset, isSubmitSuccessful])

  return (
    <form 
    className='flex flex-col gap-4'
    onSubmit={handleSubmit(submitHandler)}> 
        <label>
            Name:
            <input
                className=' text-richblack-90'
                type='text'
                name='name'
                id='name'
                // value={name}
                // onChange={(event) => setName(event.target.value)}
                placeholder='Enter Your Name'
                {...register("name",{required:true})}
            />
            {
                errors.name && (
                    <span>
                        Please enter your name
                    </span>
                )
            }
        </label>

        <label>
            Password:
            <input
                className=' text-richblack-90'
                type='password'
                name='password'
                id='password'
                // value={password}
                // onChange={(event) => setPassword(event.target.value)}
                placeholder='Enter the password'
                {...register("password",{required:true})}
            />
            {
                errors.name && (
                    <span>
                        Please enter the password
                    </span>
                )
            }
        </label>

        <button>
            Submit
        </button>
    </form>
  )
}

export default Login