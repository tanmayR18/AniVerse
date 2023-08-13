import React from 'react'
import {FaPlay} from 'react-icons/fa'
import {GoDotFill} from 'react-icons/go'
import HoveredAnimeCard from './HoveredAnimeCard'

const AnimeCard = ({anime}) => {
  return (
    <div className=' aspect-3/5 w-[98%] '>
        <div className=' h-5/6  relative group'>
            <div className='overflow-hidden w-full h-full'>
                <img 
                className='object-cover h-auto w-[100%] max-w-[100%] '
                src={anime.images.jpg.image_url} alt='animePosters'/>
            </div>
            <div className='absolute backdrop-blur-md w-full h-full opacity-0 top-0 left-0 group-hover:opacity-100 transition-all duration-200
            flex items-center justify-center text-richwhite-50'>
                <FaPlay size={30}/>
            </div>

            <div className='w-[120%] rounded-lg absolute scale-0 -top-1/4 -right-3/4  group-hover:scale-100 transition-all duration-200 z-20'>
                <HoveredAnimeCard  anime = {anime} /> 
            </div>
        </div>
        <p className=' text-richwhite-100 font-semibold'>
        {
            anime.title.length > 25 ? anime.title.slice(0,25) + "..." : anime.title
        }
        </p>
        <div className='flex items-center gap-2 text-richwhite-50 text-sm'>
        <p>{anime.type}</p>
        <GoDotFill 
            size={10}
        />
        <p>{anime.duration}</p>
        </div>

    </div>
  )
}

export default AnimeCard