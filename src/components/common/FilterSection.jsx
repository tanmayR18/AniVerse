import React from 'react'
import Filters from '../AnimeDetails/Filters'
import Genres from '../AnimeDetails/FiltersGenres'
import { useState } from 'react'


const Filter = () => {

    const [formData, setFormData] = useState({
        type: "",
        status: "",
        rating: "",
        sfw: true,
        order_by: "",
        sort: "asc",
        start_date: "",
        end_date: "",
        genres: []

    })
    function changeHandler(event){
        const {name, value, type, checked} = event.target
        setFormData( prevState => {
            const mal_id = name; // Use name directly as mal_id
            if(type === "checkbox"){
                return {
                    ...prevState,
                    genres: checked ? 
                        [...prevState.genres, mal_id] :
                        prevState.genres.filter(genre => genre !== mal_id),
                }

            } else{
                return {
                    ...prevState,
                    [name]: value
                }
            }
        })
    }

    function submitHandler(event){
        event.preventDefault()
        console.log(formData)
    }

  return (
    <div className=' bg-richwhite-10 p-7 rounded-2xl'>
        <form onSubmit={submitHandler}>
            <Filters formData={formData} changeHandler={changeHandler}/>

            <Genres formData={formData} changeHandler={changeHandler} />

            {/* Submit Button */}
            <button>
                Filter
            </button>
        </form>
    </div>
  )
}

export default Filter