import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {FaStar, FaPlus, FaPlay} from "react-icons/fa"
import {MdKeyboardDoubleArrowLeft, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowRight} from "react-icons/md"

const RecommendedAnimes = ({recommendedAnime}) => {
    
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState([])

    //Calculate the chunk whitout modifing the original one 
    const chunkSize = 20;
    const totalChunks = Math.ceil(recommendedAnime.length / chunkSize);
    const chunks = [];
    for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = start + chunkSize;
    chunks.push(recommendedAnime.slice(start, end));
    }

    // Set the chunks into the pages state
    useEffect(() => {

        setPages(chunks);
    },[recommendedAnime]);

    console.log("here is the passed recommended anime", pages);
    console.log("here is the recommended anime", pages[currentPage]);
    console.log("Here is the current page", currentPage);

  return (
    <div className=''>

        <h3 className='text-[1.5rem]  mb-5 font-bold tracking-wide text-richyellow-50'>Recommended Anime</h3>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            
            {
                pages[currentPage] &&
                pages[currentPage].map((anime,index) => (
                    <div key={index} className=''>
                        <div  className=' h-[20rem] w-[14rem] group flex items-end justify-center relative overflow-hidden'>
                                {/* Anime image */}
                                <img 
                                onClick={() => navigate(`/full-anime-detials/${anime.entry.mal_id}/${anime.entry.title.split(" "). join("-")}`)}
                                className=' absolute w-full top-0 left-0 h-full cursor-pointer'
                                src={anime.entry.images.jpg.image_url} alt='animePoster' />
                                
                                {/* Buttons */}
                                <div className='w-[95%] z-10 opacity-0 group-hover:opacity-100 flex transition-all duration-300 text-richblack-90 items-start justify-between '>
                                    <NavLink to={`/full-anime-detials/${anime.entry.mal_id}/${anime.entry.title.split(" "). join("-")}`} className={" flex mb-2 justify-center w-full"}>
                                        <div className='flex justify-center rounded-3xl gap-2  items-center py-2 w-full bg-richyellow-50'>
                                            <FaPlay />
                                            <p>View Now</p>
                                        </div>
                                    </NavLink>

                                    {/* <div className='h-10 w-10 flex cursor-pointer items-center justify-center text-sm rounded-full bg-richwhite-100'>
                                        <FaPlus/>
                                    </div> */}
                                    
                                </div>
                        </div>
                        
                        {/* ANime name */}
                        <p className=' text-richwhite-100 font-semibold'>
                        {
                            (anime.entry.title_english  ?  anime.entry.title_english : anime.entry.title).length > 28 
                            ? (anime.entry.title_english  ?  anime.entry.title_english.slice(0,25) : anime.entry.title.slice(0,25)) + "..." : 
                            anime.entry.title_english  ?  anime.entry.title_english : anime.entry.title
                        }
                        </p>
                    </div>
                ))
            }
        </div>

        <div className='w-full flex justify-center items-center gap-2 my-10'>
            {/* To go to first page */}
            {
                currentPage !== 0 && <div 
                                    className='p-3 rounded-full bg-richblack-40 cursor-pointer hover:text-richyellow-50'
                                    onClick={() => setCurrentPage(0)}>
                                        <MdKeyboardDoubleArrowLeft/>
                                    </div>
            }

            {/* TO go to previous page */}
            {
                currentPage !== 1 && <div
                                className='p-3 rounded-full bg-richblack-40 cursor-pointer hover:text-richyellow-50' 
                                onClick={() => setCurrentPage( currentPage - 1)}>
                                    <MdKeyboardArrowLeft />
                                </div>
            }

            {/* To give previous, current and next page */}
            {
                <div className='flex gap-2'>
                {Array.from({ length: pages.length - 1 }, (_, index) => (
                    <div 
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10  justify-center ${currentPage === index - 1 || currentPage === index || currentPage === index + 1 ? "flex": "hidden" } items-center h-10 cursor-pointer text-sm  rounded-full ${index + 1 === currentPage ? 
                    " bg-richyellow-50" : " bg-richblack-40"} ${currentPage !== index + 1 ? "hover:text-richyellow-50": "cursor-default"}`}
                    key={index}>
                        {index + 1}
                    </div>
                ))}
                </div>
            }

            {/* To get the next page */}
            {
                currentPage !== pages.length - 1  && <div 
                                                    className='p-3 rounded-full cursor-pointer bg-richblack-40 hover:text-richyellow-50'
                                                    onClick={() => setCurrentPage( currentPage + 1)}>
                                                    <MdKeyboardArrowRight />
                                                    </div>
            }

            {/* TO get the last visible page */}
            {
                currentPage !== pages.length - 1  && <div 
                                                    className={`p-3 rounded-full bg-richblack-40 cursor-pointer  hover:text-richyellow-50`}
                                                    onClick={() => setCurrentPage(pages.length - 1)} >
                                                    <MdKeyboardDoubleArrowRight />
                                                    </div>
            }
        </div>

    </div>
  )
}

export default RecommendedAnimes