import React from 'react';
import { Link } from 'react-router-dom';

function BookCard({ book }) {

    const formattedTitle = book.title.length > 10 ? `${book.title.slice(0, 20)}...` : book.title;

    return (
        <Link to={`/viewbookdetail/${book._id}`} >
            <div className="bg-zinc-100 rounded-lg p-6 shadow-lg hover:shadow-xl">
                <div className="bg-zinc-900 rounded-md mb-4 overflow-hidden">
                    <img
                        src={book.url}
                        alt={book.title}
                        className="w-full h-60 object-contain "
                    />
                </div>
                <h2 className="text-2xl font-semibold text-black mb-2 hover:text-blue-400 transition-colors duration-300">
                    {formattedTitle}
                </h2>
                <div className='text-black font-bold text-lg p-2 rounded '>
                    ₹{book.price}
                </div>


                <p className="text-black mb-3 text-lg italic">by {book.author}</p>
            </div>
        </Link>
    );
}

export default BookCard;
