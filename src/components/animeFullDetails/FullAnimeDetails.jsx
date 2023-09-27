import React from 'react'
import ShareWithFriends from '../common/ShareWithFriends'
import { NavLink, useLocation } from 'react-router-dom'
import {BsCheckLg, BsCircleFill} from 'react-icons/bs'
import {MdRateReview} from 'react-icons/md'
import {FaPlus} from 'react-icons/fa'
import { useState } from 'react'
import Navbar from '../common/Navbar'
import RecommendedAnimes from './RecommendedAnimes'
import Footer from '../common/Footer'
import Genre from '../common/GenreSection'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove } from '../../slices/watchListSlice'
import {TiTick} from 'react-icons/ti'

const FullAnimeDetails = ({animeData, setReview, recommendedAnime}) => {
    const [readMore, setReadMore] = useState(true)
    const location = useLocation()
    const dispatch = useDispatch()
    const watchList = useSelector( state => state.watchList)

    const animeId = location.pathname.split("/").at(-2)
    const user = useSelector( state => state.auth)

    // animeData && console.log(animeData.synopsis.slice(0,265)+"...")
    // console.log(animeData)
  return (
    // Div for having a backdrop filter
    <div className=' text-richwhite-100  absolute w-full h-full backdrop-blur-xl bg-[rgba(40,38,38,0.7)] z-30'>
        {/* Main container div */}
        <div className='pt-16  px-4 flex  overflow-y-auto flex-col lg:flex-row gap-5 h-full justify-between bg-richblack-10 '>
            <Navbar  bgColor={"bg-richblack-20 backdrop-blur "} />
            {/* Left section */}
            <div className=' flex  items-center  gap-5 w-full p-6'>
                <div className='flex flex-col lg:flex-row md:flex-row gap-6'>
                    {/* Image div */}
                <div className='flex w-[14rem]'>
                    {
                        animeData && 
                        <img 
                        className='object-cover w-full h-[15rem]'
                        src={animeData.images.jpg.image_url} alt='animePoster' />
                    }
                </div>

                {/* Info section */}
                <div className='flex flex-col gap-5 w-full'>
                    
                    {/* Header navigation and title */}
                    <div className='flex items-center gap-2 text-sm opacity-80 tracking-wider '>
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

                    {/* anime Title */}
                    {
                        animeData && 
                        <h1 className=' text-[2.5rem] font-semibold'>
                            {
                                animeData.title_english  ?  animeData.title_english : animeData.title
                            }
                        </h1>
                    }

                    {/* Anime episodes info */}
                    <div className='flex text-sm opacity-80'>
                        {
                            animeData && 
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
                        }
                    </div>

                    {/* reviews and add to favourite Buttons  */}
                    <div className='flex gap-4'>
                        <button
                        onClick={() => setReview(true)}
                        className='flex font-bold text-richblack-90 gap-2 items-center py-2 px-4 bg-richyellow-40 rounded-3xl'>
                            <MdRateReview size={20}/>
                           <span >Rate & Review </span>
                        </button>

                       {
                            console.log("Checked",watchList.some( (object) => object.mal_id === parseInt(animeId) ))
                       }

                       {
                        watchList.some( (object) => object.mal_id === parseInt(animeId) ) ?
                        <div
                        onClick={() => dispatch(remove(parseInt(animeId)))}
                        className='h-10 w-10  flex cursor-pointer items-center justify-center text-sm rounded-full bg-richwhite-100'>
                            <TiTick size={25} className=' text-richblack-90'/>
                        </div> : 

                        <div
                        onClick={() => dispatch(add(animeData))}
                        className='h-10 w-10 flex cursor-pointer items-center justify-center text-sm rounded-full bg-richwhite-100'>
                            <FaPlus size={15} className=' text-richblack-90'/>
                        </div>
                    }

                        {/* <button  className='flex text-richblack-90 gap-2 items-center py-2 px-4 bg-richwhite-100 rounded-3xl'>
                            <FaPlus/>
                            <span>Add to List</span>
                        </button> */}
                    </div>

                    {/* Anime description and info about website */}
                    <div className=' text-sm flex flex-col gap-4'>
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
                            className=' ml-1 opacity-100 font-bold tracking-wide'
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
                                    {
                                        animeData.studios[0] &&
                                        <a className=' font-bold' href={animeData.studios[0].url ? animeData.studios[0].url : "#"}>
                                            {" "}
                                            { animeData.studios[0].name ? animeData.studios[0].name : "such"}
                                            {" "}
                                        </a>
                                    }

                                    anime on AniVerse website.
                            </p>
                        }
                    </div>

                    <ShareWithFriends paddingX0 = {true} bgColor={""} />
                </div>
                </div>
            </div>

            {/* Right section */}
            <div className=' text-richwhite-50  bg-richwhite-5 p-5 bg-opacity-30 lg:w-[25%] w-full flex items-center
             text-sm tracking-wide'>
                {
                    animeData &&
                    <div className='flex flex-col gap-3'>
                     {/* Anime info*/}
                     <div className='flex flex-col gap-1'>
                        <p><span className=' text-richwhite-100 font-bold'>Japanese: </span> {animeData.title_japanese}</p>
                        <p><span className=' text-richwhite-100 font-bold'>Synonyms: </span> {animeData.title_synonyms}</p>
                        <p><span className=' text-richwhite-100 font-bold'>Aired: </span> {animeData.aired.string}</p>
                        <p><span className=' text-richwhite-100 font-bold'>Premiered: </span> {animeData.season} {animeData.year}</p>
                        <p><span className=' text-richwhite-100 font-bold'>Duration: </span> {animeData.duration}</p>
                        <p><span className=' text-richwhite-100 font-bold'>Status: </span> {animeData.status}</p>
                        <p><span className=' text-richwhite-100 font-bold'>Mal score: </span> {animeData.score}</p>
                     </div>

                     {/* Genres */}
                     <div className='flex gap-2 flex-wrap  border-y border-richwhite-20 py-3'> 
                        <div className=' text-richwhite-100 font-bold'>Genres:</div>
                        {
                            animeData.genres.map( (genre, index) => (
                                <NavLink
                                className={"border border-richwhite-20 rounded-md px-1 hover:text-richyellow-40"}
                                to={`/genre/${genre.mal_id}`} key={index}>{genre.name}</NavLink>
                            ))
                        }
                        {
                            animeData.explicit_genres.map( (genre, index) => (
                                <NavLink
                                className={"border border-richwhite-20 rounded-md px-1 hover:text-richyellow-40"}
                                to={`/genre/${genre.mal_id}`} key={index}>{genre.name}</NavLink>
                            ))
                        }
                        {
                            animeData.demographics.map( (genre, index) => (
                                <NavLink 
                                className={"border border-richwhite-20 rounded-md px-1 hover:text-richyellow-40"}
                                to={`/genre/${genre.mal_id}`} key={index}>{genre.name}</NavLink>
                            ))
                        }
                     </div>

                     {/* Productions and studio */}
                    <div className='flex flex-col gap-1'>
                        <div className='flex'>
                            <div className=' text-richwhite-100 font-bold '>Studios: </div>
                            {
                                animeData.studios.map( (studio,index) => (
                                    <a
                                    className=' hover:text-richyellow-40'
                                    key={index} href={studio.url} >{studio.name}</a>
                                ))
                            }
                        </div>
                        <div className='flex gap-x-2 flex-wrap'>
                            <div className=' text-richwhite-100 font-bold'>Producers: </div>
                            {
                                animeData.producers.map( (studio,index) => (
                                    <a 
                                    className=' hover:text-richyellow-40'
                                    key={index} href={studio.url} >{studio.name}</a>
                                ))
                            }
                            {
                                animeData.licensors.map( (studio,index) => (
                                    <a 
                                    className=' hover:text-richyellow-40'
                                    key={index} href={studio.url} >{studio.name}</a>
                                ))
                            }
                            {
                                animeData.studios.map( (studio,index) => (
                                    <a 
                                    className=' hover:text-richyellow-40'
                                    key={index} href={studio.url} >{studio.name}</a>
                                ))
                            }
                        </div>
                    </div>

                </div>
                }
            </div>
        </div>

        <div className=' mt-10'>
        
        {/* For recommendedAnime */}
        <div className=' flex gap-5 justify-center'>
            {
                recommendedAnime.length > 0 ?
                <RecommendedAnimes className="w-2/3" recommendedAnime = {recommendedAnime}/> : 
                console.log("Didn't send the data ")
            }
            
            {
                recommendedAnime.length > 0 &&
                <Genre/>
            }
            
        </div>

        </div>
        <Footer/>
    </div>
  )
}

export default FullAnimeDetails