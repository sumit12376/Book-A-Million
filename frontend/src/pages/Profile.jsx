import React, { useEffect, useState } from 'react';

import Sidebar from '../components/Profilebar/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader'
function Profile() {
    const isloggedin = useSelector(state => state.auth.isloggedin);
    const [profile, setprofile] = useState()
    useEffect(() => {
        const headers = {
            id: Cookies.get('id'),
            Authorization: `Bearer ${Cookies.get('token')}`
        };

        const fetch = async () => {
            try {
                const response = await axios.get("https://books-a-million.onrender.com/api/v1/getinfo", { headers });
                console.log(response.data);
                setprofile(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        if (isloggedin) {
            fetch();
        }
    }, [isloggedin]);

    return (
        <div className='bg-gray-100 md:px-12 px-2 flex flex-col md:flex-row h-full  '>
        

            <div className='bg-gray-100 w-full md:w-1/6 text-white '>
                <Sidebar data={profile}/>
            </div>
            <div className='bg-gray-100 min-h-screen w-full  text-white'>
                <Outlet /> 
            </div>
        </div>
    );
}

export default Profile;
