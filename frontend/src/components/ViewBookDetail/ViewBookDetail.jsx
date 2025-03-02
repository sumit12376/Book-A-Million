import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { FaHeart, FaShoppingCart, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

function ViewBookDetail() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [bookData, setBookData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFav, setIsFav] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const userId = Cookies.get('id');
    const isLoggedIn = useSelector((state) => state.auth.isloggedin);
    const Role = useSelector((state) => state.auth.role);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchBookData = async () => {
            try {
                const response = await axios.get(`https://books-a-million.onrender.com/api/v1/getbookbyid/${id}`);
                setBookData(response.data.data);
                const localFavStatus = localStorage.getItem(`fav_${userId}_${id}`);
                const localCartStatus = localStorage.getItem(`cart_${userId}_${id}`);
                setIsFav(localFavStatus === 'true');
                setIsInCart(localCartStatus === 'true');
            } catch (err) {
                console.error("Error fetching book data:", err);
                setError("Failed to load book data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookData();
    }, [id, userId]);

    const headers = {
        id: userId,
        Authorization: `Bearer ${Cookies.get('token')}`,
        bookid: id,
    };

    const addFav = async () => {
        try {
            await axios.put("https://books-a-million.onrender.com/api/v1/addbookfav", {}, { headers });
            setIsFav(true);
            localStorage.setItem(`fav_${userId}_${id}`, 'true');
            console.log("Added to favorites");
        } catch (err) {
            console.error("Error adding book to favorites:", err);
        }
    };

    const removeFav = async () => {
        try {
            await axios.put("https://books-a-million.onrender.com/api/v1/deletefav", {}, { headers });
            setIsFav(false);
            localStorage.removeItem(`fav_${userId}_${id}`);
            console.log("Removed from favorites");
        } catch (err) {
            console.error("Error removing book from favorites:", err);
        }
    };

    const addToCart = async () => {
        try {
            await axios.put("https://books-a-million.onrender.com/api/v1/addtocart", {}, { headers });
            setIsInCart(true);
            localStorage.setItem(`cart_${userId}_${id}`, 'true');
            console.log("Added to cart");
        } catch (err) {
            console.error("Error adding book to cart:", err);
        }
    };

    const removeFromCart = async () => {
        try {
            await axios.put(`https://books-a-million.onrender.com/api/v1/removeaddtocart/${id}`, {}, { headers });
            setIsInCart(false);
            localStorage.removeItem(`cart_${userId}_${id}`);
            console.log("Removed from cart");

        } catch (err) {
            console.error("Error removing book from cart:", err);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete('https://books-a-million.onrender.com/api/v1/deletebook', { headers });
            console.log("Book deleted:", response.data);
            navigate("/")
        } catch (err) {
            console.error("Error deleting book:", err);
        }
        finally {
            setIsLoading(false);
        }
    };





    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen ">
                <Loader />
               
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center mt-4">
                {error}
            </div>
        );
    }

    return (
        bookData && (
            <div className="bg-zinc-100 min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 py-8 gap-8">
                <div className="bg-zinc-900 md:bg-zinc-800 rounded-lg lg:w-1/3 flex flex-col items-center justify-center p-4 relative">
                    <img
                        src={bookData.url}
                        alt={bookData.title}
                        className="w-full md:max-w-md lg:max-w-lg max-h-[60vh] rounded-lg mb-4 object-contain"
                    />
                    {isLoggedIn && Role === 'user' && (
                        <div className="flex flex-row lg:flex-col gap-4 mt-4 lg:mt-0 lg:absolute lg:top-4 lg:right-4 md:absolute md:top-4 md:right-4">
                            <button
                                className={`bg-white rounded-full p-3 text-2xl transition duration-100 shadow-lg hover:shadow-xl ${isFav ? 'text-red-500' : 'text-black'}`}
                                onClick={isFav ? removeFav : addFav}
                            >
                                <FaHeart />
                            </button>
                            <button
                                className={`bg-white rounded-full p-3 text-2xl transition duration-100 shadow-lg hover:shadow-xl ${isInCart ? 'text-blue-700' : 'text-black'}`}
                                onClick={isInCart ? removeFromCart : addToCart}
                            >
                                <FaShoppingCart />
                            </button>
                        </div>
                    )}
                    {isLoggedIn && Role === 'admin' && (
                        <div className="flex flex-row lg:flex-col gap-4 mt-4 lg:mt-0 lg:absolute lg:top-4 lg:right-4 md:absolute md:top-4 md:right-4">
                            <Link to={`/updatebook/${id}`}>
                                <button
                                    className="bg-white rounded-full p-3 text-3xl text-black hover:text-blue-700 transition duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <FaEdit />
                                </button>
                            </Link>
                            <button
                                className="bg-white rounded-full p-3 text-3xl text-black hover:text-red-700 transition duration-300 shadow-lg hover:shadow-xl"
                                onClick={handleDelete}
                            >
                                <MdDelete />
                            </button>
                        </div>
                    )}
                </div>
                <div className="text-black p-4 w-full lg:w-1/2">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{bookData.title}</h1>
                    <p className="text-black mb-4 text-xl">
                        <span className="font-bold">Description:</span> {bookData.desc}
                    </p>

                    <p className="text-black mb-2">
                        <span className="font-bold text-lg">Author:</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2">
                            {bookData.author}
                        </span>
                    </p>
                    <p className="text-black mb-2">
                        <span className="font-bold text-lg">Language:</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2">
                            {bookData.language}
                        </span>
                    </p>

                    <p className="text-black mb-2">
                        <span className="font-bold text-lg">Price:</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2">
                            {bookData.price}
                        </span>
                    </p>
                </div>
            </div>
        )
    );
}

export default ViewBookDetail;
