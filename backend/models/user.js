const mongoose = require('mongoose');
const { Types, model } = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://t4.ftcdn.net/jpg/08/75/45/97/360_F_875459719_8i7J3atGbsDoRPT0ZW0DjBpgAFVTrKAe.jpg'
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    favourites: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Book"
        }
    ],
    cart: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Book"
        }
    ],
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "order"
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);
