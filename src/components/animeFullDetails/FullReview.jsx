import React from 'react'
import { NavLink } from 'react-router-dom'
import {BsCircleFill} from "react-icons/bs"
import YouTube from 'react-youtube';

const FullReview = ({setReview, animeData}) => {
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
    <div className=' absolute w-full min-h-screen h-auto overflow-y-auto backdrop-blur-xl bg-[rgba(40,38,38,0.7)] z-30'>
        {/* <div className=' py-16 px-4'>
            <button
            onClick={() => setReview(false)}
            className='flex text-richblack-90 gap-2 items-center py-2 px-4 bg-richyellow-40 rounded-3xl'
            >
                go to details page
            </button>
        </div> */}
        
        {/* Main COntainer */}
        <div className=' py-20 flex flex-col tems-center p-8 text-richwhite-100 min-h-screen h-auto overflow-y-auto'>
            {/* Header info */}
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
            <div>
                {/* Image */}
                <div>

                </div>

                {/* Anime Info */}
                <div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default FullReview