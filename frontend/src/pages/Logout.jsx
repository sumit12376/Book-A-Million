import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { logout } from '../Store/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        Cookies.set('token', '', { expires: -1 });
        Cookies.set('id', '', { expires: -1 });
        Cookies.set('role', '', { expires: -1 });

      
        dispatch(logout());

        navigate('/login');
    }, [dispatch, navigate]);

    return null; 
}

export default Logout;
