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
        <div>
            <h3>{mainHeading.title}</h3>
            <p>{mainHeading.description1}</p>
            <p>{mainHeading.description2}</p>
        </div>

        <div>
            <h3>{subHeading1.title}</h3>
            <p>{subHeading1.description}</p>
        </div>

        <div>
            <h3>{subHeading2.title}</h3>
            <p>{subHeading2.description}</p>
        </div>

        <div>
            <h3>{subHeading3.title}</h3>
            <p>{subHeading3.description1}</p>
        </div>

        <div>
            <ul className='list-disc'>
                {
                    perks.map( (perk, index) =>(
                        <li key={index}><p><span className='font-semibold mr-2'>{perk.title}</span>{perk.description}</p></li>
                    ))
                }
            </ul>
        </div>

        <div>
            <p>{subHeading3.description2}</p>
            <p>{subHeading3.description3}</p>
        </div>
    </div>
  )
}

export default HomeAbout