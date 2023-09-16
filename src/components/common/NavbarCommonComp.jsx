import React from 'react'
import { useSelector } from 'react-redux'
import { navgationTabs } from '../../data/navbar/navigation'
import { useLocation, useNavigate } from 'react-router-dom'


const NavbarCommonComp = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const userData = useSelector( state => state.auth)
  return (
    <div className=' w-full h-60 relative'>
        {/* Background image */}
        <img className='absolute top-0 left-0 h-full w-full object-cover' src={userData.user.image}  />

        {/* Name and navigation */}
        <div className=' flex flex-col gap-4 justify-end items-center absolute top-0 left-0 h-full w-full backdrop-blur-lg bg-richblack-20'>

            <div className=' flex items-center font-bold  text-richwhite-100 text-[2rem] gap-2'>
                <h2>Hii, </h2>
                <h2>{userData.user.userName}</h2>
            </div>

            <div className=' flex gap-14 text-richwhite-100'>
                {
                    navgationTabs.map( (tab, index) => (
                        <div 
                        className={`flex items-center gap-2 p-3 text-md cursor-pointer ${location.pathname === "/"+tab.value ?  "border-b-2 text-richyellow-40 border-y-richyellow-40": "" }`}
                        onClick={() => navigate("/"+tab.value)}
                        key={index}>
                            {tab.icon}
                            <div>{tab.name}</div>
                        </div>
                    ))
                }
            </div>
        </div>


    </div>
  )
}

export default NavbarCommonComp