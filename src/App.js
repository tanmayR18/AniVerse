import { Route, Routes, useActionData } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AnimeDetails from "./pages/AnimeSearchResult"
import FilterPage from "./pages/FilterPage"
import GenrePage from "./pages/GenrePage"
import CategoryPage from "./pages/CategoryPage"
import MostPopular from "./pages/MostPopular"
import TopAiring from "./pages/TopAiring"
import FullAnimeDetailPage from "./pages/FullAnimeDetailPage"
import { useDispatch, useSelector } from "react-redux"
import ProfilePage from "./pages/ProfilePage"
import WatchList from "./pages/WatchList"
import Settings from "./pages/Settings"
import Notification from "./pages/Notification"
import Home from "./pages/Home"
import SideBar from "./components/common/SideBar"
import Modal from "./components/common/Modal"
import { addModal } from "./slices/modalSlice"


const App = () => {
    
    const dispatch = useDispatch()
    const userTest = useSelector( state => state.auth)
    const showModal = useSelector(state => state.modal)
    console.log("userTest inside app", userTest)

  return (
    <div className=' overflow-x-hidden bg-richblack-50 h-full min-h-screen font-poppins'>
    
        {    
            showModal && <Modal>
                            <SideBar/>
                        </Modal>
        }

        <Routes>
            <Route path = "/" element = {<LandingPage/>} />
            <Route path="/home" element = {<Home/>} />
            <Route path = "/anime-details/:anime" element = {<AnimeDetails/>} />
            <Route path = "/filter" element = {<FilterPage/>} />
            <Route path="/genre/:genre" element = {<GenrePage/>} />
            <Route path="/category/:type" element = {<CategoryPage/>} />
            <Route path="/most-popular" element = {<MostPopular/>} />
            <Route path="/top-airing" element = {<TopAiring/>} />
            <Route path="/full-anime-detials/:id/:animeName" element = {<FullAnimeDetailPage/>} /> 
            <Route path="/user/profile" element = {<ProfilePage />} />
            <Route path="/user/watch-list" element = {<WatchList />} />
            <Route path="/user/notification" element = {<Notification/>} />
            <Route path="/user/setting" element = {<Settings />} />
        </Routes>

    </div>
  )
}

export default App