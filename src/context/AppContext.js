import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { useEffect } from "react";

export const AppContext = createContext();

export default function AppContextProvider({children}){
    const [genres, setGenres] = useState([])
    const [loading, setLoading] = useState(false)
    const baseGenreUrl = "https://api.jikan.moe/v4/genres/anime?filter="
    const baseUrl = "https://api.jikan.moe/v4/anime"

    //get Anime data fetching
    async function fetchGeneralAnimeApi(queryObject){
        // const baseUrl = "https://api.jikan.moe/v4/anime"; 
        const queryParams = new URLSearchParams(queryObject);
        const url = `${baseUrl}?${queryParams}`;
        console.log(url)

        try {
            const response = await axios.get(url);
            return response;
        } catch (error) {
            console.error(`Error fetching data for query: ${queryObject}`, error);
            return [];
        }
    }

    const fetchGenresAndDemographics = async () => {
        try{
            // console.log("Here is the api link",baseGenreUrl+category)
            const genre = await axios.get(baseGenreUrl+"genres")
            const explicit_genres = await axios.get(baseGenreUrl+"explicit_genres")
            const demographics = await axios.get(baseGenreUrl+"demographics")

            const empytArry = []

            const concatedGenre = [...empytArry, ...genre.data.data, ...explicit_genres.data.data, ...demographics.data.data]
            console.log("AppContext genres",concatedGenre)
            // console.log(explicit_genres)
            // console.log(demographics)

             setGenres(concatedGenre)
        } catch( error ){
            console.log("Error while fetching the Genres")
            console.log(error)
            return []
        }
    }
    
    // useEffect(() => {
    //     fetchGenresAndDemographics()
    // },[])

    const value = {
        loading,
        genres,
        setLoading,
        fetchGeneralAnimeApi,
        fetchGenresAndDemographics,
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}