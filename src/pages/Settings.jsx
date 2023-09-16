import React from 'react'
import NavbarCommonComp from '../components/common/NavbarCommonComp'
import Navbar from '../components/common/Navbar'
import underConstruction from "../assets/underConstruction.gif"

const Settings = () => {
  return (
    <div  className=' flex flex-col items-center gap-6'>
        <Navbar bgColor={"bg-richblack-20 backdrop-blur "}  />
        <NavbarCommonComp/>
        <h1 className=' text-richwhite-100 font-bold text-lg align-middle'>This section is under construction :)</h1>
        <img className=' aspect-auto' src={underConstruction}/>
    </div>
  )
}

export default Settings