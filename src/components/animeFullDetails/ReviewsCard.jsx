import React, {  useState } from 'react'
import { toMMDDYYY } from '../../service/inFormalDate'
import {AiFillLike} from "react-icons/ai"
import { apiConnector } from '../../service/apiconnector'
import { ratingAndReview } from '../../service/apis'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
//import unknowProfile from "../../assets/unknown-profile.png"


const ReviewsCard = ({review}) => {

    console.log("Inside the review card",review)

    const userData = useSelector( state => state.auth)
    // const [liked, setLiked] = useState(() => userData ? (review.likes.filter( (like) => like === userData.user._id).length === 0): false)
    // const [liked, setLiked] = useState(false)
    const [liked, setLiked] = useState(() => userData ? (
                                                            review.likes.filter( (like) => like === userData.user._id).length === 0 ?
                                                            false:
                                                            true
                                                        )
                                                        
                                                        : false)
    
    // let likeCount = review.likes.length
    const [likeCount, setLikeCount] = useState(review.likes.length)

    console.log(review)
    console.log(review.likes)                                                    
    async function likeHandler(){

        const urlBody = {
            reviewId: review._id,
            token: userData.token
        }
        try{
            //const response = await apiConnector("PUT", ratingAndReview.ADD_OR_REMOVE_LIKE, urlBody)
            // console.log("Liked response", response)
            liked ? setLikeCount((prevState) => prevState - 1) : setLikeCount((prevState) => prevState + 1)
            setLiked( (prevState) => !prevState)
        } catch(error){
            console.log(error)
        }
    }

  return (
    !review.userName && 
    <div className='flex gap-4 text-sm text-richwhite-100 items-start'>
        {/* IMages */}
        <div className=' w-8 rounded-full overflow-hidden'>
            <img className=' object-cover' src={review.userId.image ? review.userId.image : unknowProfile} />
        </div>

        {/* Review */}
        <div className=' flex flex-col gap-1'>
            {/* USername and date of creation */}
            <div className='flex gap-4 '>
                <div className=' font-bold text-[16px]'>{review.userId.userName}</div>
                <div className=' text-richwhite-5'>{toMMDDYYY(review.createdAt)}</div>
            </div>

            {/* User Review */}
            <div className=' opacity-90'>
                {
                    review.review
                }
            </div>

            {/* Likes */}
            <div className='flex items-center gap-1'>
                <AiFillLike
                className={` ${
                    liked ?
                    " text-richyellow-50":
                    " text-richwhite-100"
                } cursor-pointer`}
                onClick={() => userData ? likeHandler() : toast.error("Please Login or SignUp")} />
                {/* {
                    review.likes.length
                } */}
                {
                   likeCount
                }
            </div>

        </div>
    </div>
  )
}

export default ReviewsCard