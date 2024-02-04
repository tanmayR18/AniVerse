import React from 'react'
import NavbarCommonComp from '../components/common/NavbarCommonComp'
import Navbar from '../components/common/Navbar'
import { useSelector } from 'react-redux'
import AnimeCard from '../components/common/AnimeCard'
import {FaHeart} from "react-icons/fa"
import notFound from "../assets/noAnimeFound.jpeg"
import Footer from "../components/common/Footer"

const WatchList = () => {
    const watchList = useSelector( state => state.watchList)
    console.log("Inside the watch list section", watchList.length, watchList)
  return (
    <div className='flex flex-col items-center'>
        <Navbar bgColor={"bg-richblack-20 backdrop-blur "}  />
        <NavbarCommonComp/>

        {/* Heading */}
        {
            watchList.length > 0 && 
            <h1 className=' flex w-10/12 my-10 text-[2rem] gap-2 items-center text-richwhite-100 font-semibold'>
                <FaHeart className=' ' />
                <p>To Watch</p>
            </h1>
        }
        
        {/* ANime list */}
        <div className='grid w-10/12 gap-4 mb-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {
                watchList.map( anime => (
                    <AnimeCard key = {anime.mal_id} anime = {anime} />
                ))
            }
        </div>

        {/* IF there is no anime in list */}
        {
            watchList.length === 0 &&
            <div className=' flex flex-col items-center my-10 gap-4'>
                <h1 className=' text-richwhite-100 font-bold text-[2rem]'>
                    OOP's no anime in the watchList
                </h1>
                <img alt='not founf image' className=' aspect-auto h-60 rounded-md' src={notFound} />
            </div>
        }

        <Footer/>
    </div>
  )
}

export default WatchList