import React from 'react'
import ShareWithFriends from '../common/ShareWithFriends'
import { NavLink } from 'react-router-dom'
import {BsCircleFill} from 'react-icons/bs'
import {MdRateReview} from 'react-icons/md'
import {FaPlus} from 'react-icons/fa'
import { useState } from 'react'

const FullAnimeDetails = ({animeData, setReview}) => {
    const [readMore, setReadMore] = useState(true)
    animeData && console.log(animeData.synopsis.slice(0,265)+"...")
    console.log(animeData)
  return (
    // Div for having a backdrop filter
    <div className=' text-richwhite-100  absolute w-full h-full backdrop-blur-xl bg-[rgba(40,38,38,0.7)] z-30'>
        {/* Main container div */}
        <div className='pt-16  px-4 flex gap-5 h-full justify-between bg-richblack-10 '>

            {/* Left section */}
            <div className=' flex  gap-5 w-full  '>
                {/* Image div */}
                <div className=' w-[14rem]'>
                    {
                        animeData && 
                        <img 
                        className='object-cover w-full h-[15rem]'
                        src={animeData.images.jpg.image_url} alt='animePoster' />
                    }
                </div>

                {/* Info section */}
                <div className=' w-full'>
                    
                    {/* Header navigation and title */}
                    <div className='flex items-center gap-2'>
                        <NavLink className={" opacity-90"} to={"/home"}>Home</NavLink>
                        <BsCircleFill size={5}/>
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
                                <BsCircleFill size={5}/>
                                <div>
                                    {
                                    animeData.titles[3] === undefined ? animeData.title : animeData.titles[3].title
                                    }
                                </div>
                            </div>
                        }
                    </div>

                    {/* anime Title */}
                    {
                        animeData && 
                        <h1 className=' text-lg font-bold'>
                            {
                                animeData.titles[3] === undefined ? animeData.title : animeData.titles[3].title
                            }
                        </h1>
                    }

                    {/* Anime episodes info */}
                    <div className='flex'>
                        {
                            animeData && 
                            <div className='flex gap-2 items-center'>
                                <div className='flex gap-1  font-bold '>
                                    <div className=' text-richblack-90 bg-richyellow-50'>{animeData.rating.split("-")[0]}</div>
                                    <div className=' bg-richblack-30'>{animeData.episodes}</div>
                                </div>
                                <BsCircleFill size={5}/>
                                <NavLink to={`/category/${animeData.type}`}>
                                    <div>
                                        {
                                            animeData.type
                                        }
                                    </div>
                                </NavLink>
                                <BsCircleFill size={5}/>
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
                        className='flex text-richblack-90 gap-2 items-center py-2 px-4 bg-richyellow-40 rounded-3xl'>
                            <MdRateReview size={20}/>
                           <span>Rate & Review </span>
                        </button>

                        <button className='flex text-richblack-90 gap-2 items-center py-2 px-4 bg-richwhite-100 rounded-3xl'>
                            <FaPlus/>
                            <span>Add to List</span>
                        </button>
                    </div>

                    {/* Anime description and info about website */}
                    <div>
                            {
                                animeData && <span>
                                                {
                                                    readMore ? 
                                                    animeData.synopsis.slice(0,265)+"..." :
                                                    animeData.synopsis
                                                }
                                            </span>
                                            
                            }
                            <button
                            className=' ml-2'
                            onClick={() => { setReadMore( (prevState) => !prevState) }}
                            >
                                {
                                    readMore ? "+ More" : "- Less"
                                }
                            </button>
                        {
                            animeData && 
                            <p>
                                {
                                    `AniWatch is the best site to watch ${animeData.title} SUB online, or you can even watch ${animeData.title} DUB in HD quality. You can also find ${ animeData.studios[0].name || "such"} anime on AniWatch website.`
                                }
                            </p>
                        }
                    </div>

                    <ShareWithFriends bgColor={""} />
                </div>
            </div>

            {/* Right section */}
            <div className=' bg-richwhite-5 bg-opacity-30 w-[23%] flex items-center'>
                {
                    animeData &&
                    <div className='flex flex-col gap-3'>
                     {/* Anime info*/}
                     <div>
                        <p>Japanese: {animeData.title_japanese}</p>
                        <p>Synonyms: {animeData.title_synonyms}</p>
                        <p>Aired: {animeData.aired.string}</p>
                        <p>Premiered: {animeData.season} {animeData.year}</p>
                        <p>Duration: {animeData.duration}</p>
                        <p>Status: {animeData.status}</p>
                        <p>Mal score: {animeData.score}</p>
                     </div>

                     {/* Genres */}
                     <div className='flex gap-x-2 flex-wrap'> 
                        <div>Genres</div>
                        {
                            animeData.genres.map( (genre, index) => (
                                <NavLink to={`/genre/${genre.mal_id}`} key={index}>{genre.name}</NavLink>
                            ))
                        }
                        {
                            animeData.explicit_genres.map( (genre, index) => (
                                <NavLink to={`/genre/${genre.mal_id}`} key={index}>{genre.name}</NavLink>
                            ))
                        }
                        {
                            animeData.demographics.map( (genre, index) => (
                                <NavLink to={`/genre/${genre.mal_id}`} key={index}>{genre.name}</NavLink>
                            ))
                        }
                     </div>

                     {/* Productions and studio */}
                    <div>
                        <div className='flex'>
                            <div>Studios: </div>
                            {
                                animeData.studios.map( (studio,index) => (
                                    <a key={index} href={studio.url} >{studio.name}</a>
                                ))
                            }
                        </div>
                        <div className='flex gap-x-2 flex-wrap'>
                            <div>Producers: </div>
                            {
                                animeData.producers.map( (studio,index) => (
                                    <a key={index} href={studio.url} >{studio.name}</a>
                                ))
                            }
                            {
                                animeData.licensors.map( (studio,index) => (
                                    <a key={index} href={studio.url} >{studio.name}</a>
                                ))
                            }
                            {
                                animeData.studios.map( (studio,index) => (
                                    <a key={index} href={studio.url} >{studio.name}</a>
                                ))
                            }
                        </div>
                    </div>

                </div>
                }
            </div>
        </div>
    </div>
  )
}

export default FullAnimeDetails