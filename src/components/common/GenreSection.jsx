import React, { useContext, useEffect, useState } from 'react'
import { genres } from '../../data/filter/filter'
import { NavLink, useNavigate } from 'react-router-dom'

const Genre = ({setGenres}) => {
    // const {fetchGenresAndDemographics} = useContext(AppContext)
    // const navigate = useNavigate()
    // const [genres, setGenres] = useState([])
    // const {genres, fetchGeneralAnimeApi} = useContext(AppContext)
    // useEffect(() => {
    //     fetchGenresAndDemographics()
    //     .then( result => setGenres( result ))
    // },[])

    // this is differen

    // function clickHandler(genreName){
    //     setGenres(genreName.toString())
    // }
  return (
    <div className='  flex flex-col gap-8'>
        <h3 className='text-[1.5rem] font-semibold text-richyellow-50'>Genres</h3>
        <div className='grid grid-cols-3 gap-y-8 p-4 bg-richwhite-10'>
        
        {
            genres.map((genre,index) => (
                <NavLink key={index} to={`/genre/${genre.mal_id}`}>
                    <div
                    className='text-richwhite-50 font-semibold cursor-pointer text-sm'
                    //  onClick={() => clickHandler(genre.mal_id)}
                     >
                        {
                            genre.name.length > 7 ? genre.name.slice(0,7) + "..." : genre.name
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