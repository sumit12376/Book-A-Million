import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loader from '../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Setting() {
    const [value, setValue] = useState({ address: '' });
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    const headers = {
        id: Cookies.get('id'),
        Authorization: `Bearer ${Cookies.get('token')}`,
    };

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/getinfo', { headers });
                console.log('Response:', response);
                setValue({ address: response.data.address });
                setProfile(response.data);
            } catch (err) {
                console.error('Error fetching info:', err);
            }
        };
        fetchInfo();
    }, []);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await axios.put(
                'http://localhost:3000/api/v1/updateaddress',
                { address: value.address },
                { headers }
            );
            console.log('Update Response:', response);
            toast.success('Address updated successfully');
        } catch (err) {
            console.error('Error updating address:', err);
            toast.error('Failed to update address');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setValue({ address: e.target.value });
    };

    return (
        <>
            {!profile ? (
                <Loader />
            ) : (
                <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg m-10">
                    <h1 className="text-3xl font-bold mb-6">Settings</h1>
                    <div className="address-info space-y-4">
                        <p className="text-lg">
                            <span className="font-semibold">Username:</span> {profile.username}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold">Email:</span> {profile.email}
                        </p>
                        <h2 className="text-2xl font-semibold">Address:</h2>
                        <textarea
                            className="w-full p-2 bg-gray-200 text-gray-800 rounded focus:outline-none focus:ring ring-blue-500 shadow-sm"
                            value={value.address}
                            onChange={handleChange}
                            rows="4"
                        ></textarea>
                        <button
                            className={`px-4 py-2 bg-blue-500 text-white rounded transition duration-300 focus:outline-none focus:ring ring-blue-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleUpdate}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                    <ToastContainer />
                </div>
            )}
        </>
    );
}

export default Setting;
