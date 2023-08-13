import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AnimeDetails from "./pages/AnimeDetails"

const App = () => {

    

  return (
    <div className=' overflow-x-hidden bg-richblack-50 h-full min-h-screen font-poppins'>
        
        <Routes>
            <Route path = "/" element = {<LandingPage/>} />
            <Route path = "/anime-details/:anime" element = {<AnimeDetails/>} />
        </Routes>

    </div>
  )
}

export default App