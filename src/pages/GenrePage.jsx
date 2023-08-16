import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import AnimeDetails from './AnimeDetails'
import GenreSection from "../components/common/GenreSection"
import AnimeSearchResult from '../components/common/AnimeSearchResult'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'


const GenrePage = () => {
    const location = useLocation()
    const genre  = location.pathname.split("/").at(-1)
    // const [genres, setGenres] = useState("1")
    const [filteresUrl, setFilteresUrl] = useState({
        genres:genre,
        order_by:"popularity",
        sort:"asc"
    })

    useEffect(() => {
        setFilteresUrl({
            genres: genre,
            order_by:"popularity",
            sort:"asc"
        })
        console.log(genre, "is updated")
    },[genre])
  return ( 
    <div>
        <Navbar/>
        <div className='flex flex-col'>
            <div></div>
            <div className='flex'>
                <AnimeSearchResult  filteresUrl = {filteresUrl}/>
                {/* <GenreSection setGenres = {setGenres}/> */}
                <GenreSection />
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default GenrePage