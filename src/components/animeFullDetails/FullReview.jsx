import React from 'react'

const FullReview = ({setReview}) => {
  return (
    <div className=' absolute w-full h-full backdrop-blur-xl bg-[rgba(40,38,38,0.7)] z-30'>
        <div className=' py-16 px-4'>
            <button
            onClick={() => setReview(false)}
            className='flex text-richblack-90 gap-2 items-center py-2 px-4 bg-richyellow-40 rounded-3xl'
            >
                go to details page
            </button>
        </div>
        
    </div>
  )
}

export default FullReview