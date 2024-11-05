import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; 

function Footer() {
    return (
        <div className='bg-gray-100 px-8 py-4 text-center text-black shadow-sm h-24'>
            <h1 className='mb-2'>&copy; 2024, Made With ❤️ by Sumit</h1>
            <div className='flex justify-center space-x-4'>
                <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='hover:text-gray-400'>
                    <FaFacebook size={24} />
                </a>
                <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='hover:text-gray-400'>
                    <FaTwitter size={24} />
                </a>
                <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='hover:text-gray-400'>
                    <FaInstagram size={24} />
                </a>
                <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className='hover:text-gray-400'>
                    <FaLinkedin size={24} />
                </a>
            </div>
        </div>
    );
}

export default Footer;
