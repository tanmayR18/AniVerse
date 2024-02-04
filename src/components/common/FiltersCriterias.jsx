import React, {  } from 'react'
import { type, status, rating, score, order_by, sort, sfw } from '../../data/filter/filter'
import Datepicker from 'react-tailwindcss-datepicker'
// import Calendar from 'react-calendar'

const Filters = ({formData, changeHandler, start, setStart, end, setEnd}) => {

    // Filter for starting date of anime
    const startHandleValueChange = (newValue) => {
        console.log("newValue:", newValue); 
        setStart(newValue); 
    }
    
    // Filter for ending date of anime
    const endHandleValueChange = (newValue) => {
        console.log("newValue:", newValue); 
        setEnd(newValue); 
    }
        
  return (
    <div className='flex flex-col gap-6'>
        <h3 className='text-[1.2rem] font-bold text-richwhite-100 opacity-90 tracking-wide'>Filter</h3>

        <div className='flex gap-3 flex-wrap'>

            {/* Types  */}
            <div className=' pl-[6px]  rounded-md border flex items-center font-bold text-richwhite-100 gap-2 border-richwhite-20'>
                <label
                    htmlFor='type'
                    className=' text-sm bg-richblack-5 font-semibold '>
                    Type</label>
                    <select 
                    className=' m-1 border-none focus:border-none focus:outline-none appearance-none text-richyellow-40 text-sm  bg-richblack-5'
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

            {/* Status */}
           <div className=' p-[6px] rounded-md border flex items-center font-bold text-richwhite-100 gap-2 border-richwhite-20'>
                <label className=' text-sm bg-richblack-5 font-semibold '>
                        Status
                        <select 
                        className=' m-1 border-none focus:border-0 focus:outline-none appearance-none text-richyellow-40 text-sm  bg-richblack-5'
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

            {/* Rating */}
            <div className=' p-[6px] rounded-md border flex items-center font-bold text-richwhite-100 gap-4 border-richwhite-20'>
                <label className=' text-sm bg-richblack-5 font-semibold '>
                    Rating</label>
                    <select 
                    className=' m-1 border-none focus:border-0 focus:outline-none appearance-none text-richyellow-40 text-sm  bg-richblack-5'
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

            {/* Score */}
            <div className=' p-[6px] rounded-md border flex items-center font-bold text-richwhite-100 gap-4 border-richwhite-20'>
                <label className=' text-sm bg-richblack-5 '>
                    Score </label>
                    <select 
                    className=' m-1 border-none focus:border-0 focus:outline-none appearance-none text-richyellow-40 text-sm  bg-richblack-5'
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

            {/* Order By */}
            <div className=' p-[6px] rounded-md border flex items-center font-bold text-richwhite-100 gap-4 border-richwhite-20'>
                <label className=' text-sm bg-richblack-5 '>
                    Order By </label>
                    <select 
                    className=' m-1 border-none focus:border-0 focus:outline-none appearance-none text-richyellow-40 text-sm  bg-richblack-5'
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

            {/* Sort By */}
            <div className=' p-[6px] rounded-md border flex items-center font-bold text-richwhite-100 gap-4 border-richwhite-20'>
                <label className=' text-sm bg-richblack-5'>
                    Sort </label>
                    <select 
                    className=' m-1 border-none focus:border-0 focus:outline-none appearance-none text-richyellow-40 text-sm  bg-richblack-5'
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

            {/* Filter 18+ content */}
            <div className=' p-[6px] rounded-md border flex items-center text-richwhite-100 gap-4 border-richwhite-20'>
                <label className=' text-sm bg-richblack-5 font-semibold '>
                    Filter 18+ </label>
                    <select 
                    className=' m-1 border-none focus:border-0 focus:outline-none appearance-none text-richyellow-40 text-sm  bg-richblack-5'
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

            {/* Starting date */}
            <div className='flex items-center border p-[6px] rounded-md  border-richwhite-20'>
                <p className=' w-28 text-richwhite-100  font-bold text-sm'>Start Date</p>
                <Datepicker 
                    inputClassName=" bg-transparent w-32 text-richyellow-40 text-sm font-semibold  border-none " 
                    popoverDirection='down'
                    useRange={false}
                    asSingle={true} 
                    value={start} 
                    onChange={startHandleValueChange} 
                />
            </div> 

            
            
            {/* <div class="relative max-w-sm">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
            </div>
            <input 
            datepicker datepicker-autohide type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
            </div> */}



            {/* Ending Date */}
            <div className=' flex   items-center border p-[6px] rounded-md  border-richwhite-20'>
            <p className=' w-28 text-richwhite-100 font-bold text-sm'>End Date</p>
                <Datepicker
                    inputClassName=" bg-transparent w-32 text-richyellow-40 text-sm font-semibold  border-none " 
                    popoverDirection='down'
                    useRange={false}
                    asSingle={true} 
                    primaryColor={"blue"} 
                    value={end} 
                    onChange={endHandleValueChange} 
                />
            </div> 
            
        </div>
    </div>
  )
}

export default Filters