import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function UserOrder() {
    const [orderHist, setOrderHist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const headers = {
                    id: Cookies.get('id'),
                    Authorization: `Bearer ${Cookies.get('token')}`
                };
                const response = await axios.get('http://localhost:3000/api/v1/getorderhistory', { headers });
                console.log("Response:", response);
                setOrderHist(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching order history');
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    return (
        <div className="bg-gradient-to-r bg-gray-100 container mx-auto p-4 min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-black text-center">Order History</h2>
            {orderHist.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full shadow-md rounded">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left text-black border-gray-800">Order ID</th>
                                <th className="py-2 px-4 border-b text-left text-black border-gray-800">Book Title</th>
                                <th className="py-2 px-4 border-b text-left text-black border-gray-800">Status</th>
                                <th className="py-2 px-4 border-b text-left text-black border-gray-800">Order Date</th>
                                <th className="py-2 px-4 border-b text-left text-black border-gray-800">Payment Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderHist.map((order) => (
                                <tr key={order._id} className="text-black ">
                                    <td className="py-2 px-4 border-gray-800">
                                        {order.book ? (
                                            <Link to={`/viewbookdetail/${order.book._id}`} >
                                                {order._id}
                                            </Link>
                                        ) : (
                                            order._id
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {order.book ? (
                                            <Link to={`/viewbookdetail/${order.book._id}`} >
                                                {order.book.title}
                                            </Link>
                                        ) : (
                                            'No title available'
                                        )}
                                    </td>
                                    <td className={`py-2 px-4 border-b ${order.status === 'order placed' ? 'text-green-500' : 'text-red-400'}`}>
                                        {order.status}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 px-4 border-b text-yellow-500">CASH ON DELIVERY</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            ) : (
                <div className="text-5xl text-white mb-4 text-center">No orders found</div>
            )}
        </div>
    );
}

export default UserOrder;