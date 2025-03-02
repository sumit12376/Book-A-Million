import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import BookCard from '../BookCard/BookCard';
import nofev from '../../assets/nofev1.png';
import Loader from '../Loader/Loader';

function Favourites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const headers = {
                    id: Cookies.get('id'),
                    Authorization: `Bearer ${Cookies.get('token')}`
                };

                const response = await axios.get('http://localhost:3000/api/v1/getfavbook', { headers });
                setFavorites(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    if (loading) return <div className="text-center"><Loader/></div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-extrabold mb-4 text-black p-4 rounded-lg text-center">
                Favorite Books
            </h1>
            {favorites.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {favorites.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center text-black text-center mt-8">
                    <div className="text-5xl mb-4">No items in favorites</div>
                    <img
                        src={nofev}
                        alt="No favorite books"
                        className="w-[700px] h-[700px] object-cover"
                    />
                </div>
            )}
        </div>
    );
}

export default Favourites;
