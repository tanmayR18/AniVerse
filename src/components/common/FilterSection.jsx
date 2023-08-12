import React from 'react'
import Filters from './FiltersCriterias'
import Genres from './FiltersGenres'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'


const Filter = () => {

    const {fetchGeneralAnimeApi} = useContext(AppContext)

    //TODO: Add min_score and max_score

    const initalState = {
        type: "",
        status: "",
        rating: "",
        score: "",
        // sfw: true,
        sfw: "",
        order_by: "",
        // sort: "asc",
        sort: "",
        start_date: "",
        end_date: "",
        genres: []

    }

    const [formData, setFormData] = useState(initalState)

    const [start, setStart] = useState({ 
        startDate: "" ,
        endDate: "" 
        });
    
    const [end, setEnd] = useState({ 
        startDate: "" ,
        endDate: "" 
    }); 
        
    function removeKeyValuePair(obj){
        for(const key in obj ){
            if(key === "genres"){
                obj[key] = obj[key].join(",")
            }
            if(obj[key] === "" || obj[key] === null || obj[key] === "All" || obj[key] === undefined || obj[key].length === 0){
                delete obj[key]
            }
        }
        return obj
    }

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
        // const finalData = {...start_Date,...formData}
        // console.log(finalData)
        const finalData = Object.assign({},formData)
        finalData.start_date = start.startDate
        finalData.end_date = end.startDate
        console.log(removeKeyValuePair(finalData))
        fetchGeneralAnimeApi(finalData)
            .then( result => console.log(result.data.data))
            .catch( error => console.log(error))
        setFormData(initalState)
    }

  return (
    <div className=' bg-richwhite-10 p-7 rounded-2xl'>
        <form onSubmit={submitHandler}>
            <Filters formData={formData} changeHandler={changeHandler} start = {start} 
            setStart = {setStart} end = {end} setEnd = {setEnd}  />

            <Genres formData={formData} changeHandler={changeHandler} />

            {/* Submit Button */}
            <button className='py-2 px-4 bg-richyellow-50 font-semibold mt-3 rounded-lg' >
                Filter
            </button>
        </form>
    </div>
  )
}

export default Filter