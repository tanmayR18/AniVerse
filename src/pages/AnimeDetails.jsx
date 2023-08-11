import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import FilterSection from '../components/common/FilterSection'
import AnimeSearchResult from '../components/common/AnimeSearchResult'
import MostPopular from '../components/common/MostPopular'
import GenreSection from '../components/common/GenreSection'

const AnimeDetails = () => {
    const location = useLocation()
    const animeName = location.pathname.split("/").at(-1).split("-").join(" ")
  return (
    <div className=''>
        <Navbar/>

        <div className=' flex justify-between mt-32 w-[98%] max-w-[1600px] mx-auto'>
            
            {/* Left Portion */}

            <div className='flex flex-col gap-10 w-9/12'>
                <FilterSection/>
                <AnimeSearchResult/>
            </div>

            
            <aside className=' flex  flex-col gap-10'>
                <MostPopular/>
                <GenreSection />
            </aside>

        </div>
    </div>
  )
}

export default AnimeDetails