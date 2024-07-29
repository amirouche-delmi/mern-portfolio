import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

function Courses() {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)
    const {portfolioData} = useSelector(state => state.root)
    const {courses} = portfolioData;
 
  return (
    <div>
        <SectionTitle title="Courses" />

        <div className="flex py-10 gap-20 sm:flex-col">
            <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/4 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                {courses.map((course, index) => (
                    <div className='cursor-pointer' onClick={() => {setSelectedItemIndex(index)}}>
                        <h1 className={`text-xl px-5 ${selectedItemIndex === index ? 'text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3' : 'text-white'}`}>
                            {course.title}
                        </h1>
                    </div>
                ))}
            </div>
            <div className='flex items-center justify-center gap-10 sm:flex-col'>
                <div className='flex flex-col gap-5 w-3/4'>
                    <h1 className="text-secondary text-xl">{courses[selectedItemIndex].title}</h1>
                    <p className='text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste odio, sequi sint praesentium dolorum porro excepturi quae eos! Soluta exercitationem non et incidunt pariatur omnis mollitia at, dignissimos sit ad!</p>
                </div>
                <img src={courses[selectedItemIndex].image} alt="img"  width={"300px"}/>
            </div>
        </div>
    </div>
  )
}

export default Courses