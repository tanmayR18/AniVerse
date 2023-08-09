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
    <div className='text-richwhite-100'>
        <h3>Top Comments</h3>
        
        <div>
            {
                topReviews.map( (review, index) => (
                    <div key={index}>
                        <TopCommentCard review={review} />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default HomeTopComments