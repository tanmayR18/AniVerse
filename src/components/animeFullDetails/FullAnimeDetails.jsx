import React from 'react'

const FullAnimeDetails = ({animeData}) => {
  return (
    <div className=' absolute w-full h-full backdrop-blur-xl bg-[rgba(40,38,38,0.7)] z-30'>
        {
            animeData && animeData.title
        }
    </div>
  )
}

export default FullAnimeDetails