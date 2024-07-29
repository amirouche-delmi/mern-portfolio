import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

function Projects() {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)
    const {portfolioData} = useSelector(state => state.root)
    const {projects} = portfolioData;

  return (
    <div>
        <SectionTitle title="Projects" />

        <div className="flex py-10 gap-20 sm:flex-col">
            <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/4 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                {projects.map((project, index) => (
                    <div className='cursor-pointer' onClick={() => {setSelectedItemIndex(index)}}>
                        <h1 className={`text-xl px-5 ${selectedItemIndex === index ? 'text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3' : 'text-white'}`}>
                            {project.title}
                        </h1>
                    </div>
                ))}
            </div>
            <div className='flex items-center justify-center gap-10 sm:flex-col'>
                <img src={projects[selectedItemIndex].image} alt="img"  width={"300px"}/>
                <div className='flex flex-col gap-5 w-3/4'>
                    <h1 className="text-secondary text-xl">{projects[selectedItemIndex].title}</h1>
                    <p className="text-white">{projects[selectedItemIndex].description}</p>
                    <p className='text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste odio, sequi sint praesentium dolorum porro excepturi quae eos! Soluta exercitationem non et incidunt pariatur omnis mollitia at, dignissimos sit ad!</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Projects