import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AnimeDetails from "./pages/AnimeDetails"
import FilterPage from "./pages/FilterPage"
import GenrePage from "./pages/GenrePage"
import CategoryPage from "./pages/CategoryPage"
import MostPopular from "./pages/MostPopular"
import TopAiring from "./pages/TopAiring"


const App = () => {

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
        </Routes>

    </div>
  )
}

export default App