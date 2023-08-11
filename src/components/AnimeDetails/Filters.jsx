import React, { useState } from 'react'

const Filters = ({formData, changeHandler}) => {
    

  return (
    <div className='flex flex-col gap-6'>
            {/* <input
                type='text'
                value={formData.name}
                id='name'
                placeholder='Name'
                name='name'
                onChange={changeHandler}
            />
            <input
                type='date'
                value={formData.date}
                id='data'
                placeholder='date'
                name='date'
                onChange={changeHandler}
            />
            <input
                type='password'
                value={formData.password}
                id='password'
                placeholder='password'
                name='password'
                onChange={changeHandler}
            /> */}
    </div>
  )
}

export default Filters