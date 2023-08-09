import React from 'react'
import { formatDateToDDMMYY } from '../../service/inFormalDate'
import {AiFillHeart} from "react-icons/ai"
import { NavLink } from 'react-router-dom'

const TopCommentCard = ({review}) => {
    console.log(review)
    const date = formatDateToDDMMYY(review.createdAt)
    const shortendReview = review.review.length > 100 ? review.review.slice(0,100) + "..." : review.review

    const animeTitle = review.populatedAnime.length === 0 ? "Anime Not available :)" : review.populatedAnime[0].title
  return (
    <div className='bg-richblack-40 w-full rounded-xl p-3 flex flex-col gap-3'>
        {/* For Profile picture, Name, and Like counts */}
        <div className='flex justify-between'>
            <div className='flex gap-2 items-center  text-richwhite-50'>
                <div className='w-[2rem] h-[2rem] rounded-[50%] overflow-hidden'>
                    <img
                    className='w-full h-full object-cover' 
                    src={review.populatedUser[0].image} alt='profile' />
                </div>

                <div>
                    {review.populatedUser[0].firstName}
                    {" "}
                    {review.populatedUser[0].lastName}
                </div>
            </div>
            
            <div className='flex items-center gap-1'>
                <AiFillHeart/>
                {review.likeCount}
            </div>
        </div>
        
        <div className='flex items-center gap-1'>
            <p>Anime:</p>
            {
                animeTitle === "Anime Not available :)" ? 
                <p className='font-bold'>{animeTitle}</p> : 
                <NavLink to={`/${animeTitle}`}>
                    <p className='font-bold'>{animeTitle}</p>
                </NavLink>
            }
        </div>

        <div className='flex items-center gap-1'>
            <p>Rating:</p>
            <p className='font-bold' >{review.rating}</p>
        </div>

        <div className='flex items-center gap-1'>
            <p>Review:</p>
            <p className='font-bold'>
                {shortendReview}
            </p>
        </div>

        <div className='flex items-center gap-1 text-richwhite-50'>
            <p>{date}</p>
        </div>
    </div>
  )
}

export default TopCommentCard