import React, { useEffect, useRef, useState } from 'react'
import {FaPlay} from 'react-icons/fa'
import {GoDotFill} from 'react-icons/go'
import HoveredAnimeCard from './HoveredAnimeCard'


const AnimeCard = ({anime}) => {

    const [coords, setCoords] = useState({x: 0, y: 0});

    useEffect(() => {
      const handleWindowMouseMove = event => {
        setCoords({
          x: event.clientX,
          y: event.clientY,
        });
      };
      window.addEventListener('mousemove', handleWindowMouseMove);
  
      console.log(coords.x)

      return () => {
        window.removeEventListener(
          'mousemove',
          handleWindowMouseMove,
        );
      };
    }, [coords]);

  return (
    <div className=' aspect-3/5 w-[98%] '>
        <div className=' h-5/6  relative group'>
            {
                anime.images.jpg.image_url &&
                <div className='overflow-hidden w-full h-full relative'>
                <img 
                className='object-cover h-auto w-[100%] max-w-[100%] '
                src={anime.images.jpg.image_url} alt='animePosters'/>
            </div>
            }
            
            {/* For making the anime photo bottom side blackish */}
            <div className='w-full h-24 bottom-0  left-0 bg-gradient-to-t from-richblack-80 absolute '>
            </div>

            {/* For Bluring the image */}
            <div className='absolute backdrop-blur-md w-full h-full opacity-0 top-0 left-0 group-hover:opacity-100 transition-all duration-200
            flex items-center justify-center text-richwhite-50'>
                <FaPlay size={30}/>
            </div>

            {/* For creating hover card */}
            <div  className={`w-[20rem] rounded-lg absolute scale-0 -top-1/2 ${coords.x > 990 ? "-left-3/4" : "-right-3/4"}  group-hover:scale-100 transition-all duration-200 z-20`}>
                <HoveredAnimeCard   anime = {anime} /> 
            </div> 
            
        </div>

        {/* Content at the bottom of the Card */}
        <p className=' text-richwhite-100 font-semibold'>
        {
            (anime.title_english  ?  anime.title_english : anime.title).length > 28 
            ? (anime.title_english  ?  anime.title_english.slice(0,25) : anime.title.slice(0,25)) + "..." : 
            anime.title_english  ?  anime.title_english : anime.title
        }
        </p>
        <div className='flex items-center gap-2 text-richwhite-50 text-sm'>
        <p>{anime.type && anime.type}</p>
        <GoDotFill 
            size={10}
        />
        <p>{anime.duration}</p>
        </div>

    </div>
  )
}

export default AnimeCard