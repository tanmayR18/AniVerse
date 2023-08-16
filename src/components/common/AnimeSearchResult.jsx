import React from 'react'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { useState } from 'react'
import { computeHeadingLevel } from '@testing-library/react'
import { useEffect } from 'react'

import AnimeCard from './AnimeCard'
import Pagination from './Pagination'


const AnimeSearchResult = ({filteresUrl}) => {
    const location = useLocation()
    const [paginationData, setPaginartionData] = useState("")
    const [animes, setAnimes] = useState([])
    const [page, setPage] = useState(1)
    const {fetchGeneralAnimeApi} = useContext(AppContext)
    const animeName = location.pathname.split("/").at(-1).split("-").join(" ")
    const heading = location.pathname.split("/").at(1)

    useEffect(()=>{
        
        // if(location.pathname === "/filter"){
        //     fetchGeneralAnimeApi(filteresUrl)
        //         .then( result => {
        //             setAnimes(result.data.data)
        //             setPaginartionData(result.data.pagination)
        //         })
        //         .catch( error => console.log(error))
        // } else{
        //     fetchGeneralAnimeApi(Object.assign({},{q:animeName,order_by:"popularity",sort:"asc",page:page},filteresUrl))
        //         .then( result => {
        //             setAnimes(result.data.data)
        //             setPaginartionData(result.data.pagination)
        //         })
        //         .catch( error => console.log(error))
        // }
        fetchGeneralAnimeApi( heading === "anime-details" ?  
                                Object.assign({},{q:animeName,order_by:"popularity",sort:"asc",page:page},filteresUrl):
                                Object.assign({},filteresUrl,{page:page})  ) 

                .then( result => {
                    setAnimes(result.data.data)
                    setPaginartionData(result.data.pagination)
                })
                .catch( error => console.log(error))
    },[page,filteresUrl])
    // page, filteresUrl, animeName, heading
        
  return (
    <div className='flex flex-col gap-10'>
        <h3 className='text-[1.5rem] text-richyellow-50'>
        {/* For Searched Anime */}
        {
            heading === "anime-details" && (
            <span>
                Search result for: <strong><em>{animeName}</em></strong>
            </span>
            )
        }
        {/* FOr filtered anime */}
        {
            heading === "filter" && (
                <span className=' font-bold text-richyellow-40 text-[1.8rem]'>
                    Filter Results
                </span>
            )
        }
        {/* For Genre page */}
        {
            heading === "Genre" && (
                <span className=' font-bold text-richyellow-40 text-[1.8rem]'>
                    {animeName} Anime
                </span>
            )
        }
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