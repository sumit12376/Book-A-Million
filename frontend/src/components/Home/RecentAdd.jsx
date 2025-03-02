import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../Bookcard/Bookcard';
import Loader from '../Loader/Loader';

function RecentAdd() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/getrecentbook');
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Failed to load recent books. Please try again later.');
            } finally {
                setLoading(false);
             }
        };
        fetchBooks();
    }, []);

    return (
        <div className="mx-auto p-4 bg-gray-100 min-h-screen">
            {error && <p className="text-red-500 text-center">{error}</p>}
            {loading ? (
                <div className='flex items-center justify-center'>
                    <Loader />
                </div>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-6 text-black text-center ">Recent Books</h1>
                    {data.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {data.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-white text-center">No recent books available.</p>
                    )}
                </>
            )}
        </div>
    );
}

export default RecentAdd;
