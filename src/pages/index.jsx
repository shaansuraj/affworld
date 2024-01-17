import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

import CenterHeroSectionFrame from '../components/frame/hero-center'
import SectionHeader from '../components/section-header'

const HomePage = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 768);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <CenterHeroSectionFrame>
            <SectionHeader />
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-yellow-500 mb-6 leading-tight font-bold tracking-tight text-shadow-md lg:my-10">
                Welcome to the Anonymous Message Platform
            </h1>
            <div className="text-xl md:text-2xl mb-8">
                <Typewriter
                    options={{
                        strings: [
                            'Discover the secrets hidden within...',
                            'We value your privacy...',
                            'No one knows the secret behind the secrets...',
                        ],
                        autoStart: true,
                        loop: true,
                    }}
                />
            </div>
            <div className="flex justify-center items-center space-x-4">
                <Link
                    to="/login"
                    className="btn bg-gradient-to-br from-indigo-700 to-purple-800 hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-700"
                >
                    Unveil
                </Link>
                <Link
                    to="/signup"
                    className="btn btn-outline-error"
                >
                    Join the Mystery
                </Link>
            </div>
        </CenterHeroSectionFrame>
    );
};

export default HomePage;
