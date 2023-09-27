import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {BsCheckLg, BsCircleFill} from "react-icons/bs"
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
import {FaStar, FaComments} from "react-icons/fa"
import { apiConnector } from '../../service/apiconnector';
import { anime, ratingAndReview } from '../../service/apis';
import { toast } from 'react-hot-toast';
import ReviewsCard from './ReviewsCard';
import {BiComment} from "react-icons/bi"
import {TbMessageCircle2Filled} from "react-icons/tb"
import RelatedAnime from './RelatedAnime';
import axios from 'axios';
import RecommendedAnime from './RecommendedAnime';
import Genre from '../common/GenreSection';
import RecommendedAnimes from './RecommendedAnimes';
import Footer from '../common/Footer';





const FullReview = ({setReview, animeData, recommendedAnime}) => {
    const location = useLocation()
    // console.log("Anime data",animeData)
    const [readMore, setReadMore] = useState(true)
    const userData = useSelector( state => state.auth)
    const [errorMsg, setErrorMsg] = useState(null)
    const [rating, setRating] = useState(null)
    //for calling the fetchANimeReview function after submitting the review
    const [rated, setRated] = useState(false)
    const [reviews, setReviews] = useState(null)
    const [animeDataDB, setAnimeDataDb] = useState(null)
    // console.log(userData)
    // parameter for utube video
    const opts = {
        height: "550",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
          },
    }


    //For getting rating and reviews of anime

    async function fetchAnimeReviews(){
        try{
            console.log("Again fetched")
            const urlBody = {title: animeData.title_english  ?  animeData.title_english : animeData.title }
            console.log("Frontend se ye jaa raha he ", urlBody)
            const response = await apiConnector("POST", ratingAndReview.GET_ANIME_RATINGANDREVIEW, urlBody)
            // console.log("Anime Reviews",response.data.data)
            setReviews(response.data.data)
        } catch(error){
            console.log("Error occured while fetching reviews of anime",error)
            console.log("Here is the error test",error.response)
        }
    }


    //FOr uploading the rating and review
    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} =  useForm();

    const submitHandler = async (data) => {

        if(!userData){
            toast.error("Please Login or Signup")
            return
        }

        if( rating === null){
            setErrorMsg("please enter the Rating")
            return
        }

        const finalData = {...data, rating: rating, token:userData.token, animeDbId:animeData.mal_id , title: animeData.title_english  ?  animeData.title_english : animeData.title }

        try{
            const response = await apiConnector("POST", ratingAndReview.CREATE_RATINGANDREVIEW, finalData)
            // console.log("Response from the review posting",response)
            if(response.data.success === true){
                toast.success("Review added !")
                setRated((prevState) => !prevState)
            }
        } catch(error){
            console.log(error)
            setErrorMsg(error.response.data.message)
        }
        
        // TODO: Add the setErrorMsg(null)
    }

    //FOr getting anime rating
    async function getAnimeDetails(){
        const urlBody = {title: animeData.title_english  ?  animeData.title_english : animeData.title }
        // console.log("Anime details ke leye ye ja raha he ",urlBody)
        try{
            const response = await apiConnector("POST", anime.GET_ANIME_DETAILS, urlBody)
            setAnimeDataDb(response.data.data)
        } catch(error){
            console.log("Error occured while fetching the anime data from DB",error)
        }
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                review: ""
            })
        }
    },[reset, isSubmitSuccessful])

    useEffect( () => {
        getAnimeDetails()
        fetchAnimeReviews()
    },[rated, animeData])

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
                                            animeData.title_english  ?  animeData.title_english : animeData.title 
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
                                <div className='flex items-center gap-8 justify-between bg' >
                                    <h1 className=' text-lg  font-semibold'>
                                        {
                                            animeData.title_english  ?  animeData.title_english : animeData.title 
                                        }
                                    </h1>

                                    {/* Anime rating */}
                                    {
                                        animeDataDB &&
                                        <div className='flex items-center gap-4 bg-richwhite-20  text-richyellow-50 py-3 px-6 rounded-md'>
                                            <p className=' text-richwhite-100 text-base font-bold tracking-wide'>AniVerse Rating:  </p>
                                            <p className='flex items-center gap-1 text-base '><FaStar /> {animeDataDB.rating.toString().length > 2 ? animeDataDB.rating.toString().slice(0,3) : animeDataDB.rating.toString()}</p>
                                        </div>
                                    }
                                </div>

                                {/* episodes Info */}
                                <div className='flex gap-2 items-center'>
                                    <div className='flex gap-1  font-bold '>
                                        <div className=' text-richblack-90 bg-richyellow-50 py-[2px] px-[6px] rounded-[4px]'>{animeData.rating.split("-")[0]}</div>
                                        <div className=' bg-richblack-30 py-[2px] px-[6px] rounded-[4px]'>{animeData.episodes ? animeData.episodes : "?"}</div>
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
                                                        {   animeData.title_english  ?  animeData.title_english : animeData.title }
                                                        {" "}
                                                    </span>
                                                    SUB online, or you can even watch
                                                    <span className=' font-bold'>
                                                        {" "}
                                                        {animeData.title_english  ?  animeData.title_english : animeData.title }
                                                        {" "}
                                                    </span> DUB in HD quality. You can also find
                                                    <a className=' font-bold' href={animeData.studios[0].url ? animeData.studios[0].url : "#"}> 
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
                                <div className=' text-socialMedia-twitter   overflow-hidden flex items-center gap-2  bg-richwhite-100 h-14 w-44  rounded-lg relative'>
                                    <TbMessageCircle2Filled size={35} className=' ml-2' />
                                    <p className=' text-lg font-bold'>{reviews && reviews.length}</p>
                                    <img className=' absolute -top-4 right-0 h-24 ' src={commentsCount} />
                                </div>
                            </div>
                }
                    </div>
                </div>
            </div>

            <ShareWithFriends bgColor = {"bg-richblack-100"}/>

            
            <div className='flex flex-col lg:flex-row px-4 gap-8 mt-8'>
                {/* Reviews, character and recommended anime */}
                <div className=' w-full flex flex-col gap-2'>
                    <div>
                        <h2 className=' font-semibold mb-5 text-[26px]  text-richyellow-50'>Comments</h2>
                        {/* Reviews container */}
                        <div className=' bg-richblack-5 flex flex-col gap-6  p-8 rounded-md'>
                            {/* Show total number of comments */}
                            <div  className=' text-richwhite-100 flex gap-2 items-center'>
                                <BiComment />
                                <p>Total reviews: {reviews && reviews.length}</p>
                            </div>
                            
                            {
                                errorMsg && <div className=' bg-richpink-10 text-socialMedia-reddit w-full font-bold p-1'>
                                                <p>{errorMsg}</p>
                                            </div>
                            } 

                            {/* TODO: If there is user reviewer then show that review else show the create review section */}

                            {
                                userData ?
                                (
                                    <div>
                                        {
                                            reviews &&
                                            reviews.filter( review => review.userId.userName === userData.user?.userName).length === 0 ?
                                            (
                                                <div className='flex items-start'>
                                                {/* For image */}
                                                <div className='w-8 rounded-full overflow-hidden'>
                                                    <img className=' object-cover' src={ userData ? userData.user.image : unknownProfile } alt='unknown' />
                                                </div>

                                                {/* FOr user deaitls and  */}
                                                <div className=' flex flex-col gap-4 w-full px-4'>
                                                
                                                    {/* Username */}
                                                    <p className=' text-richwhite-100 opacity-90'>
                                                        {
                                                            userData ? 
                                                            `You are Rating as ${userData.user.userName}` :
                                                            "You need to Login / Register for Rating and Reviewing the anime"
                                                        }
                                                    </p>

                                                    <form 
                                                    className='flex flex-col gap-2'
                                                    onSubmit={handleSubmit(submitHandler)}>

                                                        {/* Rating */}
                                                        <div className='flex gap-2 h-[2rem]'>
                                                            <p className=' text-richwhite-50'>Rating:</p>
                                                            <div className='flex'>
                                                                {[...Array(5)].map( (star, index) => {
                                                                    const currentRating = index + 1
                                                                    return (
                                                                        <label key={index} className=' appearance-none  cursor-pointer h-[2rem]'>
                                                                            <FaStar
                                                                            className={`${currentRating <= rating ? " text-richyellow-50": ""}`}
                                                                            size={25} />
                                                                            <input 
                                                                                className=' appearance-none hidden'
                                                                                type='radio'
                                                                                name='rating'
                                                                                onClick={() => setRating(currentRating)}
                                                                            />
                                                                        </label>
                                                                    )
                                                                })}
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                        <div className=' flex flex-col gap-1'>
                                                            <p className=' text-richwhite-50'>Review:</p>
                                                            <textarea 
                                                                rows="3"
                                                                className=' text-richwhite-100 rounded-md appearance-none bg-richwhite-10 focus:outline-none p-2 w-full'
                                                                type='text'
                                                                id='review'
                                                                name='review'
                                                                required
                                                                placeholder='Enter your review'
                                                                {...register("review",{required:true})}
                                                            />
                                                        </div>

                                                        <button className=' w-fit bg-richyellow-40 py-1 px-2 rounded-md'>
                                                            Rate
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                            ):
                                            (
                                                reviews && 
                                                reviews.filter( (review) => review.userId.userName === userData.user.userName)
                                                    .map( (review, index) => (
                                                    <ReviewsCard key={index} review = {review} />
                                                ) )
                                            )
                                        }
                                        {/* Show all reviews */}
                                        <div className='flex flex-col gap-6 mt-8'>
                                            
                                            {
                                                reviews && 
                                                reviews.filter( (review) => 
                                                    review.userId.userName !== userData.user.userName)
                                                    .map( (review, index) => (
                                                    <ReviewsCard  key={index} review = {review} />
                                                ) )
                                            }
                                        </div>
                                    </div>
                                ):
                                (
                                    <div>
                                                <div className='flex items-start'>
                                                {/* For image */}
                                                <div className='w-8 rounded-full overflow-hidden'>
                                                    <img className=' object-cover' src={ userData ? userData.user.image : unknownProfile } alt='unknown' />
                                                </div>

                                                {/* FOr user deaitls and  */}
                                                <div className=' flex flex-col gap-4 w-full px-4'>
                                                
                                                    {/* Username */}
                                                    <p className=' text-richwhite-100 opacity-90'>
                                                        {
                                                            userData ? 
                                                            `You are Rating as ${userData.user.userName}` :
                                                            "You need to Login / Register for Rating and Reviewing the anime"
                                                        }
                                                    </p>

                                                    <form 
                                                    className='flex flex-col gap-2'
                                                    onSubmit={handleSubmit(submitHandler)}>

                                                        {/* Rating */}
                                                        <div className='flex gap-2 h-[2rem]'>
                                                            <p className=' text-richwhite-50'>Rating:</p>
                                                            <div className='flex'>
                                                                {[...Array(5)].map( (star, index) => {
                                                                    const currentRating = index + 1
                                                                    return (
                                                                        <label key={index} className=' cursor-pointer h-[2rem]'>
                                                                            <FaStar
                                                                            className={`${currentRating <= rating ? " text-richyellow-50": ""}`}
                                                                            size={25} />
                                                                            <input 
                                                                                className=' appearance-none hidden'
                                                                                type='radio'
                                                                                name='rating'
                                                                                onClick={() => setRating(currentRating)}
                                                                            />
                                                                        </label>
                                                                    )
                                                                })}
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                        <div className=' flex flex-col gap-1'>
                                                            <p className=' text-richwhite-50'>Review:</p>
                                                            <textarea 
                                                                rows="3"
                                                                className=' text-richwhite-100 rounded-md appearance-none bg-richwhite-10 focus:outline-none p-2 w-full'
                                                                type='text'
                                                                id='review'
                                                                name='review'
                                                                required
                                                                placeholder='Enter your review'
                                                                {...register("review",{required:true})}
                                                            />
                                                        </div>

                                                        <button className=' w-fit bg-richyellow-40 py-1 px-2 rounded-md'>
                                                            Rate
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>

                                        {/* Show all reviews */}
                                        <div className='flex flex-col gap-6 mt-8'>
                                            {
                                                reviews && 
                                                reviews.map( (review, index) => (
                                                    <ReviewsCard  key={index} review = {review} />
                                                ) )
                                            }
                                        </div>
                                    </div>
                                )
                            }

                            
                        </div>
                    </div>
                    
                    {/* recommendaed ANime */}
                    {/* For recommendedAnime */}
                    <div className=' flex w-full '>
                        {
                            recommendedAnime.length > 0 ?
                            <RecommendedAnimes recommendedAnime = {recommendedAnime}/> : 
                            console.log("chutiya giri he ")
                        }
                        
                    </div>

                </div>

                {/* <div>
                            <RecommendedAnime recommendedAnime = {recommendedAnime}/> 
                        </div> */}
                
                {/* Related Anime and genres */}
                <div className='w-[30%] flex flex-col gap-10'>
                    <RelatedAnime animeData = {animeData}/>
                    <Genre />
                </div>
            </div>
            <Footer/>
        </div>
        
    </div>
  )
}

export default FullReview