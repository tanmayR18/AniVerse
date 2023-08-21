import React from 'react'
import logo  from '../../assets/full_logo.png'
import {FaDiscord, FaRedditAlien, FaTelegramPlane, FaTwitter} from 'react-icons/fa'
import { copyRights, headings, otherInfo, sortBy } from '../../data/footer/footerData'
import { NavLink } from 'react-router-dom'


const Footer = () => {
  return (
    <div className='p-4'>
        {/* Upper div */}
        <div className='flex items-center h-20 mb-4 '>
            {/* Logo */}
            <div className='w-36 h-auto pr-5 mr-10'>
                <img src={logo} className=' object-cover' alt='Website logo' />
            </div>
            {/* Social Media Icons */}
            <div className='flex gap-3 items-center  pl-10 border-l border-richwhite-10 h-full '>
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
        </div>

        {/* Lower div */}
        <div className='flex flex-col gap-6'>
        <div className='flex pt-6 border-t border-richwhite-10 items-center'>
            <h3 className='text-richwhite-100 font-semibold text-[1.4rem] pr-5 border-r border-richwhite-10'>
                {
                    headings[0].h3
                }
            </h3>
            <p className=' text-richwhite-100 opacity-90 text-[16px] pl-5'>
                {
                    headings[1].p
                }
            </p>
        </div>

        {/* Filter A - Z for searching anime */}
        <div className='flex gap-3 flex-wrap'>
            {
                sortBy.map( (filter, index) => (
                    <NavLink to={`/filter/${filter.name}`} key={index} >
                        <div className=' bg-richblack-40 px-[15px] py-2 font-bold
                         text-richwhite-100 rounded-md  hover:bg-richyellow-50 hover:text-richblack-90'>
                            {filter.name}
                        </div>
                    </NavLink>
                ) )
            }
        </div>

        {/* Terms... */}
        <div className='flex gap-10'>
            {
                otherInfo.map( (item, index) => (
                    <NavLink to={`/${item.value}`} key={index}>
                        <div className=' text-richwhite-100 opacity-90 text-[14px]  hover:text-richyellow-50'>
                            {
                                item.name
                            }
                        </div>
                    </NavLink>
                ) )
            }
        </div>

        {/* copyRights */}
        <div>
            <p className=' text-richwhite-50 opacity-40'>
                {
                    copyRights.line1
                }
            </p>
            <p className=' text-richwhite-50 opacity-40'>
                {
                    copyRights.line2
                }
            </p>
        </div>

        </div>
    </div>
  )
}

export default Footer