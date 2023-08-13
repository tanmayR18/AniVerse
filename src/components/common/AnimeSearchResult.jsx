import React from 'react'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { useState } from 'react'
import { computeHeadingLevel } from '@testing-library/react'
import { useEffect } from 'react'

import AnimeCard from './AnimeCard'
import Pagination from './Pagination'


const AnimeSearchResult = () => {
    const location = useLocation()
    const [animes, setAnimes] = useState([])
    const {fetchGeneralAnimeApi} = useContext(AppContext)
    const animeName = location.pathname.split("/").at(-1).split("-").join(" ")
   

    useEffect(()=>{
        fetchGeneralAnimeApi({q:animeName,order_by:"popularity",sort:"asc"})
        .then( result => setAnimes(result.data.data))
    },[])
        
  return (
    <div>
        <h3 className='text-[1.5rem] text-richyellow-50'>
            Search result for: <strong><em>{animeName}</em></strong>
        </h3>
        <div className='grid grid-cols-4 gap-3 w-full'>
            {
                animes.map( (anime,index) => (
                    <AnimeCard key={index} anime = {anime} />
                ))
            }
        </div>
        <Pagination animes = {animes}/>
    </div>
  )
}

export default AnimeSearchResult