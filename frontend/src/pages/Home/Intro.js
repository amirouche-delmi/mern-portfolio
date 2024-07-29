import React from 'react'
import { useSelector } from 'react-redux'

function Intro() {
  const {loading, portfolioData} = useSelector(state => state.root)
  const {intro} = portfolioData;
  const {firstName, lastName, welcomeText, description, caption} = intro;

  return (
    <div className='h-[80vh] bg-primary flex flex-col items-start justify-center gap-5'>
        <h1 className='text-white'>{welcomeText || ''}</h1>
        <h1 className='text-6xl sm:text-3xl text-secondary font-semibold'>{firstName || ''} {lastName || ''}</h1>
        <h1 className='text-5xl sm:text-2xl text-white font-semibold'>{caption || ''}</h1>
        <p className='text-white'>
        {description || ''}
        </p>
        <button className='border-2 border-tertiary text-tertiary px-10 py-3 rounded mt-10'>Commencer</button>
    </div>
  )
}

export default Intro