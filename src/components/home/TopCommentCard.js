import React from 'react'
import { formatDateToDDMMYY } from '../../service/inFormalDate'

const TopCommentCard = ({review}) => {
    console.log(review)
    const date = formatDateToDDMMYY(review.createdAt)
    const shortendReview = review.review.length > 100 ? review.review.slice(0,100) + "..." : review.review
  return (
    <div className='bg-richblack-40 w-full'>
        {/* For Profile picture, Name, and Like counts */}
        <div className='flex'>
            <img
            className='h-8 rounded-full' 
            src={review.populatedUser[0].image} alt='profile' />

            <div>
                {review.populatedUser[0].firstName}
                {" "}
                {review.populatedUser[0].lastName}
            </div>
            
            <div>
                {review.likeCount}
            </div>
        </div>

        <div className='flex'>
            <p>Rating:</p>
            <p>{review.rating}</p>
        </div>

        <div className='flex'>
            <p>Review:</p>
            <p>
                {shortendReview}
            </p>
        </div>

        <div className='flex'>
            <p>Created At:</p>
            <p>{date}</p>
        </div>
    </div>
  )
}

export default TopCommentCard