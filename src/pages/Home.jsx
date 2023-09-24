import React from 'react'
import Navbar from '../components/common/Navbar'
import underConstruction from "../assets/underConstruction.gif"

const Home = () => {
  return (
    <div className=' flex flex-col items-center gap-6 mt-20'>
        <Navbar bgColor={"bg-richblack-80 backdrop-blur "}  />
        <h1 className=' text-richwhite-100 font-bold text-lg align-middle'>This section is under Development :)</h1>
        <img className='aspect-auto' src={underConstruction}/>
    </div>
  )
}

export default Home