import React from 'react'
import Navbar from '../components/common/Navbar'
import ShareWithFriends from '../components/common/ShareWithFriends'
import AnimeSearchResult from '../components/common/AnimeSearchResult'
import GenreSection from "../components/common/GenreSection"
import { useState } from 'react'
import Footer from '../components/common/Footer'
import Top10 from '../components/common/Top10'

const TopAiring = () => {
    const [filteresUrl, setFilteresUrl] = useState({
        status: "airing",
        order_by:"popularity",
        sort:"asc"
    })
  return (
    <div  className='mt-16'>

        <Navbar/>
        <ShareWithFriends  bgColor = {"bg-richblack-80"} />

        <div className='flex flex-col px-3 mt-10'>
            <div className='flex justify-between'>
                <div className='w-9/12'>
                    {/* Heading */}
                    <h2 className='text-[1.5rem] text-richyellow-50 font-bold'>
                        Most Popular
                    </h2>
                    {/* Section for getting the url */}
                    <AnimeSearchResult  filteresUrl = {filteresUrl}/>
                </div>
                {/* <GenreSection setGenres = {setGenres}/> */}
                <div className='w-[24%]  flex flex-col'>
                    {/* Top 10 animes */}
                    <Top10/>
                    {/* Section for fetching the data */}
                    <GenreSection />
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default TopAiring