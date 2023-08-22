import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AnimeDetails from "./pages/AnimeDetails"
import FilterPage from "./pages/FilterPage"
import GenrePage from "./pages/GenrePage"
import Movies from "./pages/Movies"


const App = () => {

  return (
    <div className=' overflow-x-hidden bg-richblack-50 h-full min-h-screen font-poppins'>
        
        <Routes>
            <Route path = "/" element = {<LandingPage/>} />
            <Route path = "/anime-details/:anime" element = {<AnimeDetails/>} />
            <Route path = "/filter" element = {<FilterPage/>} />
            <Route path="/genre/:genre" element = {<GenrePage/>} />
            <Route path="/movies" element = {<Movies/>} />
            
        </Routes>

    </div>
  )
}

export default App