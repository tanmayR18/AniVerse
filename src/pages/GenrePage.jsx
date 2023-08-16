import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import AnimeDetails from './AnimeDetails'
import GenreSection from "../components/common/GenreSection"
import AnimeSearchResult from '../components/common/AnimeSearchResult'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import gif from "../assets/share-icon.gif"
import testImage from "../assets/test-image-1.png"


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
    <div className='mt-16'>
        <Navbar/>
        <div className='flex gap-4 items-center bg-richblack-80 p-5'>
            <div className='w-14 h-14 rounded-full overflow-hidden'>
                <img
                className=' object-cover'
                src={"https://aniwatch.to/images/share-icon.gif"}
                alt='share-gif'
                />
                {/* <img src={testImage} alt='test-image' /> */}
            </div>
            <div className='flex flex-col'>
                <p className=' text-richyellow-40 font-bold '>Share AniWatch</p>
                <p className=' text-richwhite-100 text-sm'>to your friends</p>
            </div>
        </div>
        <div className='flex flex-col px-3 mt-10'>
            <div className='flex justify-between'>
                <div className='w-9/12'>
                    <AnimeSearchResult  filteresUrl = {filteresUrl}/>
                </div>
                {/* <GenreSection setGenres = {setGenres}/> */}
                <div className='w-[24%]'>
                    <GenreSection />
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default GenrePage