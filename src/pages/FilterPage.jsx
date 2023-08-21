import React from 'react'
import { useState } from 'react'
// import { useLocation } from 'react-router-dom'
import FilterSection from '../components/common/FilterSection'
import AnimeSearchResult from '../components/common/AnimeSearchResult'
import {BsCircleFill} from "react-icons/bs"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"

const FilterPage = () => {
    // const location = useLocation()
    // const animeName = location.pathname.split("/").at(-1).split("-").join(" ")
    const [filteresUrl, setFilteresUrl] = useState({})
  return (
    <div>
        <div className='p-16 flex flex-col gap-8 mt-14'>
            <Navbar/>
            <div className=' flex gap-3 items-center'>
                <h3 className=' text-[1.5rem] text-richwhite-100'>Home</h3>
                < BsCircleFill size={6}
                    className='text-richwhite-20'
                />
                <p className=' text-[1rem] text-richwhite-50 opacity-70'>Filter</p>
            </div>
            {/* Section for setting the api url and tags */}
            <FilterSection setFilteresUrl = {setFilteresUrl} />

            {/* Section for fetching the data accourding to the url */}
            <AnimeSearchResult  filteresUrl = {filteresUrl} />
            
        </div>
        <Footer/>
    </div>
  )
}

export default FilterPage