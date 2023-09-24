import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeModal } from '../../slices/modalSlice'
import {ImCross} from "react-icons/im"
import { NavLink, useNavigate } from 'react-router-dom'
import { sideLink } from '../../data/sidebar/sidebar'

const SideBar = () => {
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  return (
    <div className=' fixed inset-0 z-[1000] !mt-0 overflow-auto  backdrop-blur-sm'>
        <div className=' absolute text-3xl text-richwhite-100 font-bold right-5 top-5 cursor-pointer' onClick={() => dispatch(removeModal())}>
            <ImCross />
        </div>

        <div className={` w-fit h-full animate-fadeRight  p-14 pl-4 bg-richwhite-5 bg-opacity-50`}>
            
            <ul className={` text-richwhite-100 flex flex-col gap-5  font-bold leading-loose right-0`}>
                <li className=' cursor-pointer hover:text-richyellow-40' >
                    <NavLink onClick={() => {
                            dispatch(removeModal())
                            navigate("/")
                        }} >Home</NavLink>
                </li>
                <li className=' cursor-pointer hover:text-richyellow-40'>
                    <NavLink to={"/category/movie"} onClick={() => dispatch(removeModal())} >Movie</NavLink>
                </li>
                <li className=' cursor-pointer hover:text-richyellow-40'>
                    <NavLink to={"/category/tv"} onClick={() => dispatch(removeModal())} >TV Series</NavLink>
                </li>
                <li className=' cursor-pointer hover:text-richyellow-40'>
                    <NavLink to={"/category/ova"} onClick={() => dispatch(removeModal())} >OVA</NavLink>
                </li>
                <li className=' cursor-pointer hover:text-richyellow-40'>
                    <NavLink to={"/category/ona"} onClick={() => dispatch(removeModal())} >ONA</NavLink>
                </li>
                <li className=' cursor-pointer hover:text-richyellow-40'>
                    <NavLink to={"/category/special"} onClick={() => dispatch(removeModal())} >Special</NavLink>
                </li>
                <li className=' cursor-pointer hover:text-richyellow-40'>
                    <NavLink to={"/category/music"} onClick={() => dispatch(removeModal())} >Music</NavLink>
                </li>
                <li className=' cursor-pointer hover:text-richyellow-40'>
                    <NavLink to={"/most-popular"} onClick={() => dispatch(removeModal())} >Most Popular</NavLink>
                </li>
                <li className=' cursor-pointer hover:text-richyellow-40'>
                    <NavLink to={"/top-airing"} onClick={() => dispatch(removeModal())} >Top Airing</NavLink>
                </li>
                <li className=' cursor-pointer hover:text-richyellow-40'>
                    <NavLink to={"/genre/1"} onClick={() => dispatch(removeModal())} >Genres</NavLink>
                </li>
                <li className=' cursor-pointer hover:text-richyellow-40'>
                    <NavLink to={"/filter"} onClick={() => dispatch(removeModal())} >Filter</NavLink>
                </li>
                
            </ul> 

        </div>
    </div>
  )
}

export default SideBar