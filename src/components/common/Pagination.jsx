import React from 'react'
import { useState } from 'react'
import {MdKeyboardDoubleArrowLeft, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowRight} from "react-icons/md"

const Pagination = ({paginationData, page, setPage, setAnimes}) => {
    
  return (
    <div className='w-full flex justify-center items-center gap-2 my-10'>
        {
            page !== 1 && <div 
                            className='p-3 rounded-full bg-richblack-40 cursor-pointer hover:text-richyellow-50'
                            onClick={() => setPage(1)}>
                                <MdKeyboardDoubleArrowLeft/>
                            </div>
        }
        
        {
            page !== 1 && <div
                            className='p-3 rounded-full bg-richblack-40 cursor-pointer hover:text-richyellow-50' 
                            onClick={() => setPage( page - 1)}>
                                <MdKeyboardArrowLeft />
                            </div>
        }

        {
            <div className='flex gap-2'>
            {Array.from({ length: paginationData.last_visible_page }, (_, index) => (
                <div 
                onClick={() => setPage(index + 1)}
                className={`w-10 flex justify-center items-center h-10 cursor-pointer text-sm  rounded-full ${index + 1 === page ? 
                " bg-richyellow-50" : " bg-richblack-40"} ${page !== index + 1 ? "hover:text-richyellow-50": "cursor-default"}`}
                key={index}>
                    {index + 1}
                </div>
            ))}
            </div>
        }

        {
            page !== paginationData.last_visible_page  && <div 
                                                            className='p-3 rounded-full cursor-pointer bg-richblack-40 hover:text-richyellow-50'
                                                            onClick={() => setPage( page + 1)}>
                                                                <MdKeyboardArrowRight />
                                                            </div>
        }
        {
            page !== paginationData.last_visible_page  && <div 
                                                            className={`p-3 rounded-full bg-richblack-40 cursor-pointer  hover:text-richyellow-50`}
                                                            onClick={() => setPage(paginationData.last_visible_page)} >
                                                                <MdKeyboardDoubleArrowRight />
                                                            </div>
        }
        {console.log(page)}
    </div>

  )
}

export default Pagination