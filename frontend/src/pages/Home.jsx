import React from 'react'
import Hero from '../components/Home/Hero'
import RecentAdd from '../components/Home/Recentadd'


function Home() {
    return (
        <>
        <div  className='bg-zinc-800 text-white'> <Hero/></div>
    <RecentAdd/>
        </>
    )
}

export default Home
