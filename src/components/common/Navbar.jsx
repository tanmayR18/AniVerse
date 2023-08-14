import React, { useState } from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import logo from "../../assets/full_logo.png"
import {FaDiscord, FaRedditAlien, FaTelegramPlane, FaTwitter, FaSearch} from 'react-icons/fa'
import {BsCheckLg, BsFillPersonFill} from "react-icons/bs"
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

    const [user, setUser] = useState(true)
    const [navbar, setNavbar] = useState(false)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    function submitHandler(event){
        event.preventDefault()
        // navigate(`/anime-details/${search.split(" ").join("-")}`)
        navigate(`/anime-details/${search.split(" ").join("-")}`)
        console.log(`/anime-details/${search.split(" ").join("-")}`)
    }

    const changeBackground = () => {
        setNavbar(window.scrollY)
    }
    window.addEventListener("scroll",changeBackground)


  return (
    <nav className={`h-auto -sm z-40 w-full fixed top-0 right-0 flex items-center justify-between px-4 py-2
        ${
            navbar === 0 ? "" : "backdrop-blur"
        }
    `}>
        {/* Hamberger menu and logo */}
        <div className='flex items-center gap-6 text-richwhite-100'>
            <GiHamburgerMenu size={28} className=' cursor-pointer'/>
            <img 
            className='w-28 h-14'
            src={logo} alt='website logo' />
        </div>

        {/* Social Media icons */}
        <div className='flex gap-3 items-center h-full '>
                <a href='https://discord.gg/m2zqAAhS' target='_blank' className='p-2 bg-socialMedia-discord rounded-full text-richwhite-100'>
                    <FaDiscord />
                </a>
                <a href='https://www.reddit.com/user/tr__18' target='_blank' className='p-2 bg-socialMedia-reddit rounded-full text-richwhite-100'>
                    <FaRedditAlien />
                </a>
                <a href='https://t.me/+G_jkbzuj6SwwMThl' target='_blank' className='p-2 bg-socialMedia-telegram rounded-full text-richwhite-100'>
                    <FaTelegramPlane />
                </a>
                <a href='https://twitter.com/tanmayrane99' target='_blank' className='p-2 bg-socialMedia-twitter rounded-full text-richwhite-100'>
                    <FaTwitter />
                </a>
        </div>

        {/* Search */}
        <form onSubmit={submitHandler}
        className='flex items-center'
        >
            <input 
                type='text'
                placeholder='Search anime ...'
                name='search'
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                    if(event.key === "Enter"){
                        submitHandler(event)
                    }
                }}
                className='outline-none h-10 px-3 w-34 bg-richwhite-100'
            />
            <div className='p-3 bg-richwhite-100'>
                <FaSearch/>
            </div>
            <div className=' bg-richwhite-100 h-10 flex items-center justify-center pr-3'>
                <div className=' bg-richblack-30 text-richwhite-100 text-sm py-1 px-2 rounded-sm'>
                    Filter
                </div>
            </div>
        </form>

        {/* Login */}
        {
            !user && <div>
                        Login
                    </div>
        }

        {/* Profile */}
        {
            user && <div className=' text-richwhite-100 p-3 bg-richwhite-10 rounded-full border-b-richblack-40'>
                        <BsFillPersonFill />
                    </div>
        }

    </nav>
  )
}

export default Navbar