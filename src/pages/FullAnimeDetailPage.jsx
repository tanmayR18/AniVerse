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
    const [recommendedAnime, setRecommendedAnime] = useState([])
    // console.log(animeID)


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

    const fetchAnimeRecommendations = async () => {
        try{
            const url = `https://api.jikan.moe/v4/anime/${animeID}/recommendations`
            const response = await axios.get(url)
            console.log("Here is the o/p for recommended anime", response.data.data)
            setRecommendedAnime(response.data.data)
        } catch(error){
            console.log("Error while fetching the recommendaed anime")
            console.error(error)
        }
    }
    
    useEffect(() => {
        fetchAnimeById()
        setTimeout(() => {
            fetchAnimeRecommendations()
        },0);

    },[location.pathname])

  return (
    <div className=''>
        
        {/* <Navbar  bgColor={"bg-richblack-20 backdrop-blur "} /> */}

        <div className='relative z-20 min-h-screen h-auto'>
        {
           animeData &&
            <img 
            className=' absolute  w-full h-full z-10 object-cover'
            src={animeData.images.jpg.image_url} alt='imagePoster' />
        }
        {
            review ? <FullReview setReview = {setReview} recommendedAnime = {recommendedAnime}  animeData = {animeData}/> :
            <FullAnimeDetails setReview = {setReview} recommendedAnime = {recommendedAnime} animeData = {animeData} />
        }
        s
        
    </div>
    </div>
  )
}

export default FullAnimeDetailPage