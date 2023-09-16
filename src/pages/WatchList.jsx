import React from 'react'
import NavbarCommonComp from '../components/common/NavbarCommonComp'
import Navbar from '../components/common/Navbar'
import { useSelector } from 'react-redux'

const WatchList = () => {
    const watchList = useSelector( state => state.watchList)
    console.log("Inside the watch list section", watchList.length, watchList)
  return (
    <div>
        <Navbar bgColor={"bg-richblack-20 backdrop-blur "}  />
        <NavbarCommonComp/>
    </div>
  )
}

export default WatchList