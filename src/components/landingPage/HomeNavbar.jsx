import React from 'react'
import { navbarData } from '../../data/Home/navbarData'
import { NavLink } from 'react-router-dom'

const HomeNavbar = () => {
  return (
    <div>
        <ul className=' text-richwhite-100 text-[15px] font-semibold flex gap-12'>
            {
                navbarData.map( (link, index) => (
                    <li key={index} className=' hover:text-richyellow-50 transition-all duration-200 '>
                        <NavLink to={link.path}>
                            {link.title}
                        </NavLink>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default HomeNavbar