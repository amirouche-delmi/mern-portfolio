import React, { useRef } from 'react';
import Header from '../../components/Header';
import Intro from './Intro';
import About from './About';
import { Experiences } from './Experiences';
import Projects from './Projects';
import Courses from './Courses';
import Contact from './Contact';
import Footer from './Footer';
import LeftSider from './LeftSider';
import { useSelector } from 'react-redux';

function Home() {
    const { portfolioData } = useSelector(state => state.root);
    
    const aboutRef = useRef(null);

    const handleScrollToAbout = () => {
        if (aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <Header />
            {portfolioData && (
                <div className='bg-primary px-40 sm:px-5'>
                    <Intro scrollToAbout={handleScrollToAbout} />
                    <About ref={aboutRef} />
                    <Experiences />
                    <Projects />
                    {/* <Courses /> */}
                    <Contact />
                    <Footer />
                    <LeftSider />
                </div>
            )}
        </div>
    );
}

export default Home;
