import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux'

export const Experiences = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)
    const { portfolioData } = useSelector(state => state.root)
    const { experiences } = portfolioData;

    // Créer une copie du tableau d'expériences et inverser l'ordre
    const reversedExperiences = [...experiences].reverse();

    return (
        <div>
            <SectionTitle title="Formation" />

            <div className="flex py-10 gap-20 sm:flex-col">
                <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/4 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                    {reversedExperiences.map((experience, index) => (
                        <div 
                            key={index} 
                            className='cursor-pointer' 
                            onClick={() => { setSelectedItemIndex(index) }}
                        >
                            <h1 
                                className={`text-xl px-5 ${selectedItemIndex === index ? 'text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3' : 'text-white'}`}
                            >
                                {experience.period}
                            </h1>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col gap-5 w-3/4'>
                    <h1 className="text-secondary text-xl">{reversedExperiences[selectedItemIndex].title}</h1>
                    <h1 className="text-tertiary text-xl">{reversedExperiences[selectedItemIndex].company}</h1>
                    <p className='text-white'>{reversedExperiences[selectedItemIndex].description}</p>
                </div>
            </div>
        </div>
    )
}

