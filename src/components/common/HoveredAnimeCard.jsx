import React from 'react'
import {FaStar, FaPlus, FaPlay} from "react-icons/fa"
import { toMMDDYYY } from '../../service/inFormalDate'
import { NavLink } from 'react-router-dom'

const HoveredAnimeCard = ({anime}) => {
    
    function getAnimeGenre(){
        const animeGenres = []
        for(const i in anime.genres){
            animeGenres.push(anime.genres[i].name)

        }
        return animeGenres.join(", ")
    }
    

    
  return (
    <div className=' bg-richblack-10 backdrop-blur-lg p-4 rounded-3xl text-richwhite-50 flex flex-col gap-4'>
        {/* Heading */}
        <h5>
            {anime.title}
        </h5>

        
        <div className='flex flex-col gap-3'>
            {/* Star and type */}
            <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                    <div className=' text-richyellow-50'><FaStar /> </div>
                    <p>{anime.score}</p>
                </div>
                <p>{anime.type}</p>
            </div>

            {/* Description */}
            {
                anime.synopsis && <p className='text-sm'>
                                        {
                                            anime.synopsis.length > 100 ? anime.synopsis.slice(0,200) + "..." : anime.synopsis
                                        }
                                </p>
            }

            {/* Genres, aired date and rating */}
            <div className='text-sm'>
                <p>
                    Japanese: {
                        anime.title_japanese.length > 10 ? anime.title_japanese.slice(0,10) + "..." : anime.title_japanese
                    }
                </p>
                <p>Rating: {anime.rating}</p>
                <p>
                    Aired:
                    {
                        toMMDDYYY(anime.aired.from)
                    }
                </p>
                <p>Genres:{getAnimeGenre()}
                </p>
            </div>
        </div>
        <div className='flex  text-richblack-90 items-center justify-between '>
            <NavLink to={`/full-anime-detials/${anime.name}`} className={" w-4/5"}>
                <div className='flex justify-center rounded-3xl gap-2  items-center py-2 px-10 bg-richyellow-50'>
                    <FaPlay />
                    <p>View Now</p>
                </div>
            </NavLink>
            <div className='h-10 w-10 flex cursor-pointer items-center justify-center text-sm rounded-full bg-richwhite-100'><FaPlus/></div>
        </div>
    </div>
  )
}

export default HoveredAnimeCard