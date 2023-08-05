import React, { useEffect, useState } from 'react'
import {apiConnector} from './service/apiconnector'
import {ratingAndReview} from './service/apis'

const App = () => {

    const [entries, setEntries] = useState([])

    const fetchRatingAndReview = async () => {
        try{

            const response = await apiConnector( "GET", ratingAndReview.GET_ALL_RATINGANDREVIEW ) 
            console.log(response.data.data)
            setEntries(response.data.data)
        } catch(error){
            console.log("Error has been occured while fetching the rating and revire",error)
        }
    }

    useEffect(() => {
        fetchRatingAndReview()
    },[])

  return (
    <div>

        {
            entries.map((entry) => (
                <div key={entry._id} >
                    <span>Title:</span><span>{entry.animeId.title}</span>
                </div>
            ) )
        }

    </div>
  )
}

export default App