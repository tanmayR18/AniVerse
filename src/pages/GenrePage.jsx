import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import GenreSection from "../components/common/GenreSection"
import AnimeSearchResult from '../components/common/AnimeSearchResult'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
// import testImage from "../assets/test-image-1.png"
import ShareWithFriends from '../components/common/ShareWithFriends'


const GenrePage = () => {
    const location = useLocation()
    const genre  = location.pathname.split("/").at(-1)
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
    },[genre])
  return ( 
    <div className='mt-16'>

        <Navbar/>

        <ShareWithFriends bgColor = {"bg-richblack-80"}/> 

        <div className='flex flex-col px-3 mt-10'>
            <div className='flex justify-between'>
                <div className='w-9/12'>
                    {/* Section for getting the url */}
                    <AnimeSearchResult  filteresUrl = {filteresUrl}/>
                </div>
                {/* <GenreSection setGenres = {setGenres}/> */}
                <div className='w-[24%]'>
                    {/* Section for fetching the data */}
                    <GenreSection />
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default GenrePage