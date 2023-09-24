import React from 'react'
import {FaStar, FaPlus, FaPlay} from "react-icons/fa"
import {TiTick} from 'react-icons/ti'
import { toMMDDYYY } from '../../service/inFormalDate'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove } from '../../slices/watchListSlice'

const HoveredAnimeCard = ({anime}) => {
    
    const dispatch = useDispatch()
    const watchList = useSelector( state => state.watchList)

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
        <h5 className=' font-bold text-richwhite-100'>
            {anime.title}
        </h5>

        
        <div className='flex flex-col gap-3'>
            {/* Star and type */}
            <div className='flex justify-between'>
                <div className='flex text-richyellow-40 items-center gap-2'>
                    <div className=' '><FaStar /> </div>
                    <p className=' font-bold'>{anime.score}</p>
                </div>
                <p className=' text-socialMedia-twitter font-semibold'>{anime.type}</p>
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
                <p className=' '>
                    <span className=' font-bold text-richyellow-50'>
                        Japanese:
                    </span> {
                                anime.title_japanese &&
                                anime.title_japanese.length > 10 ? anime.title_japanese.slice(0,10) + "..." : anime.title_japanese
                                }
                </p>
                <p className=''><span className=' font-bold text-richyellow-50'>Rating:</span> {anime.rating ? anime.rating: ""}</p>
                <p>
                    <span className=' font-bold text-richyellow-50'>Aired:</span>
                    {
                        toMMDDYYY(anime.aired.from)
                    }
                </p>
                <p><span className=' font-bold text-richyellow-50'>Genres:</span>{getAnimeGenre()}
                </p>
            </div>
        </div>
        <div className='flex  text-richblack-90 items-center justify-between '>
            <NavLink to={`/full-anime-detials/${anime.mal_id}/${anime.title.split(" "). join("-")}`} className={" w-4/5"}>
                <div className='flex justify-center rounded-3xl gap-2  items-center py-2 px-10 bg-richyellow-50'>
                    <FaPlay />
                    <p>View Now</p>
                </div>
            </NavLink>

            {
                watchList.some( (object) => object.mal_id === anime.mal_id ) ?
                <div
                onClick={() => dispatch(remove(anime.mal_id))}
                className='h-10 w-10 flex cursor-pointer items-center justify-center text-sm rounded-full bg-richwhite-100'>
                    <TiTick size={25}/>
                </div> : 

                <div
                onClick={() => dispatch(add(anime))}
                className='h-10 w-10 flex cursor-pointer items-center justify-center text-sm rounded-full bg-richwhite-100'>
                    <FaPlus size={15}/>
                </div>
            }

            
        </div>
    </div>
  )
}

export default HoveredAnimeCard