import React from 'react'
import HomeSearch from '../components/home/HomeSearch'
import ViewAndShare from "../components/home/ViewAndShare"
import HomeShare from "../components/home/HomeShare"
import HomeAbout from '../components/home/HomeAbout'
import HomeTopComments from '../components/home/HomeTopComments'

const Home = () => {
  return (
    <div className=''>

    <div className='mb-14'>
        {/* Search Section */}
        <HomeSearch/>

        <ViewAndShare/>
    </div>

    <HomeShare/>

    <div className='flex w-10/12 max-w-[1200px] mx-auto gap-16 '>
        <HomeAbout/>
        <HomeTopComments/>
    </div>
    
    </div>
  )
}

export default Home