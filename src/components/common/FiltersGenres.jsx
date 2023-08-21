import React from 'react'
import { genres } from '../../data/filter/filter'


const Genres = ({formData, changeHandler}) => {

  return (
    <div className='flex flex-col gap-6'>
        <h3 className='text-[1.1rem] font-bold text-richwhite-100 opacity-90 tracking-wide'>Genre</h3>

        <div className='flex gap-2 flex-wrap'>
        {/* Fetch and display each genres and demonography */}
            {
                genres.map( genre => (
                    <label 
                    className={`${formData.genres.includes(genre.mal_id.toString()) ? "text-richyellow-50 bg-richyellow-10": "text-richwhite-50"}  text-sm border border-richwhite-20 cursor-pointer hover:text-richyellow-40 rounded-md p-1`}
                    key={genre.mal_id}>
                    {genre.name}
                        <input
                            className=' hidden '
                            type = 'checkbox'
                            onChange = {changeHandler}
                            name = {genre.mal_id.toString()} // Use mal_id as the name
                            checked = {formData.genres.includes(genre.mal_id.toString())}
                        />
                    </label>
                ))

                
            }
        </div>
    </div>
  )
}

export default Genres