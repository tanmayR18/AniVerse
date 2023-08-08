import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"

const App = () => {

    

  return (
    <div className=' overflow-x-hidden bg-richblack-50 h-full min-h-screen'>
        
        <Routes>
            <Route path = "/" element = {<Home/>} />
        </Routes>

    </div>
  )
}

export default App