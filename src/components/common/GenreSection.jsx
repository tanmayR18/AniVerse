import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'

const Genre = () => {
    const {fetchGenresAndDemographics} = useContext(AppContext)
    const [genres, setGenres] = useState([])


    useEffect(() => {
        fetchGenresAndDemographics()
        .then( result => setGenres( result ))
    },[])
  return (
    <div>
        <h3 className='text-[1.5rem] font-semibold text-richyellow-50'>Genres</h3>
        {/* {
            console.log(genres)
        } */}
    </div>
  )
}

export default Genre