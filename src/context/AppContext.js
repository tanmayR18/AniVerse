import { useState } from "react";
import { createContext } from "react";


export const AppContext = createContext();

export default function AppContextProvider({children}){
    const [loading, setLoading] = useState(false)

    //get Anime data fetching
    async function fetchGeneralAnimeApi(queryObject){
        const baseUrl = "https://api.jikan.moe/v4/anime"; 
        const queryParams = new URLSearchParams(queryObject);
        const url = `${baseUrl}?${queryParams}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching data for query: ${queryObject}`, error);
            return null;
        }
    }

    const value = {
        loading,
        setLoading,
        fetchGeneralAnimeApi
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}