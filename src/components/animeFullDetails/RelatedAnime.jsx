import React from 'react'
import { useState } from 'react'
import SideBarCard from '../common/SideBarCard'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const RelatedAnime = ({animeData}) => {

    const location = useLocation()
    // For getting the related anime
    let relatedAnime = []
    for (const i of animeData.relations){
        console.log(i.entry)
        relatedAnime.push(...i.entry)
    }
    const [slicedLength, setSlicedLength] = useState(1) 
    

    //This function increases the count of related anime by 6 after every clicked event
    function slicedLengthHandler(){

        setSlicedLength( (prevState) => prevState + 6 > relatedAnime.length ?
                                         (prevState + (relatedAnime.length - (prevState + 6) )) : 
                                         (prevState + 6) )
    }

    useEffect(() => {
        setSlicedLength(() => relatedAnime.length > 6 ?  parseInt(6) : relatedAnime.length)
    },[location.pathname])
    
    console.log("Here is the related anime", relatedAnime)

  return (
    <div>
        <h2 className=' font-semibold mb-5 text-[26px]  text-richyellow-50'>Related Anime</h2>
        <div className='flex flex-col gap-3 '>
            {
                relatedAnime.filter( anime => anime.type === "anime")
                            .slice(0,slicedLength)
                            .map((anime,index) => (
                                <SideBarCard key={index} anime={anime} />
                            ))
            }
        </div>

        {
            slicedLength < relatedAnime.length ?
            <button
            className=' bg-richwhite-10 text-richwhite-100 font-bold w-full mt-8 py-3 rounded-lg hover:bg-richwhite-20 transition-all duration-300' 
            onClick={slicedLengthHandler}>
                Show more
            </button> :
            <button
            className={` bg-richwhite-10 text-richwhite-100 font-bold w-full ${relatedAnime.length <= 6 ? "hidden" : ""} mt-8 py-3 rounded-lg hover:bg-richwhite-20 transition-all duration-300`}
            onClick={() => setSlicedLength(relatedAnime.length > 6 ?  parseInt(6) : relatedAnime.length)}>
                Show less
            </button>
        }
    </div>
  )
}

export default RelatedAnime