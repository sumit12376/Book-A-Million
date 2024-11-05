import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddBook() {
    const [Data, setData] = useState({
        url: '',
        title: '',
        author: '',
        price: '',
        desc: '',
        language: '',
    });

    const userId = Cookies.get('id');
    const headers = {
        id: userId,
        Authorization: `Bearer ${Cookies.get('token')}`
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://books-a-million.onrender.com/api/v1/addbook',
                Data,
                { headers }
            );
            toast.success(response.data.message);
            setData({
                url: '',
                title: '',
                author: '',
                price: '',
                desc: '',
                language: '',
            });
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'Failed to add book. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-12">
            <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-6 text-center">Add Book</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="url" className="block mb-2">URL</label>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            value={Data.url}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-50 text-black"
                            placeholder="URL"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="title" className="block mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={Data.title}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-50 text-black"
                            placeholder="Title"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="author" className="block mb-2">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={Data.author}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-50 text-black"
                            placeholder="Author"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block mb-2">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={Data.price}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-50 text-black"
                            placeholder="Price"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="desc" className="block mb-2">Description</label>
                        <input
                            type="text"
                            id="desc"
                            name="desc"
                            value={Data.desc}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-50 text-black"
                            placeholder="Description"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="language" className="block mb-2">Language</label>
                        <input
                            type="text"
                            id="language"
                            name="language"
                            value={Data.language}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-50 text-black"
                            placeholder="Language"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 mt-4 bg-blue-600 rounded text-white hover:bg-blue-700 focus:outline-none transition duration-300"
                    >
                        Add Book
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddBook;
