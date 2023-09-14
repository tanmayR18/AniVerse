import React from 'react'

const ShareWithFriends = ({bgColor,paddingX0}) => {
  return (
    <div className={`flex gap-4 items-center ${bgColor} p-5  ${paddingX0 && "px-0"}`}>
            <div className='w-14 h-14 rounded-full overflow-hidden'>
                <img
                className=' object-cover'
                src={"https://aniwatch.to/images/share-icon.gif"}
                alt='share-gif'
                />
                {/* <img src={testImage} alt='test-image' /> */}
            </div>
            <div className='flex flex-col'>
                <p className=' text-richyellow-40 font-bold '>Share AniWatch</p>
                <p className=' text-richwhite-100 text-sm'>to your friends</p>
            </div>
        </div>
  )
}

export default ShareWithFriends