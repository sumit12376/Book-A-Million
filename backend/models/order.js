const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "Book"
    },
    status: {
        type: String, 
        default: "order placed",
        enum: ["order placed", "out for deliver", "delivery cancel"] 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("order", orderSchema);
