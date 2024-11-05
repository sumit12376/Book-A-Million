import React from 'react';
import fileImage from '../../assets/imagess1.jpg';

function Hero() {
    return (
        <div className="h-[95vh] flex items-center justify-center bg-gray-900 text-white relative">
            <div
                className="absolute inset-0 bg-cover bg-center md:bg-cover"
                style={{ 
                    backgroundImage: `url(${fileImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div className="absolute inset-0 bg-black opacity-50" />
            <div className="relative w-5/6 md:w-3/6 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl ">
                    Discover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books
                </h1>
                <p className="mt-4 text-base md:text-xl text-zinc-300">
                    Dive into our wide variety of books and find your next great read today.
                </p>
                <div className="mt-6">
                    <button className="text-yellow-100 text-xl md:text-2xl font-semibold border border-yellow-100 px-6 py-3 hover:bg-yellow-100 hover:text-gray-900 rounded-full">
                        Explore Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Hero;
