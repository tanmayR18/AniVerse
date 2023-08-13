import React from 'react'
// import {BsStarFill} from "react-icons/bs"
import {FaStar} from "react-icons/fa"
import { toMMDDYYY } from '../../service/inFormalDate'

const HoveredAnimeCard = ({anime}) => {
    
    function getAnimeGenre(){
        const animeGenres = []
        for(const i in anime.genres){
            animeGenres.push(anime.genres[i].name)

        }
        return animeGenres.join(",")
    }
    

    
  return (
    <div className=' bg-richwhite-10 backdrop-blur-lg p-4 rounded-lg text-richwhite-50 flex flex-col gap-4'>
        <h5>
            {anime.title}
        </h5>
        <div className='flex flex-col gap-3'>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <div className=' text-richyellow-50'><FaStar /> </div>
                    <p>{anime.score}</p>
                </div>
                <p>{anime.type}</p>
            </div>
            <p className='text-sm'>
                {
                    anime.synopsis.length > 100 ? anime.synopsis.slice(0,200) + "..." : anime.synopsis
                }
            </p>
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
    </div>
  )
}

export default HoveredAnimeCard