import React, { useState } from 'react'
import { type, status, rating, score, order_by, sort, sfw } from '../../data/filter/filter'
import Datepicker from 'react-tailwindcss-datepicker'

const Filters = ({formData, changeHandler, start, setStart, end, setEnd}) => {

    const startHandleValueChange = (newValue) => {
        console.log("newValue:", newValue); 
        setStart(newValue); 
    }
    
    const endHandleValueChange = (newValue) => {
        console.log("newValue:", newValue); 
        setEnd(newValue); 
    }
        
  return (
    <div className='flex flex-col gap-6'>
        <h3 className='text-[1.2rem] font-bold text-richwhite-100 opacity-90 tracking-wide'>Filter</h3>

        <div className='flex gap-3 flex-wrap'>

            <div className=' p-[6px] rounded-md border flex items-center font-bold text-richwhite-100 gap-2 border-richwhite-20'>
                <label
                    htmlFor='type'
                    className=' text-sm bg-richblack-5 font-semibold '>
                    Type</label>
                    <select 
                    className=' m-1 focus:outline-none appearance-none text-richyellow-40 text-sm  bg-richblack-5'
                    id='type'
                    value={formData.type} name='type' onChange={changeHandler}>
                        {
                            type.map( (item, index) => (
                                <option
                                className=''
                                key={index} value={item.value}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                
            </div>

           <div className=' p-[6px] rounded-md border flex items-center font-bold text-richwhite-100 gap-2 border-richwhite-20'>
                <label className=' text-sm bg-richblack-5 font-semibold '>
                        Status
                        <select 
                        className=' m-1 focus:outline-none appearance-none text-richyellow-40 text-sm  bg-richblack-5'
                        value={formData.status} name='status' onChange={changeHandler}>
                            {
                                status.map( (item, index) => (
                                    <option key={index} value={item.value}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </label>
           </div>

            <div className=' p-[6px] rounded-md border flex items-center font-bold text-richwhite-100 gap-4 border-richwhite-20'>
                <label className=' text-sm bg-richblack-5 font-semibold '>
                    Rating</label>
                    <select 
                    className=' m-1 focus:outline-none appearance-none text-richyellow-40 text-sm  bg-richblack-5'
                    value={formData.rating} name='rating' onChange={changeHandler}>
                        {
                            rating.map( (item, index) => (
                                <option key={index} value={item.value}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                
            </div>

            <div className=' p-[6px] rounded-md border flex items-center font-bold text-richwhite-100 gap-4 border-richwhite-20'>
                <label className=' text-sm bg-richblack-5 '>
                    Score </label>
                    <select 
                    className=' m-1 focus:outline-none appearance-none text-richyellow-40 text-sm  bg-richblack-5'
                    value={formData.score} name='score' onChange={changeHandler}>
                        {
                            score.map( (item, index) => (
                                <option key={index} value={item.value}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                
            </div>

            <div className=' p-[6px] rounded-md border flex items-center font-bold text-richwhite-100 gap-4 border-richwhite-20'>
                <label className=' text-sm bg-richblack-5 '>
                    Order By </label>
                    <select 
                    className=' m-1 focus:outline-none appearance-none text-richyellow-40 text-sm  bg-richblack-5'
                    value={formData.order_by} name='order_by' onChange={changeHandler}>
                        {
                            order_by.map( (item, index) => (
                                <option key={index} value={item.value}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                
            </div>

            <div className=' p-[6px] rounded-md border flex items-center font-bold text-richwhite-100 gap-4 border-richwhite-20'>
                <label className=' text-sm bg-richblack-5'>
                    Sort </label>
                    <select 
                    className=' m-1 focus:outline-none appearance-none text-richyellow-40 text-sm  bg-richblack-5'
                    value={formData.sort} name='sort' onChange={changeHandler}>
                        {
                            sort.map( (item, index) => (
                                <option key={index} value={item.value}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                
            </div>    

            <div className=' p-[6px] rounded-md border flex items-center text-richwhite-100 gap-4 border-richwhite-20'>
                <label className=' text-sm bg-richblack-5 font-semibold '>
                    Filter 18+ </label>
                    <select 
                    className=' m-1 focus:outline-none appearance-none text-richyellow-40 text-sm  bg-richblack-5'
                    value={formData.sfw} name='sfw' onChange={changeHandler}>
                        {
                            sfw.map( (item, index) => (
                                <option key={index} value={item.value}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                
            </div>

            <div className=''>
                <Datepicker 
                    // containerClassName="relative mt-8 hover:bg-richblack-40 text-richwhite-100 font-bold " 
                    asSingle={true} 
                    primaryColor={"blue"} 
                    value={start} 
                    onChange={startHandleValueChange} 
                />
            </div> 

            <div className=''>
                <Datepicker 
                    // containerClassName="relative mt-8 hover:bg-richblack-40 text-richwhite-100 font-bold " 
                    asSingle={true} 
                    primaryColor={"blue"} 
                    value={end} 
                    onChange={endHandleValueChange} 
                />
            </div> 
            {/* {value.startDate}
            {console.log(value)} */}
        </div>
    </div>
  )
}

export default Filters