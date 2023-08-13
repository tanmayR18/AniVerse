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
        <h3 className='text-[1.1rem] font-bold text-richwhite-100 opacity-90 tracking-wide'>Filter</h3>

        <div>

            <label>
                Type
                <select value={formData.type} name='type' onChange={changeHandler}>
                    {
                        type.map( (item, index) => (
                            <option key={index} value={item.value}>
                                {item.name}
                            </option>
                        ))
                    }
                </select>
            </label>

            <label>
                Status
                <select value={formData.status} name='status' onChange={changeHandler}>
                    {
                        status.map( (item, index) => (
                            <option key={index} value={item.value}>
                                {item.name}
                            </option>
                        ))
                    }
                </select>
            </label>

            <label>
                Rating
                <select value={formData.rating} name='rating' onChange={changeHandler}>
                    {
                        rating.map( (item, index) => (
                            <option key={index} value={item.value}>
                                {item.name}
                            </option>
                        ))
                    }
                </select>
            </label>

            <label>
                Score
                <select value={formData.score} name='score' onChange={changeHandler}>
                    {
                        score.map( (item, index) => (
                            <option key={index} value={item.value}>
                                {item.name}
                            </option>
                        ))
                    }
                </select>
            </label>

            <label>
                Order By
                <select value={formData.order_by} name='order_by' onChange={changeHandler}>
                    {
                        order_by.map( (item, index) => (
                            <option key={index} value={item.value}>
                                {item.name}
                            </option>
                        ))
                    }
                </select>
            </label>

                <label>
                    Sort
                    <select value={formData.sort} name='sort' onChange={changeHandler}>
                        {
                            sort.map( (item, index) => (
                                <option key={index} value={item.value}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </label>

            <label>
                Filter 18+
                <select value={formData.sfw} name='sfw' onChange={changeHandler}>
                    {
                        sfw.map( (item, index) => (
                            <option key={index} value={item.value}>
                                {item.name}
                            </option>
                        ))
                    }
                </select>
            </label>

            <Datepicker 
                asSingle={true} 
                value={start} 
                onChange={startHandleValueChange} 
            /> 

            <Datepicker 
                asSingle={true} 
                value={end} 
                onChange={endHandleValueChange} 
            /> 
            {/* {value.startDate}
            {console.log(value)} */}
        </div>
    </div>
  )
}

export default Filters