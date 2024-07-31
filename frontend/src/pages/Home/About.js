import React, { forwardRef } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

const About = forwardRef((props, ref) => {
    const { loading, portfolioData } = useSelector(state => state.root);
    const { about } = portfolioData;
    const { skills, lottieURL, description1, description2 } = about;

    return (
        <div ref={ref}>
            <SectionTitle title="À propos" />

            <div className='flex w-full items-center sm:flex-col'>
                <div className='h-[70vh] w-2/5 mr-5 sm:w-full sm:mr-0'>
                    {/* Assurez-vous que le script Lottie est inclus dans votre projet */}
                    <lottie-player
                        src={lottieURL}
                        background="transparent"
                        speed="1"
                        autoplay
                    ></lottie-player>
                </div>
                <div className='flex flex-col gap-5 w-3/5 sm:w-full'>
                    <p className="text-white">
                        {description1 || ''}
                    </p>
                    <p className="text-white">
                        {description2 || ''}
                    </p>
                </div>
            </div>

            <div className='py-5'>
                <h1 className="text-tertiary text-xl">
                Voici quelques technologies avec lesquelles j'ai récemment travaillé :
                </h1>
                <div className="flex flex-wrap gap-10 mt-5">
                    {skills.map((skill, index) => (
                        <div key={index} className='border border-tertiary py-3 px-10'>
                            <h1 className='text-tertiary'>{skill}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default About;
