import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import fileImage from '../../assets/file.png';
import { IoReorderThree } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const userRole = useSelector((state) => state.auth.role);
    const links = [
        { title: "Home", link: "/" },
        { title: "All Books", link: "/all-books" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
        { title: "admin Profile", link: "/profile" },
    ];
    
    const isLoggedIn = useSelector((state) => state.auth.isloggedin);
    
    if (!isLoggedIn) {
        links.splice(2, 3); 
    }
    if (isLoggedIn && userRole === 'admin') {
        links.splice(2, 2); 
    }
    if (isLoggedIn && userRole === 'user') {
        links.splice(4, 1); 
    }

    return (
        <div className='bg-white text-black px-8 py-4 flex items-center justify-between shadow-lg'>
            <NavLink to="/" className='flex items-center'>
                <img src={fileImage} alt='Logo' className='h-16 w-16' />
                <h1 className='font-bold text-xl ml-2 whitespace-nowrap'>Books-A-Million</h1>
            </NavLink>

            <div className='hidden md:flex items-center space-x-4 font-bold'>
                {links.map((item, i) => (
                    <NavLink
                        to={item.link}
                        key={i}
                        className={({ isActive }) =>
                            isActive ? 'text-blue-400' : 'hover:text-gray-700 transition duration-300'
                        }
                    >
                        {item.title}
                    </NavLink>
                ))}
                {!isLoggedIn && (
                    <>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? 'px-4 py-2 border border-blue-700 rounded bg-blue-700 transition duration-300' : 'px-4 py-2 border border-blue-500 rounded bg-blue-500 hover:bg-blue-600 transition duration-300'
                            }
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className={({ isActive }) =>
                                isActive ? 'px-4 py-2 border border-blue-700 rounded bg-blue-700 transition duration-300' : 'px-4 py-2 border border-blue-500 rounded bg-blue-500 hover:bg-blue-600 transition duration-300'
                            }
                        >
                            Signup
                        </NavLink>
                    </>
                )}
                {isLoggedIn && (
                    <NavLink
                        to="/logout"
                        className={({ isActive }) =>
                            isActive ? 'px-4 py-2 border border-blue-700 rounded bg-blue-700 transition duration-300' : 'px-4 py-2 border border-blue-500 rounded bg-blue-500 hover:bg-blue-600 transition duration-300'
                        }
                    >
                        Logout
                    </NavLink>
                )}
            </div>

            <div className='text-black text-4xl cursor-pointer md:hidden' onClick={() => setOpen(!open)}>
                {open ? <RxCross2 /> : <IoReorderThree />}
            </div>

            {open && (
                <div className='flex flex-col gap-2 z-20 md:hidden w-[200px] p-4 absolute top-24 right-0  shadow-lg bg-gray-600 text-white font-bold'>
                    {links.map((item, i) => (
                        <NavLink
                            to={item.link}
                            key={i}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                isActive ? 'text-blue-400 py-2' : 'py-2 transition duration-300'
                            }
                        >
                            {item.title}
                        </NavLink>
                    ))}
                    {!isLoggedIn && (
                        <>
                            <NavLink
                                to="/login"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    isActive ? 'text-blue-400 py-2' : ' py-2 '
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    isActive ? 'text-blue-400 py-2' : ' py-2 '
                                }
                            >
                                Signup
                            </NavLink>
                        </>
                    )}
                    {isLoggedIn && (
                        <NavLink
                            to="/logout"
                            className={({ isActive }) =>
                                isActive ? 'text-blue-400 py-2' : 'py-2 '
                            }
                        >
                            Logout
                        </NavLink>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
