import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { useContext } from 'react'
import { genres } from '../../data/filter/filter'


const Genres = ({formData, changeHandler}) => {

    // const [genre, setGenre] = useState(genres)
    // const [genres, setGenre] = useState([])
    // const {fetchGenresAndDemographics} = useContext(AppContext)
    // const {genres} = useContext(AppContext)
    // setGenre(result.data.data)
    useEffect( () => {
        // fetchGenresAndDemographics()
        //     .then( result => setGenre( result ))
        
        // fetchGenresAndDemographics("demographics")
        //     .then( result => setGenre( prevState => {
        //                 return {
        //                     ...prevState, result
        //                 }
        //             }            
        //         ))
    },[])


  return (
    <div className='flex flex-col gap-6'>
        <h3 className='text-[1.1rem] font-bold text-richwhite-100 opacity-90 tracking-wide'>Genre</h3>

        <div className='flex gap-2 flex-wrap'>
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
            {console.log("Genres in the filterGenres",genres)}
        </div>
    </div>
  )
}

export default Genres