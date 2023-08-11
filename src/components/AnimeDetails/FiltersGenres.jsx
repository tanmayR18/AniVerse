import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { useContext } from 'react'


const Genres = ({formData, changeHandler}) => {

    const [genres, setGenre] = useState([])
    const {fetchGenresAndDemographics} = useContext(AppContext)
    // setGenre(result.data.data)
    useEffect( () => {
        fetchGenresAndDemographics()
            .then( result => setGenre( result ))
        
        // fetchGenresAndDemographics("demographics")
        //     .then( result => setGenre( prevState => {
        //                 return {
        //                     ...prevState, result
        //                 }
        //             }            
        //         ))
    },[])


  return (
    <div>
        <h3 className='text-[1.1rem] font-bold text-richwhite-100 opacity-90 tracking-wide'>Genre</h3>

        <div className='flex gap-1 flex-wrap'>
            {
                genres.map( genre => (
                    <label 
                    className={`${formData.genres.includes(genre.mal_id.toString()) ? "bg-richyellow-50": "bg-richwhite-50"}`}
                    key={genre.mal_id}>
                    {genre.name}
                        <input
                            className=' hidden'
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