import React from 'react'

const Modal = ({children}) => {
  return (
    <div className=' fixed inset-0 z-[1000] !mt-0 overflow-auto backdrop-blur-md bg-richblack-5 bg-opacity-10'>
        
        {children}

    </div>
  )
}

export default Modal