import React from 'react'
import Navbar from "../components/common/Navbar"
import NavbarCommonComp from '../components/common/NavbarCommonComp'
import { useSelector } from 'react-redux'
import profileImage from "../assets/unknown-profile.png"
import {BsFillCameraFill , BsFillPersonPlusFill} from "react-icons/bs"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const ProfilePage = () => {
    const userData = useSelector( state => state.auth)
    const [editAble, setEditAble] = useState(false)

    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} =  useForm();
    const [errorMsg, setErrorMsg] = useState(null)

    const submitHandler = async (data) => {
        try{
            console.log("Profile form data", data)
            // toast.loading("Sending OTP")
            // const response = await apiConnector("POST", auth.SEND_OTP, data)
            // console.log(response)

            // if(response.data.success === true){
            //     toast.dismiss()
            //     setEmailVerify(false)
            //     setRegister(true)
            //     toast.success("OTP Sent on the email")
            // }

        } catch(error){
            // console.log("Login Error", error)
            // setErrorMsg(error.response.data.message)
        }   
        // setTimeout(() => {toast.dismiss()},2500)
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                userName: "",
                gender: "",
                dateOfBirth: "",
                favAnime: "",
                favFemaleChar: "",
                favGenre: "",
                favVillan:"",
                favMaleChar: "",
            })
        }
    },[reset, isSubmitSuccessful])


  return (
    <div className=' flex flex-col items-center text-richwhite-100'>
        <Navbar bgColor={"bg-richblack-20 backdrop-blur "}  />
        <NavbarCommonComp />

        <form 
        onSubmit={handleSubmit(submitHandler)}
        className=' w-10/12 flex justify-center'>
            <div className=''>

                <h1 className=' mt-10 flex items-center gap-2 text-[2rem]  font-semibold'>
                <BsFillPersonPlusFill/>
                <p>Edit Profile</p>
                </h1>
                <div className=' grid mt-6 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2'>
                    {/* Profile pic */}
                    <div className='relative h-36 w-36 '>
                        <div className=' w-full h-full rounded-full overflow-hidden'>
                            <img src={`
                                ${userData.user.image ? userData.user.image : profileImage}
                            `} />
                        </div>

                        {/* TO update the profile */}
                        {
                            editAble &&
                            <label className='absolute right-0 top-2/3 '>
                                <BsFillCameraFill size={25} color='white'/>
                                <input type='file' className='  hidden' />
                            </label>
                        }
                    </div>
                    
                    {/* UserName */}
                    <div  className='flex flex-col w-full gap-2'>
                        <label  className=' text-xs font-bold tracking-wide opacity-50 uppercase'>
                            Username:
                        </label>
                        <input 
                            className={` bg-richblack-20 p-1 pl-0 rounded-[4px] outline-none focus:outline-2 focus:outline-socialMedia-telegram font-bold placeholder:text-richwhite-100 ${editAble ? "" : "pointer-events-none"}`}
                            type='text'
                            name='userName'
                            id='userName'
                            placeholder={userData.user.userName}
                            {...register("userName")}
                        />
                    </div>
                    
                    {/* Email */}
                    <div  className='flex flex-col w-full gap-2'>
                        <p className='text-xs font-bold tracking-wide opacity-50 uppercase'>Email:</p>
                        <div className=' bg-richblack-20 p-1 pl-0 rounded-[4px] outline-none  font-bold placeholder:text-richwhite-100 ' >
                            {userData.user.email}
                        </div>
                    </div>

                    {/* Number of Rating */}
                    <div className='flex flex-col w-full gap-2'>   
                        <p className='text-xs font-bold tracking-wide opacity-50 uppercase'>Number of Ratings:</p>
                        <div className=' bg-richblack-20 p-1 pl-0 rounded-[4px] outline-none  font-bold placeholder:text-richwhite-100 '>
                            {userData.user.ratingAndReviews.length}
                        </div>
                    </div>

                </div>

                <h1 className=' my-6 text-richwhite-100 text-[2rem] font-semibold'>Additional Details</h1>

                <div className='  grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2'>

                    {/* Gender */}
                    <div className='flex flex-col w-full gap-2'>
                        <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>Gender:</label>
                        <input 
                            className={` bg-richblack-20 p-1 pl-0 rounded-[4px] outline-none focus:outline-2 focus:outline-socialMedia-telegram font-bold placeholder:text-richwhite-100 ${editAble ? "" : "pointer-events-none"}`}
                            type='text'
                            name='gender'
                            id='gender'
                            placeholder={userData.user.additionalDetails.gender ? userData.user.additionalDetails.gender : "NaN"}
                            {...register("gender")}
                        />
                    </div>

                    {/* Date Of Birth */}
                    <div className='flex flex-col w-full gap-2'>
                        <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>Date Of Birth:</label>
                        <input 
                            className={` bg-richblack-20 p-1 pl-0 rounded-[4px] outline-none focus:outline-2 focus:outline-socialMedia-telegram font-bold placeholder:text-richwhite-100 ${editAble ? "" : "pointer-events-none"}`}
                            type='text'
                            name='dateOfBirth'
                            id='dateOfBirth'
                            placeholder={userData.user.additionalDetails.dateOfBirth ? userData.user.additionalDetails.dateOfBirth : "NaN"}
                            {...register("dateOfBirth")}
                        />
                    </div>

                    {/* Favourite Anime */}
                    <div className='flex flex-col w-full gap-2'>
                        <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>Favourite Anime:</label>
                        <input 
                            className={` bg-richblack-20 p-1 pl-0 rounded-[4px] outline-none focus:outline-2 focus:outline-socialMedia-telegram font-bold placeholder:text-richwhite-100 ${editAble ? "" : "pointer-events-none"}`}
                            type='text'
                            name='favAnime'
                            id='favAnime'
                            placeholder={userData.user.additionalDetails.favAnime ? userData.user.additionalDetails.favAnime : "NaN"}
                            {...register("favAnime")}
                        />
                    </div>

                    <div className='flex flex-col w-full gap-2'>
                        <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>Favourite Male Character:</label>
                        <input 
                            className={` bg-richblack-20 p-1 pl-0 rounded-[4px] outline-none focus:outline-2 focus:outline-socialMedia-telegram font-bold placeholder:text-richwhite-100 ${editAble ? "" : "pointer-events-none"}`}
                            type='text'
                            name='favMaleChar'
                            id='favMaleChar'
                            placeholder={userData.user.additionalDetails.favMaleChar ? userData.user.additionalDetails.favMaleChar : "NaN"}
                            {...register("favMaleChar")}
                        />
                    </div>

                    <div className='flex flex-col w-full gap-2'>
                        <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>Favourite Female Character:</label>
                        <input 
                            className={` bg-richblack-20 p-1 pl-0 rounded-[4px] outline-none focus:outline-2 focus:outline-socialMedia-telegram font-bold placeholder:text-richwhite-100 ${editAble ? "" : "pointer-events-none"}`}
                            type='text'
                            name='favFemaleChar'
                            id='favFemaleChar'
                            placeholder={userData.user.additionalDetails.favFemaleChar ? userData.user.additionalDetails.favFemaleChar : "NaN"}
                            {...register("favFemaleChar")}
                        />
                    </div>

                    <div className='flex flex-col w-full gap-2'>
                        <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>Favourite Villan:</label>
                        <input 
                            className={` bg-richblack-20 p-1 pl-0 rounded-[4px] outline-none focus:outline-2 focus:outline-socialMedia-telegram font-bold placeholder:text-richwhite-100 ${editAble ? "" : "pointer-events-none"}`}
                            type='text'
                            name='favVillan'
                            id='favVillan'
                            placeholder={userData.user.additionalDetails.favVillan ? userData.user.additionalDetails.favVillan : "NaN"}
                            {...register("favVillan")}
                        />
                    </div>
                    
                    <div className='flex flex-col w-full gap-2'>
                        <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>Favourite Genre:</label>
                        <input 
                            className={` bg-richblack-20 p-1 pl-0 rounded-[4px] outline-none focus:outline-2 focus:outline-socialMedia-telegram font-bold placeholder:text-richwhite-100 ${editAble ? "" : "pointer-events-none"}`}
                            type='text'
                            name='favGenre'
                            id='favGenre'
                            placeholder={userData.user.additionalDetails.favGenre ? userData.user.additionalDetails.favGenre : "NaN"}
                            {...register("favGenre")}
                        />
                    </div>

                    <div className='flex flex-col w-full gap-2'>
                        <label className=' text-xs font-bold tracking-wide opacity-50 uppercase'>Favourite Movie:</label>
                        <input 
                            className={` bg-richblack-20 p-1 pl-0 rounded-[4px] outline-none focus:outline-2 focus:outline-socialMedia-telegram font-bold placeholder:text-richwhite-100 ${editAble ? "" : "pointer-events-none"}`}
                            type='text'
                            name='favMovie'
                            id='favMovie'
                            placeholder={userData.user.additionalDetails.favMovie ? userData.user.additionalDetails.favMovie : "NaN"}
                            {...register("favMovie")}
                        />
                    </div>

                    {
                        editAble &&
                        <button
                            className=' w-fit px-4 py-2 bg-richyellow-40 p-2 text-richblack-100'>
                                save
                        </button>
                    }
                </div>
            </div>
        </form>
        
        {
            !editAble &&
            <button 
                className=' bg-richyellow-40 p-2 text-richblack-100'
                onClick={ () => setEditAble((prevState) => !prevState)}>
                    Edit
            </button>
        }
        {
            editAble &&
            <button
                className=' bg-richyellow-40 p-2 text-richblack-100'
                onClick={ () => setEditAble(false)}>
                    Cancel
            </button>
        }
    </div>
  )
}

export default ProfilePage