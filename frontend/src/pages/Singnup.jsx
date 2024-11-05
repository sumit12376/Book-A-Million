import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader/Loader';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        address: '',
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('https://books-a-million.onrender.com/api/v1/sign-up', formData);
            toast.success('Signup successful!');
            navigate('/login');
        } catch (err) {
            toast.error(err.response.data.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            {isLoading ? (
                <div className="flex items-center justify-center w-full h-full">
                    <Loader />
                </div>
            ) : (
                <form className="bg-gray-100 rounded-lg p-8 shadow-lg w-96" onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h1>

                    <div className="mb-4">
                        <label className="block text-gray-800 mb-2 text-xl" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100 text-black"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-xl mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800 rounded-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800 mb-2 text-xl" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800 mb-2 text-xl" htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition duration-300 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing Up...' : 'Submit'}
                    </button>

                    <p className="mt-4 text-center text-gray-600">
                        Already have an account?
                        <Link to="/login" className="text-blue-500 hover:underline"> Log in</Link>
                    </p>
                </form>
            )}
            <ToastContainer />
        </div>
    );
}

export default Signup;
