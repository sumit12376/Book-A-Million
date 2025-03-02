import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
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
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/v1/sign-in', data);
            console.log("res", response);
            toast.success(response.data.message);
            dispatch(login());
            dispatch(changeRole(response.data.role));
            navigate("/");
            const { token, id, role } = response.data;
            Cookies.set('token', token, { expires: 30 });
            Cookies.set('id', id, { expires: 30 });
            Cookies.set('role', role, { expires: 30 });
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
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
                            {...register('username', { required: 'Username is required' })}
                            className={`mt-1 block w-full border rounded-md p-3 bg-white text-gray-800 text-lg ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm">{errors.username.message}</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className={`mt-1 block w-full border rounded-md p-3 bg-white text-gray-800 text-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-lg"
                    >
                        Login
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
