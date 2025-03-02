import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

function AddBook() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        url: '',
        title: '',
        author: '',
        price: '',
        desc: '',
        language: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const userId = Cookies.get('id');
    const headers = {
        id: userId,
        Authorization: `Bearer ${Cookies.get('token')}`,
        bookid: id,
    };

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/getbookbyid/${id}`);
                setData(response.data.data); 
            } catch (err) {
                console.error("Error fetching book data:", err);
                setError("Failed to load book data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookData();
    }, [id, userId]);

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
            const response = await axios.put('http://localhost:3000/api/v1/updatebook', data, { headers });
            toast.success(response.data.message);
            setData({
                url: '',
                title: '',
                author: '',
                price: '',
                desc: '',
                language: '',
            });
            navigate(`/viewbookdetail/${id}`);
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'Failed to update book. Please try again.');
        }
    };

    if (isLoading) {
        return (
            <div className='min-h-screen bg-white flex items-center justify-center'>
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg border border-gray-300">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Update Book</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="url" className="block text-gray-800 mb-2">URL</label>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            value={data.url}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
                            placeholder="URL"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="title" className="block text-gray-800 mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
                            placeholder="Title"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="author" className="block text-gray-800 mb-2">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={data.author}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
                            placeholder="Author"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-gray-800 mb-2">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
                            placeholder="Price"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="desc" className="block text-gray-800 mb-2">Description</label>
                        <input
                            type="text"
                            id="desc"
                            name="desc"
                            value={data.desc}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
                            placeholder="Description"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="language" className="block text-gray-800 mb-2">Language</label>
                        <input
                            type="text"
                            id="language"
                            name="language"
                            value={data.language}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
                            placeholder="Language"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 mt-4 bg-blue-600 rounded text-white hover:bg-blue-700 focus:outline-none transition duration-300"
                    >
                        Update Book
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddBook;
