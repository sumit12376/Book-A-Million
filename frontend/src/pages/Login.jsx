import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { changeRole, login } from '../Store/auth';
import Loader from '../components/Loader/Loader';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post('https://books-a-million.onrender.com/api/v1/sign-in', data);
            toast.success(response.data.message);
            dispatch(login());
            dispatch(changeRole(response.data.role));
            const { token, id, role } = response.data;
            Cookies.set('token', token, { expires: 30, secure: true, sameSite: 'strict' });
            Cookies.set('id', id, { expires: 30, secure: true, sameSite: 'strict' });
            Cookies.set('role', role, { expires: 30, secure: true, sameSite: 'strict' });
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        } catch (error) {
            if (error.message === 'Network Error') {
                toast.error('Network error. Please check your internet connection.');
            } else if (error.response?.status === 401) {
                toast.error('Session expired. Please log in again.');
                navigate('/login');
            } else {
                toast.error(error.response?.data?.message || 'An error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            {loading ? (
                <Loader />
            ) : (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-gray-100 shadow-lg rounded-lg p-8 w-96"
                >
                    <h2 className="text-2xl font-semibold text-center mb-6 text-black">Login</h2>
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-lg font-medium text-gray-700">
                            Username:
                        </label>
                        <input
                            type="text"
                            {...register('username', {
                                required: 'Username is required',
                                minLength: {
                                    value: 3,
                                    message: 'Username must be at least 3 characters',
                                },
                            })}
                            className={`mt-1 block w-full border rounded-md p-3 bg-white text-gray-800 text-lg ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                            aria-label="Username"
                            aria-invalid={errors.username ? 'true' : 'false'}
                            autoFocus
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm">{errors.username.message}</p>
                        )}
                    </div>
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            className={`mt-1 block w-full border rounded-md p-3 bg-white text-gray-800 text-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            aria-label="Password"
                            aria-invalid={errors.password ? 'true' : 'false'}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-11 text-gray-500"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <p className="mt-4 text-center text-gray-600">
                        Don’t have an account?
                        <Link to="/signup" className="text-blue-500 hover:underline"> Sign Up</Link>
                    </p>
                </form>
            )}
            <ToastContainer />
        </div>
    );
};

export default Login;