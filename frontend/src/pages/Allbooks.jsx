import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard/BookCard';
import Loader from '../components/Loader/Loader';

function AllBooks() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/getallbook');
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Failed to books. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);


    const filteredBooks= data.filter((book) => {
        return book.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    
    return (
        <div className="mx-auto p-4 bg-gray-100 min-h-screen">
            {error && <p className="text-red-500 text-center">{error}</p>}
            {loading ? (
                <div className='flex items-center justify-center'>
                    <Loader />
                </div>
            ) : (
                <>
                    <div className="mt-8 mb-12 w-3/4 md:w-1/2 mx-auto">
    <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400  "
    />
</div>


                    {filteredBooks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredBooks.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-white text-center">No books available.</p>
                    )}
                </>
            )}
        </div>
    );
}

export default AllBooks;
