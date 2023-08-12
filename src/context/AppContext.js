import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'

export const AppContext = createContext();

export default function AppContextProvider({children}){
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
            return null;
        }
    }

    const fetchGenresAndDemographics = async (category) => {
        try{
            // console.log("Here is the api link",baseGenreUrl+category)
            const genre = await axios.get(baseGenreUrl+"genres")
            const explicit_genres = await axios.get(baseGenreUrl+"explicit_genres")
            const demographics = await axios.get(baseGenreUrl+"demographics")

            const empytArry = []

            const concatedGenre = [...empytArry, ...genre.data.data, ...explicit_genres.data.data, ...demographics.data.data]
            console.log(concatedGenre)
            // console.log(explicit_genres)
            // console.log(demographics)

            return concatedGenre
        } catch( error ){
            console.log("Error while fetching the Genres")
            console.log(error)
            return []
        }
    }

    const value = {
        loading,
        setLoading,
        fetchGeneralAnimeApi,
        fetchGenresAndDemographics,
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}