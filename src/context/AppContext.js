import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'

export const AppContext = createContext();

export default function AppContextProvider({children}){
    const [genres, setGenres] = useState([])
    const [loading, setLoading] = useState(false)
    // const baseGenreUrl = "https://api.jikan.moe/v4/genres/anime?filter="
    const baseUrl = "https://api.jikan.moe/v4/anime"

    //get Anime data fetching
    async function fetchGeneralAnimeApi(queryObject){
        const queryParams = new URLSearchParams(queryObject);
        const url = `${baseUrl}?${queryParams}`;
        console.log("Anime fetching url",url)

        try {
            const response = await axios.get(url);
            return response;
        } catch (error) {
            console.error(`Error fetching data for query: ${queryObject}`, error);
            return [];
        }
    }

    const value = {
        loading,
        genres,
        setLoading,
        fetchGeneralAnimeApi,
        // fetchGenresAndDemographics,
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}