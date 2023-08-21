import React from 'react'
import { mainHeading } from '../../data/Home/about'
import { subHeading1 } from '../../data/Home/about'
import { subHeading2 } from '../../data/Home/about'
import { subHeading3 } from '../../data/Home/about'
import { perks } from '../../data/Home/about'


const HomeAbout = () => {
  return (
    <div className='w-[62%] text-richwhite-100'>
        {/* Main Heading */}
        <div className='mb-6 flex flex-col gap-4'>
            <h3 className='text-[1.8rem] font-bold'>{mainHeading.title}</h3>
            <p className='text-[14px] tracking-wider opacity-90 text-richwhite-50'>{mainHeading.description1}</p>
            <p className='text-[14px] tracking-wider opacity-90 text-richwhite-50'>{mainHeading.description2}</p>
        </div>

        {/* FIrst Point */}
        <div  className='mb-6  flex flex-col gap-4'>
            <h3 className='text-[1.5rem] font-semibold'>{subHeading1.title}</h3>
            <p className='text-[14px] tracking-wider opacity-90 text-richwhite-50'>{subHeading1.description}</p>
        </div>

        {/* Second Points */}
        <div  className='mb-6  flex flex-col gap-4'>
            <h3 className='text-[1.5rem] font-semibold'>{subHeading2.title}</h3>
            <p className='text-[14px] tracking-wider opacity-90 text-richwhite-50'>{subHeading2.description}</p>
        </div>

        {/* Third Point */}
        <div  className='mb-6  flex flex-col gap-4'>
            <h3 className='text-[1.5rem] font-semibold'>{subHeading3.title}</h3>
            <p className='text-[14px] tracking-wide opacity-90 text-richwhite-50'>{subHeading3.description1}</p>
        </div>

        {/* List of features */}
        <div>
            <ul className='list-disc flex flex-col gap-4'>
                {
                    perks.map( (perk, index) =>(
                        <li
                        className='text-[14px] tracking-wider opacity-90 text-richwhite-50 ml-4'
                        key={index}><p><span className='font-semibold mr-2'>{perk.title}</span>{perk.description}</p></li>
                    ))
                }
            </ul>
        </div>

        {/* Footer Ending description */}
        <div className='flex flex-col gap-4 mt-4'>
            <p className='text-[15px] font-light tracking-wide opacity-90 text-richwhite-50'>{subHeading3.description2}</p>
            <p className='text-[15px] tracking-wide opacity-90 text-richwhite-50'>{subHeading3.description3}</p>
        </div>
    </div>
  )
}

export default HomeAbout