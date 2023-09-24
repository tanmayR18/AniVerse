import React, { useState } from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import logo from "../../assets/full_logo.png"
import {FaSearch, FaArrowRight} from 'react-icons/fa'
import {BsFillPersonFill} from "react-icons/bs"
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {IoMdNotifications} from "react-icons/io"
import { profileData } from '../../data/Profile/profile'
import { socialMedia } from '../../data/social media/socialMediaInfo'
import LoginOverLayer from "../LoginAndSignUp/LoginOverlayer"
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../slices/authSlice'
import { useEffect } from 'react'



const Navbar = ({bgColor}) => {

    const userData = useSelector( state => state.auth)
    const [navbar, setNavbar] = useState(false)
    const [search, setSearch] = useState("")
    const [loginVisible, setLoginVisible] = useState()
    const navigate = useNavigate()
    const dispatch  = useDispatch()
    const location = useLocation()


    function submitHandler(event){
        event.preventDefault()
        navigate(`/anime-details/${search.split(" ").join("-")}`)
        console.log(`/anime-details/${search.split(" ").join("-")}`)
    }

    // For changing the navbar background when scrolled
    const changeBackground = () => {
        setNavbar(window.scrollY)
    }
    window.addEventListener("scroll",changeBackground)

    useEffect(() => {
        changeBackground()
    },[location.pathname])


  return (
    <nav className={`h-auto -sm z-40 w-full fixed top-0 right-0 text-richblack-100 flex items-center justify-between px-4 py-1
        ${
            bgColor ? bgColor : (navbar === 0 ? "" : "backdrop-blur bg-richblack-20")
        }
    `}>
        
        <LoginOverLayer loginVisible = {loginVisible} setLoginVisible = {setLoginVisible}/>

        {/* Hamberger menu and logo */}
        <div className='flex items-center gap-6 text-richwhite-100'>
            <GiHamburgerMenu size={28} className=' cursor-pointer'/>
            <NavLink to={"/"}>
                <img 
                className='w-28 h-14'
                src={logo} alt='website logo' />
            </NavLink>
        </div>

        {/* Social Media icons */}
        <div className='flex gap-3 items-center h-full '>
                {
                    socialMedia.map( (item,index) => (
                        <a 
                        key={index}
                        href={item.href}
                        alt = {item.alt}
                        target='_blank'
                        className={`p-[10px] ${item.bgColor} rounded-full text-richwhite-100`}
                        >
                            {item.icon}
                        </a>
                    ))
                }
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
                className='outline-none h-10 px-3 w-34  border-none focus:border-none bg-richwhite-100'
            />

            {/* Search icon */}
            <div 
            onClick={() => navigate(`/anime-details/${search.split(" ").join("-")}`)}
            className='p-3 bg-richwhite-100 cursor-pointer'>
                <FaSearch/>
            </div>

            {/* Filter button */}
            <div className=' bg-richwhite-100 h-10 flex items-center justify-center pr-2 cursor-pointer'>
                <div 
                onClick={ () => navigate("/filter")}
                className=' bg-richblack-30 hover:bg-richblack-20 hover:opacity-70 text-richwhite-100 text-sm py-1 px-2 rounded-sm'>
                    Filter
                </div>
            </div>
        </form>

        {/* Login */}
        {
            !userData && <div
                    onClick={() => setLoginVisible(true)}
                    className=' cursor-pointer bg-richyellow-40 text-richblack-90 px-5 py-[10px] rounded-[3px] text-sm font-bold'>
                        Login
                    </div>
        }

       
        {/* Profile and notification*/}
        {
            userData && (
                <div className='flex items-center gap-4'>
                {/* Notification */}
                    <NavLink to={"/user/notification"}>
                                <div className=' text-richwhite-100 p-3 text-xl cursor-pointer bg-richwhite-10 rounded-full border-b-richblack-40'>
                                    <IoMdNotifications/>
                                </div>
                            </NavLink>

                    <div className='relative text-richwhite-100  group p-[5px] text-xl bg-richwhite-10 rounded-full border-b-richblack-40 '>
                        <div className='w-9 flex items-center justify-center overflow-hidden rounded-full  h-9  top-0 left-0'>
                            {
                                userData ? 
                                <img className='' src={userData.user.image} /> :
                                <BsFillPersonFill />
                            }
                            
                        </div>
                        {/* Dropdown */}
                        <div className=' hidden group-hover:flex flex-col gap-3 absolute top-10  right-0 bg-richblack-20 border border-richwhite-10 rounded-xl p-4 w-72'>
                            {/* Name and Email */}
                            <p className=' text-base text-richyellow-40'>{userData.user.userName}</p>
                            <p className=' text-base text-richwhite-100'>{userData.user.email}</p>

                            {/* Profile Sections */}
                            <div className='flex flex-col gap-2 '>
                                {
                                    profileData.map( (item, index) => (
                                        <NavLink 
                                        className={"flex gap-2 hover:text-richyellow-40  bg-richwhite-10 hover:bg-richwhite-20 rounded-2xl text-[14px] font-semibold items-center py-[6px] px-3"}
                                        key={index} to={`/user/${item.value}`}>
                                            {item.icon}
                                            <p>{item.name}</p>
                                        </NavLink>
                                    ))
                                }
                            </div>
                            
                            {/* Logout */}
                            <div 
                            onClick={() => {
                                navigate("/")
                                dispatch(logOut())
                            }}
                            className='flex justify-end items-center text-[14px] cursor-pointer gap-2 my-2 hover:text-richyellow-40'>
                                <p>Logout</p>
                                <FaArrowRight/>
                            </div>
                        </div>
                    </div>
            </div>
            )
        }

    </nav>
  )
}

export default Navbar