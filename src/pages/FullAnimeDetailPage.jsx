import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import FullReview from '../components/animeFullDetails/FullReview'
import FullAnimeDetails from '../components/animeFullDetails/FullAnimeDetails'
import Navbar from '../components/common/Navbar'

const FullAnimeDetailPage = () => {
    const location = useLocation()
    const animeID = parseInt(location.pathname.split("/").at(-2))
    const [animeData, setAnimeData] = useState(null)
    const [review, setReview] = useState(false)
    console.log(animeID)


    // Anime Data fetching on the basis of ID
    const fetchAnimeById = async () => {
        try{    
            const url = `https://api.jikan.moe/v4/anime/${animeID}/full`
            const response = await axios.get(url)
            setAnimeData(response.data.data)
        } catch(error){
            console.log("Error while fetching anime By ID",error)
        }
    }
    
    useEffect(() => {
        fetchAnimeById()
    },[])

  return (
    <div className=' overflow-y-auto'>
        <Navbar bgColor={"bg-richblack-20 backdrop-blur "} />
        <div className='relative z-20 min-h-screen h-auto'>
        
        {
           animeData &&
            <img 
            className=' absolute  w-full h-full z-10 object-cover'
            src={animeData.images.jpg.image_url} alt='imagePoster' />
        }
        {
            review ? <FullReview setReview = {setReview}  animeData = {animeData}/> :
            <FullAnimeDetails setReview = {setReview} animeData = {animeData} />
        }
        
        
    </div>
    </div>
  )
}

export default FullAnimeDetailPage