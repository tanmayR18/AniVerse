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
    const [paginationData, setPaginartionData] = useState("")
    const [animes, setAnimes] = useState([])
    const [page, setPage] = useState(1)
    const {fetchGeneralAnimeApi} = useContext(AppContext)
    const animeName = location.pathname.split("/").at(-1).split("-").join(" ")
   

    useEffect(()=>{
        
        fetchGeneralAnimeApi({q:animeName,order_by:"popularity",sort:"asc",page:page})
        .then( result => {
            setAnimes(result.data.data)
            setPaginartionData(result.data.pagination)
        })
        .catch( error => console.log(error))
    },[page, animeName])
        
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
        <Pagination paginationData = {paginationData}
        page = {page} setPage = {setPage} 
        setAnimes = {setAnimes}/>
    </div>
  )
}

export default AnimeSearchResult