import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loader from '../components/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const headers = {
                    id: Cookies.get('id'),
                    Authorization: `Bearer ${Cookies.get('token')}`
                };
                const response = await axios.get('https://books-a-million.onrender.com/api/v1/getcart', { headers });
                console.log("setcat",response.data.cart.cart);
                setCart(response.data.cart.cart);
                calculateTotalPrice(response.data.cart.cart);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    const calculateTotalPrice = (cartItems) => {
        const total = cartItems.reduce((sum, item) => sum + item.price, 0);
        setTotalPrice(total);
    };

    const handlePlaceOrder = async () => {
        try {
            const headers = {
                id: Cookies.get('id'),
                Authorization: `Bearer ${Cookies.get('token')}`
            };
            const response = await axios.post('https://books-a-million.onrender.com/api/v1/placeorder', { order: cart }, { headers });
            console.log( "abc",response)
            setCart([]);
            setTotalPrice(0);
            navigate('/profile/orderhistory');
        } catch (err) {
            console.error('Error placing order:', err);
            setError(err.message);
        }
    };

    if (loading) return <div className=" flex items-center justify-center  bg-gray-100 min-h-screen "><Loader /></div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="mx-auto p-4 bg-gray-100  min-h-screen">
            <h1 className="text-4xl font-extrabold mb-6 text-black text-center">Your Cart</h1>
            <ul className="flex flex-col gap-6">
                {cart.length > 0 ? (
                    cart.map(book => {
                        const formattedTitle = book.title.length > 30 ? `${book.title.slice(0, 30)}...` : book.title;
                        return (
                            <Link key={book._id} to={`/viewbookdetail/${book._id}`} className="flex w-full">
                                <li className="bg-gray-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex h-32 w-full border border-neutral-800">
                                    <img src={book.url} alt={book.title} className="w-24 h-full object-cover" />
                                    <div className="flex-1 p-4 flex flex-col justify-between">
                                        <h2 className="text-xl font-semibold text-gray-800">{formattedTitle}</h2>
                                        <p className="text-lg font-bold text-gray-800 mt-2">₹{book.price.toFixed(2)}</p>
                                    </div>
                                </li>
                            </Link>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center text-blacktext-center">
                    <div className="text-5xl mb-4 ">No items in cart</div>
                    <img
                        src='https://cdn-icons-png.freepik.com/256/15737/15737216.png?semt=ais_hybrid'
                        alt='Cart is empty'
                        className=" p-11 w-42 h-42" 
                    />
                </div>
                
                )}
            </ul>
            {cart.length > 0 && (
                <div className="mt-8 text-center">
                    <h2 className="text-3xl text-black font-bold">Total Price: ₹{totalPrice.toFixed(2)}</h2>
                    <h2 className="text-3xl text-black font-bold">Total Books: {cart.length}</h2>
                    <button
                        className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;
