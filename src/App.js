import { Route, Routes, useActionData } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AnimeDetails from "./pages/AnimeSearchResult"
import FilterPage from "./pages/FilterPage"
import GenrePage from "./pages/GenrePage"
import CategoryPage from "./pages/CategoryPage"
import MostPopular from "./pages/MostPopular"
import TopAiring from "./pages/TopAiring"
import FullAnimeDetailPage from "./pages/FullAnimeDetailPage"
import { useSelector } from "react-redux"


const App = () => {
    
    const userTest = useSelector( state => state.auth)
    console.log("userTest inside app", userTest)

  return (
    <div className=' overflow-x-hidden bg-richblack-50 h-full min-h-screen font-poppins'>
        
        <Routes>
            <Route path = "/" element = {<LandingPage/>} />
            <Route path = "/anime-details/:anime" element = {<AnimeDetails/>} />
            <Route path = "/filter" element = {<FilterPage/>} />
            <Route path="/genre/:genre" element = {<GenrePage/>} />
            <Route path="/category/:type" element = {<CategoryPage/>} />
            <Route path="/most-popular" element = {<MostPopular/>} />
            <Route path="/top-airing" element = {<TopAiring/>} />
            <Route path="/full-anime-detials/:id/:animeName" element = {<FullAnimeDetailPage/>} /> 
        </Routes>

    </div>
  )
}

export default App