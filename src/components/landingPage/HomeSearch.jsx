import React, { useEffect, useState } from 'react'
import HomeNavbar from './HomeNavbar'
import ViewAndShare from './ViewAndShare'
import logo from "../../assets/full_logo.png"
import charImage from "../../assets/home-anime-characters.png"
import {FaSearch} from "react-icons/fa"
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const HomeSearch = () => {

    // const topSearchAPi = "https://api.jikan.moe/v4/anime?status=airing&order_by=popularity&sort=asc"
    const [topSearch, setTopSearch] = useState([])

    const {fetchGeneralAnimeApi} = useContext(AppContext)

    // bg-richwhite-10
 
    useEffect( () => {
        fetchGeneralAnimeApi({status: "airing", order_by: "popularity", sort: "asc"})
            .then( (result) => setTopSearch(result.data))
            .catch( (error) => console.log(error))
    },[])

  return (
    

    <div className=''>
        <div className='bg-richwhite-10 z-40'>
            <div className=' py-16 pb-28 w-10/12 mx-auto max-w-[1200px] relative '>

                {/* Anime Character Image */}
                <img 
                className='absolute w-[55%] -right-4 bottom-10 z-20'
                src={charImage} alt='anime characters' />

                {/* Navbar */}
                <HomeNavbar/>

                {/* Search and Top Search seciton */}

                <div className='flex flex-col mt-36 w-[50%] gap-4'>
                    {/* Logo */}
                    <NavLink to={"/"}>
                        <img className='h-[90px] w-[150px]'  src={logo} alt='Aniverse logo' />
                    </NavLink>

                    {/* Input Field */}
                    <form className='flex items-center gap-2'>
                        <input className='w-full h-12 rounded-[2rem] outline-none text-lg px-5 text-richblack-50'
                        placeholder='Search anime...'>

                        </input>

                        <button className='p-4 bg-richyellow-40 rounded-full' >
                            <FaSearch/>
                        </button>
                    </form>

                    {/* Top Search */}
                    <div className=''>
                        
                        <ul className='flex flex-wrap text-[15px]'>
                            <li className=' text-richwhite-100  text-[16px] font-semibold mr-2'>
                            Top search:</li>
                        {
                            topSearch.slice(0,10).map( (search, index) => {
                                const shortendTitle = search.title.length > 24 ? search.title.slice(0,25)+"..." : search.title
                                const comma = index < topSearch.slice(0,10).length  - 1 ? ", " : ""
                                return (
                                    <NavLink to={`/${search.title}`} key={search.mal_id}>
                                        <li
                                        className=' text-richwhite-5 hover:text-richyellow-50 duration-200 my-[1px] mx-1'
                                        key={search.mal_id} >
                                            {shortendTitle}{comma}
                                        </li>
                                    </NavLink>
                                )
                            })
                        }
                        </ul>
                    </div>
                </div>

            </div>
        </div>
            
    </div>

  )
}

export default HomeSearch