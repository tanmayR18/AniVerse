import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {BsCircleFill} from "react-icons/bs"
import YouTube from 'react-youtube';
import commentsCount from '../../assets/commentCountImg.png'
import {BiSolidMessageSquare} from "react-icons/bi"
import ShareWithFriends from '../common/ShareWithFriends';

const FullReview = ({setReview, animeData}) => {
    const [readMore, setReadMore] = useState(true)
    // parameter for utube video
    const opts = {
        height: "550",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
          },
    }
  return (
    <div className=' absolute w-full  min-h-screen h-auto backdrop-blur-xl bg-[rgba(40,38,38,0.7)] z-30'>
        {/* Main COntainer */}
        <div className=' py-14 flex flex-col tems-center p-8 text-richwhite-100 min-h-screen h-auto overflow-y-auto'>
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
                <div >
                {
                        animeData && 
                        <div className=' text-sm flex flex-col  gap-4'>
                            {/* Name of the anime */}
                            <h1 className=' text-lg  font-semibold'>
                                {
                                    animeData.titles[3] === undefined ? animeData.title : animeData.titles[3].title
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
    </div>
  )
}

export default FullReview