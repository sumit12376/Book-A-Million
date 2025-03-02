import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

function UserOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/getallorders', {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                });

                if (response.data && response.data.data) {
                    setOrders(response.data.data);
                } else {
                    setOrders([]); // Ensure orders is always an array
                }
            } catch (err) {
                setError('Error fetching orders');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:3000/api/v1/update-status/${orderId}`, 
                { status: newStatus }, 
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                }
            );
            setOrders(prevOrders => 
                prevOrders.map(user => ({
                    ...user,
                    orders: user.orders?.map(order => 
                        order._id === orderId ? { ...order, status: newStatus } : order
                    ) || [],
                }))
            );
        } catch (error) {
            console.error('Error updating order status', error);
        }
    };

    if (loading) {
        return <div className="text-center text-gray-700"><Loader/></div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    const getStatusClass = (status) => {
        switch (status) {
            case "order placed":
                return "bg-green-500 text-white"; 
            case "out for delivery":
                return "bg-yellow-500 text-white"; 
            case "delivery canceled":
                return "bg-red-500 text-white"; 
            default:
                return "bg-gray-500 text-white"; 
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4 text-black font-bold ">User Orders</h2>
            {orders.length === 0 ? (
                <p className="text-gray-700">No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border mt-11">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2 text-left text-gray-700">Username</th>
                                <th className="border px-4 py-2 text-left text-gray-700">Email</th>
                                <th className="border px-4 py-2 text-left text-gray-700">Address</th>
                                <th className="border px-4 py-2 text-left text-gray-700">Order Status</th>
                                <th className="border px-4 py-2 text-left text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(user => (
                                user.orders?.length > 0 ? (
                                    user.orders.map(order => (
                                        <tr key={order?._id || Math.random()} className="hover:bg-gray-50 transition duration-200 text-black">
                                            <td className="border px-4 py-2 bg-white">{user.username}</td>
                                            <td className="border px-4 py-2 bg-white">{user.email}</td>
                                            <td className="border px-4 py-2 bg-white">{user.address}</td>
                                            <td className="border px-4 py-2 bg-white">
                                                <div className={`p-2 rounded ${getStatusClass(order?.status)}`}>
                                                    {order?.status || "Unknown"}
                                                </div>
                                                <select
                                                    value={order?.status}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                    className="border rounded-md px-2 py-1 bg-white mt-2"
                                                >
                                                    <option value="order placed">Order Placed</option>
                                                    <option value="out for delivery">Out for Delivery</option>
                                                    <option value="delivery canceled">Delivery Canceled</option>
                                                </select>
                                            </td>
                                            <td className="border px-4 py-2 bg-white">
                                                {order?.book ? (
                                                    <Link to={`/viewbookdetail/${order.book._id}`}>
                                                        <p className="text-blue-500 hover:underline">Book: {order.book.title}</p>
                                                    </Link>
                                                ) : (
                                                    <p className="text-gray-500">Book details not available</p>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : null
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default UserOrders;
