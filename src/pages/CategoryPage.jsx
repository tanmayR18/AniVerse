import React from 'react'
import Navbar from '../components/common/Navbar'
import ShareWithFriends from '../components/common/ShareWithFriends'
import AnimeSearchResult from '../components/common/AnimeSearchResult'
import GenreSection from "../components/common/GenreSection"
import { useState } from 'react'
import Footer from '../components/common/Footer'
import Top10 from '../components/common/Top10'
import { useLocation } from 'react-router-dom'

const Movies = () => {
    const location = useLocation()
    const type = location.pathname.split("/").at(-1)
    console.log("Ye type he", type)
    const [filteresUrl, setFilteresUrl] = useState({
        type:type,
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
                        {
                            type === "tv" && "TV Series Anime"
                        }
                        {
                            type === "movie" && "Movie Anime"
                        }
                        {
                            type === "ova" && "OVA Anime"
                        }
                        {
                            type === "ona" && "ONA Anime"
                        }
                        {
                            type === "special" && "Special Anime"
                        }
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

export default Movies