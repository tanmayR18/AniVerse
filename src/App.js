import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"

const App = () => {

    

  return (
    <div className=' overflow-x-hidden bg-richblack-50 h-full min-h-screen font-poppins'>
        
        <Routes>
            <Route path = "/" element = {<LandingPage/>} />
        </Routes>

    </div>
  )
}

export default App