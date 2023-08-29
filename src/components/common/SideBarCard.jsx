import React from 'react'
import { useNavigate } from 'react-router-dom'

const SideBarCard = ({anime}) => {
    const navigate = useNavigate()
  return (
    <div 
    onClick={() => navigate(`/full-anime-detials/${anime.mal_id}/${anime.name.split(" ").join("-")}`)}
    className=' border-[2px] border-richyellow-40 rounded-md text-richwhite-100 opacity-60
     px-2 py-1 hover:bg-richyellow-10 cursor-pointer hover:scale-105 transition-all duration-300'>
        <p>{anime.name.length > 30 ? anime.name.slice(0,30)+"..." : anime.name}</p>
    </div>
  )
}

export default SideBarCard