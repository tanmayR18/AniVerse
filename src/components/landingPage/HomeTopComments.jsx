import React from 'react'
import { ratingAndReview } from '../../service/apis'
import { useState } from 'react'
import { apiConnector } from '../../service/apiconnector'
import { useEffect } from 'react'
import TopCommentCard from './TopCommentCard'


const HomeTopComments = () => {

    const [topReviews, setTopReview] = useState([])
    async function fetchTopReviewsw(){
        try{
            const result = await apiConnector("GET", ratingAndReview.GET_TOP_10_REVIEWS)
            setTopReview(result.data.data)
            
        } catch(error){
            console.log(error)
        }
    }

    useEffect( () => {
        fetchTopReviewsw()
    },[])

  return (
    <div className='text-richwhite-100 w-[35%]'>
        <h3
        className='text-[1.8rem] font-semibold mb-5'
        >Trending Reviews</h3>
        
        <div className='flex flex-col gap-3'>
            {
                topReviews.map( (review, index) => (
                    <div
                    key={index}>
                        <TopCommentCard review={review} />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default HomeTopComments