import React from 'react'
import {BsFillArrowRightCircleFill} from "react-icons/bs"
import { NavLink } from 'react-router-dom'

const ViewAndShare = () => {
  return (
        <div className='h-[80px] relative mx-auto w-10/12 max-w-1200'>
            <NavLink to={"/home"}>
                <div className='w-full flex gap-4 justify-center items-center bg-richyellow-50 
                h-[80px] rounded-[2.8rem] font-bold absolute -top-10 z-0 text-[1.4rem]'>
                    <p>View Full Site</p>
                    <BsFillArrowRightCircleFill/>
                </div>
            </NavLink>
        </div>
  )
}

export default ViewAndShare