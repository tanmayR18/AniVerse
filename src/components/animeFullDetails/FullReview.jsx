import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {BsCircleFill} from "react-icons/bs"
import YouTube from 'react-youtube';
import commentsCount from '../../assets/commentCountImg.png'
import {BiSolidMessageSquare} from "react-icons/bi"
import ShareWithFriends from '../common/ShareWithFriends';
import LoginOverlayer from '../LoginAndSignUp/LoginOverlayer';
import Navbar from '../common/Navbar';
import { useSelector } from 'react-redux';
import unknownProfile from "../../assets/unknown-profile.png"
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import {FaStar} from "react-icons/fa"
import { apiConnector } from '../../service/apiconnector';
import { ratingAndReview } from '../../service/apis';

const FullReview = ({setReview, animeData}) => {
    const [readMore, setReadMore] = useState(true)
    const userData = useSelector( state => state.auth)
    const [errorMsg, setErrorMsg] = useState(null)
    const [rating, setRating] = useState(null)
    console.log(userData)
    // console.log(animeData)
    // const [loginVisible, setLoginVisible] = useState(false)
    // parameter for utube video
    const opts = {
        height: "550",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
          },
    }


    //FOr uploading the rating and review
    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} =  useForm();

    const submitHandler = async (data) => {

        if( rating === null){
            setErrorMsg("please enter the Rating")
            return
        }

        const finalData = {...data, rating: rating, title: animeData.title_english === undefined ? animeData.title : animeData.title_english}

        try{
            const response = await apiConnector("POST", ratingAndReview.CREATE_RATINGANDREVIEW, finalData)
            console.log(response)
        } catch(error){
            console.log(error)
        }

        // try{
        //     const response = await apiConnector("POST", auth.LOG_IN, data)
        //     console.log("Login Resonse",response)

        //     if(response.data.success === true){
        //         toast.success("Logged In")
        //         // setUser(response.data)
        //         dispatch(logIn(response.data))
        //         setLoginVisible(false)
                
        //     }
        // } catch(error){
        //     console.log("Login Error", error)
        //     setErrorMsg(error.response.data.message)
        // }   

        

        setErrorMsg(null)
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                review: ""
            })
        }
    },[reset, isSubmitSuccessful])

  return (
    <div>
        <Navbar  bgColor={"bg-richblack-20 backdrop-blur "} />
        <div className=' absolute w-full  min-h-screen h-auto backdrop-blur-xl bg-[rgba(40,38,38,0.7)] z-30 '>
            {/* <Navbar  bgColor={"bg-richblack-20 backdrop-blur "} /> */}
            {/* Main COntainer */}
            <div className=' py-14 flex flex-col tems-center p-8 text-richwhite-100 min-h-screen h-auto'>
                {/* Header info */}
                <div className='flex items-center gap-2  opacity-80 my-8 tracking-wider '>
                            <NavLink className={" "} to={"/home"}>Home</NavLink>
                            <BsCircleFill size={4}/>
                            {
                                animeData && 
                                <div className=' flex items-center gap-2'>
                                    <NavLink to={`/category/${animeData.type}`}>
                                        <div>
                                            {
                                                animeData.type
                                            }
                                        </div>
                                    </NavLink>
                                    <BsCircleFill size={4}/>
                                    <div className=' opacity-60'>
                                        {
                                        animeData.titles[3] === undefined ? animeData.title : animeData.titles[3].title
                                        }
                                    </div>
                                </div>
                            }
                </div>
                {/* Container for trailer */}
                {
                    animeData &&
                    <div className='flex justify-center'>
                        <YouTube 
                            className=' w-[75%] '
                            opts={opts}
                            videoId={animeData.trailer.youtube_id}
                        />
                    </div>
                }

                {/* Container for showing anime info */}
                <div className='flex flex-col lg:flex-row gap-8 items-center lg:items-start  py-10'>
                    {/* Image */}
                    <div className='aspect-3/5 max-w-[10rem]'>
                        {
                            animeData && 
                            <img 
                            className='object-cover w-full'
                            src={animeData.images.jpg.image_url} alt='animePoster' />
                        }
                    </div>

                    {/* Anime Info */}
                    <div className=' w-full'>
                    {
                            animeData && 
                            <div className=' text-sm flex flex-col  gap-4'>
                                {/* Name of the anime */}
                                <h1 className=' text-lg  font-semibold'>
                                    {
                                        animeData.title_english === undefined ? animeData.title : animeData.title_english
                                    }
                                </h1>

                                {/* episodes Info */}
                                <div className='flex gap-2 items-center'>
                                    <div className='flex gap-1  font-bold '>
                                        <div className=' text-richblack-90 bg-richyellow-50 py-[2px] px-[6px] rounded-[4px]'>{animeData.rating.split("-")[0]}</div>
                                        <div className=' bg-richblack-30 py-[2px] px-[6px] rounded-[4px]'>{animeData.episodes}</div>
                                    </div>
                                    <BsCircleFill size={4} className=' opacity-60'/>
                                    <NavLink to={`/category/${animeData.type}`}>
                                        <div>
                                            {
                                                animeData.type
                                            }
                                        </div>
                                    </NavLink>
                                    <BsCircleFill size={4} className=' opacity-60'/>
                                    <div>
                                        {
                                            animeData.duration
                                        }
                                    </div>
                                </div>

                                {/* Anime description, readmore and info about website */}
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        {
                                            animeData && <span className=' tracking-wide opacity-80'>
                                                            {
                                                                readMore ? 
                                                                animeData.synopsis.slice(0,265)+"..." :
                                                                animeData.synopsis
                                                            }
                                                        </span>
                                                        
                                        }
                                        <button
                                        className=' ml-1 opacity-100 w-fit font-bold tracking-wide'
                                        onClick={() => { setReadMore( (prevState) => !prevState) }}
                                        >
                                            {
                                                readMore ? "+ More" : "- Less"
                                            }
                                        </button>
                                    </div>
                                    {
                                        animeData && 
                                        <p className=' tracking-wide opacity-80'>
                                                {/* {
                                                    `AniWatch is the best site to watch ${animeData.title} SUB online, or you can even watch ${animeData.title} DUB in HD quality. You can also find ${ animeData.studios[0].name || "such"} anime on AniWatch website.`
                                                } */}
                                                    AniWatch is the best site to watch
                                                    <span className=' font-bold'>
                                                        {" "}
                                                        {animeData.title}
                                                        {" "}
                                                    </span>
                                                    SUB online, or you can even watch
                                                    <span className=' font-bold'>
                                                        {" "}
                                                        {animeData.title}
                                                        {" "}
                                                    </span> DUB in HD quality. You can also find
                                                    <a className=' font-bold' href={animeData.studios[0].url || "#"}>
                                                        {" "}
                                                        { animeData.studios[0].name || "such"}
                                                        {" "}
                                                    </a>
                                                    anime on AniVerse website.
                                        </p>
                                    }
                                </div>

                                {/* Detail info page */}
                                <button
                                    className=' w-fit bg-richwhite-100 px-[4px] text-richblack-50  rounded-md'
                                    onClick={() => setReview(false)}
                                >
                                    View Detail
                                </button>

                                {/* No. of comments */}
                                <div className=' text-socialMedia-twitter   overflow-hidden flex items-center gap-1  bg-richwhite-100 h-14 w-44 rounded-lg relative'>
                                    <BiSolidMessageSquare size={35} className=' ml-2' />
                                    <p>0</p>
                                    <img className=' absolute -top-4 right-0 h-24 ' src={commentsCount} />
                                </div>
                            </div>
                }
                    </div>
                </div>
            </div>

            <ShareWithFriends bgColor = {"bg-richblack-100"}/>

            
            <div className='flex px-4 gap-8'>
                {/* Reviews, character and recommended anime */}
                <div className=' bg-richblack-30 w-full'>
                    <h2>Comments</h2>
                    {/* Reviews container */}
                    <div>
                        {/* Show total number of comments */}
                        <p>Total reviews</p>
                        
                        {/* TODO: If there is user reviewer then show that review else show the create review section */}
                        <div className='flex'>
                            {/* For image */}
                            <div className='w-8 rounded-full overflow-hidden'>
                                <img className=' object-cover' src={ userData ? userData.user.image : unknownProfile } alt='unknown' />
                            </div>

                            {/* FOr user deaitls and  */}
                            <div>
                                {/* Username */}
                                <p>
                                    {
                                        userData ? 
                                        `You are Rating from ${userData.user.userName}` :
                                        "You need to Login / Register for Rating and Reviewing the anime"
                                    }
                                </p>
                                {
                                    errorMsg && <div className=' bg-richpink-10 text-socialMedia-reddit w-full font-bold p-1'>
                                                    <p>{errorMsg}</p>
                                                </div>
                                } 
                                <form 
                                className='flex flex-col'
                                onSubmit={handleSubmit(submitHandler)}>

                                    {/* Rating */}
                                    <div className='flex'>
                                        {[...Array(5)].map( (star, index) => {
                                            const currentRating = index + 1
                                            return (
                                                <label className=' cursor-pointer'>
                                                    <FaStar
                                                    className={`${currentRating <= rating ? " text-richyellow-50": ""}`}
                                                    size={50} />
                                                    <input 
                                                        className=' appearance-none'
                                                        type='radio'
                                                        name='rating'
                                                        onClick={() => setRating(currentRating)}
                                                    />
                                                </label>
                                            )
                                        })}
                                        
                                    </div>

                                    <input 
                                        type='text'
                                        id='review'
                                        name='review'
                                        required
                                        placeholder='Enter your review'
                                        {...register("review",{required:true})}
                                    />

                                    <button className=' w-fit bg-richyellow-40 py-1 px-2 rounded-md'>
                                        Rate
                                    </button>
                                </form>
                            </div>
                        </div>
                        {/* Show all reviews */}
                        <div>

                        </div>
                    </div>
                </div>

                {/* Related Anime  */}
                <div className=' bg-richyellow-40 w-[30%]'>
                    Related anime
                </div>
            </div>
        </div>
    </div>
  )
}

export default FullReview