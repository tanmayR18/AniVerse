import React, { useContext, useEffect, useState } from 'react'
import { genres } from '../../data/filter/filter'
import { NavLink, useNavigate } from 'react-router-dom'

const Genre = ({}) => {
  return (
    <div className='  flex flex-col gap-8'>
        <h3 className='text-[1.5rem] font-semibold text-richyellow-50'>Genres</h3>
        <div className='grid grid-cols-3 gap-y-8 gap-x-2 p-4 bg-richwhite-10'>
        
        {
            genres.map((genre,index) => (
                <NavLink key={index} to={`/genre/${genre.mal_id}`}>
                    <div
                    className='text-richwhite-50 text-center p-2 rounded-md hover:bg-richwhite-20 font-semibold cursor-pointer text-sm'
                     >
                        {
                            genre.name.length > 7 ? genre.name.slice(0,6) + "..." : genre.name
                        }
                    </div>
                </NavLink>
            ))
        }
        </div>
    </div>
  )
}

export default Genre