import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
function Sidebar({ data }) {
    const userRole = useSelector((state) => state.auth.role);
    const [isOpen, setIsOpen] = useState(false); 

    const toggleSidebar = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <div>
            <button
                onClick={toggleSidebar}
                className='fixed top-12 left-6 z-50 p-2 bg-black border border-white rounded-md text-white '
              
            >
                <Bars3Icon className='h-9 w-9' />
            </button>

            {isOpen && userRole === 'user' && (
                <div className='fixed top-0 left-0 md:w-96 bg-zinc-800 p-6  flex flex-col h-full shadow-xl z-40'>
                    <div className='flex flex-col items-center mb-6'>
                        {data.avatar && (
                            <img
                                src={data.avatar}
                                alt="User Avatar"
                                className='h-[10vh] rounded-full border-2 border-zinc-600 shadow-lg object-cover'
                            />
                        )}
                        {data.username && (
                            <p className='mt-4 text-2xl text-zinc-100 font-bold'>{data.username}</p>
                        )}
                        {data.email && (
                            <p className='mt-1 text-sm text-zinc-400'>{data.email}</p>
                        )}
                    </div>
                    <div className='w-full h-[1px] bg-zinc-600 mb-6'></div>
                    <div className='flex-grow flex flex-col justify-between'>
                        <div className='flex flex-col space-y-2'>
                            <Link
                                to="/profile"
                                className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded-lg transition-all duration-300 transform hover:scale-105'
                            >
                                Favourites
                            </Link>
                            <Link
                                to="/profile/orderhistory"
                                className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded-lg transition-all duration-300 transform hover:scale-105'
                            >
                                Order History
                            </Link>
                            <Link
                                to="/profile/setting"
                                className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded-lg transition-all duration-300 transform hover:scale-105'
                            >
                                Settings
                            </Link>
                        </div>
                        <div className='mt-6'>
                            <Link
                                to="/logout"
                                className='flex items-center justify-center w-full py-3 border border-blue-500 bg-blue-500 rounded-lg text-white text-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 hover:shadow-lg sm:text-base sm:py-2 md:text-lg md:py-3 lg:text-xl lg:py-4'
                            >
                                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            {isOpen && userRole === 'admin' && (
                <div className='fixed top-0 left-0 md:w-96 bg-zinc-800 p-6  flex flex-col h-full shadow-xl z-40'>
                    <div className='flex flex-col items-center mb-6'>
                        {data?.avatar && (
                            <img
                                src={data.avatar}
                                alt="User Avatar"
                                className='h-[10vh] rounded-full border-2 border-zinc-600 shadow-lg object-cover'
                            />
                        )}
                        {data?.username && (
                            <p className='mt-4 text-2xl text-zinc-100 font-bold'>{data.username}</p>
                        )}
                        {data?.email && (
                            <p className='mt-1 text-sm text-zinc-400'>{data.email}</p>
                        )}
                    </div>
                    <div className='w-full h-[1px] bg-zinc-600 mb-6'></div>
                    <div className='flex-grow flex flex-col justify-between'>
                        <div className='flex flex-col space-y-2'>
                            <Link
                                to="/profile"
                                className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded-lg transition-all duration-300 transform hover:scale-105'
                            >
                                All Order
                            </Link>
                            <Link
                                to="/profile/addbook"
                                className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded-lg transition-all duration-300 transform hover:scale-105'
                            >
                                Add Books
                            </Link>
                      
                        </div>
                        <div className='mt-6'>
                            <Link
                                to="/logout"
                                className='flex items-center justify-center w-full py-3 border border-blue-500 bg-blue-500 rounded-lg text-white text-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 hover:shadow-lg sm:text-base sm:py-2 md:text-lg md:py-3 lg:text-xl lg:py-4'
                            >
                                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
