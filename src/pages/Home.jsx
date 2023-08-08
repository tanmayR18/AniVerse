import React from 'react'
import HomeSearch from '../components/home/HomeSearch'
import ViewAndShare from "../components/home/ViewAndShare"

const Home = () => {
  return (
    <div className=''>

    <div className=' bg-richwhite-10'>
        {/* Search Section */}
        <HomeSearch/>
    </div>

    <ViewAndShare />
    </div>
  )
}

export default Home