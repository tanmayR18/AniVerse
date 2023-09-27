import React from 'react'
import NavbarCommonComp from '../components/common/NavbarCommonComp'
import Navbar from '../components/common/Navbar'
import underConstruction from "../assets/underConstruction.gif"
import {FaKey} from 'react-icons/fa'
import { useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import {RiDeleteBin6Line} from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { apiConnector } from '../service/apiconnector'
import { auth, profile } from '../service/apis'
import Footer from '../components/common/Footer'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../slices/authSlice'

const Settings = () => {

    const userData = useSelector( state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    function changeHandler(event){
        setFormData((prevState) =>{
            return {
                ...prevState,
                [event.target.name] : event.target.value
            }
        })
    }

    async function submitHandler(event){
        event.preventDefault()
        console.log("submited data", formData)
        formData.token = userData.token
        formData.email = userData.user.email

       try{
            toast.loading("Updating Password")
            const response = await apiConnector("POST", auth.CHANGE_PASSWORD, formData)
            if(response.data.success){
                toast.dismiss()
                toast.success("Password updated")
            }
       } catch(error){
            console.error(error)
            setErrorMsg(error.response.data.message)
       }
       setTimeout(() => {toast.dismiss()},2500)
        setTimeout(() => {setErrorMsg(null)},2500)
    }

    async function deleteHandler(){
        const toastId = toast.loading("Deleting your account")
        const urlBody = {token: userData.token}
        try{
            const response = await apiConnector("DELETE", profile.DELETE_ACCOUNT, urlBody)
            console.log(response)
            if(response.data.success){
                toast.success("Account deleted successfully")
            }

            navigate("/")
            dispatch(logOut())
            localStorage.removeItem("toWatchAnime")
        } catch(error){
            console.log(error)
        }
        toast.remove(toastId)
    }

  return (
    <div  className=' flex flex-col items-center gap-6'>
        <Navbar bgColor={"bg-richblack-20 backdrop-blur "}  />
        <NavbarCommonComp/>
        {/* <h1 className=' text-richwhite-100 font-bold text-lg align-middle'>This section is under construction :)</h1>
        <img className=' aspect-auto' src={underConstruction}/> */}
        <div className=' w-10/12 flex flex-col gap-10 mb-32 items-center justify-center'>
            
            <div className=' w-fit'>
                <h2 className=' text-[1.5rem] text-richwhite-100 mt-10 mb-5 flex gap-2 items-center'>
                    <FaKey/>
                    <p>Change password</p>
                </h2>
                <form 
                onSubmit={submitHandler}
                className=' w-10/12 text-richwhite-100 flex flex-col gap-4'>
                    {/* Old Password */}
                    <div>
                        <label className=' relative '>
                            <p className=' my-2 text-xs font-bold tracking-wide opacity-50 uppercase'>Old Password</p>
                            <input 
                                className='text-base  border-none bg-richblack-20  rounded-[4px] outline-none focus:outline-2 focus:outline-socialMedia-telegram font-bold placeholder:text-richwhite-20 bg-richblack-40 pl-2 p-2'
                                type = {`${showOldPassword ? "text" : "password"}`}
                                placeholder='Enter old password'
                                name='oldPassword'
                                onChange={changeHandler}
                                value={formData.oldPassword}
                            />
                            {
                                showOldPassword ?
                                <AiOutlineEyeInvisible
                                onClick={() => setShowOldPassword((prevState) => !prevState)}
                                className=' absolute bottom-0 cursor-pointer right-2 text-lg text-richwhite-50'/> 
                                :
                                <AiOutlineEye 
                                onClick={() => setShowOldPassword((prevState) => !prevState)}
                                className='absolute bottom-0 right-2 cursor-pointer '/>
                            }
                            </label>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className=' relative '>
                            <p className=' my-2 text-xs font-bold tracking-wide opacity-50 uppercase'>New Password</p>
                            <input 
                                className='text-base  border-none bg-richblack-20  rounded-[4px] outline-none focus:outline-2 focus:outline-socialMedia-telegram font-bold placeholder:text-richwhite-20 bg-richblack-40 pl-2 p-2'
                                type = {`${showNewPassword ? "text" : "password"}`}
                                placeholder='Enter new password'
                                name='newPassword'
                                onChange={changeHandler}
                                value={formData.newPassword}
                            />
                            {
                                showNewPassword ?
                                <AiOutlineEyeInvisible
                                onClick={() => setShowNewPassword((prevState) => !prevState)}
                                className=' absolute bottom-0 cursor-pointer right-2 text-lg text-richwhite-50'/> 
                                :
                                <AiOutlineEye 
                                onClick={() => setShowNewPassword((prevState) => !prevState)}
                                className='absolute bottom-0 right-2 cursor-pointer '/>
                            }
                            </label>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className=' relative '>
                            <p className=' my-2 text-xs font-bold tracking-wide opacity-50 uppercase'>Confirm Password</p>
                            <input 
                                className='text-base  border-none bg-richblack-20  rounded-[4px] outline-none focus:outline-2 focus:outline-socialMedia-telegram font-bold placeholder:text-richwhite-20 bg-richblack-40 pl-2 p-2'
                                type = {`${showConfirmPassword ? "text" : "password"}`}
                                placeholder='Enter Confirm password'
                                name='confirmPassword'
                                onChange={changeHandler}
                                value={formData.confirmPassword}
                            />
                            {
                                showConfirmPassword ?
                                <AiOutlineEyeInvisible
                                onClick={() => setShowConfirmPassword((prevState) => !prevState)}
                                className=' absolute bottom-0 cursor-pointer right-2 text-lg text-richwhite-50'/> 
                                :
                                <AiOutlineEye 
                                onClick={() => setShowConfirmPassword((prevState) => !prevState)}
                                className='absolute bottom-0 right-2 cursor-pointer '/>
                            }
                            </label>
                    </div>

                    {/* Submit button */}
                    <button className=' w-fit px-2 py-1 bg-richyellow-50 rounded-lg
                                        text-richblack-100 font-semibold tracking-wide'>
                        Submit
                    </button>
                </form>
            </div>

            <p className=' font-bold text-richwhite-100 text-3xl'>Danger Zone</p>

            <div className='p-5 rounded-lg bg-socialMedia-reddit bg-opacity-20 flex items-center gap-5'>
                <p className=' text-2xl font-bold text-richwhite-100'>Delete this account</p>
                <button onClick={deleteHandler} className=' bg-socialMedia-reddit font-bold text-richwhite-100 border-2 p-2 rounded-md border-socialMedia-reddit flex items-center gap-2'>
                    <RiDeleteBin6Line />
                    <p>Delete</p>
                </button>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Settings