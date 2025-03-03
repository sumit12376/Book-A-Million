const router = require('express').Router();
const User = require('../models/user');
const authenticateToken = require('./userAuth');
const Order = require('../models/order');
const Book = require('../models/book');

// Place order
router.post('/placeorder', authenticateToken, async (req, res) => {
    const id = req.user.id;
    const { order: orderDataArray } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const orderIds = [];
        for (const orderData of orderDataArray) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataDb = await newOrder.save();
            orderIds.push(orderDataDb._id);
        }

        await User.findByIdAndUpdate(id, {
            $push: { orders: { $each: orderIds } },
            $pull: { cart: { $in: orderDataArray.map(order => order._id) } }
        });

        res.status(201).json({ message: "Order placed successfully", orderIds });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get order history
router.get('/getorderhistory', authenticateToken, async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            status: "success",
            data: user.orders.reverse(),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get all orders (Admin Only)
router.get('/getallorders', authenticateToken, async (req, res) => {
    try {
        const adminUser = await User.findById(req.user.id);
        if (!adminUser || adminUser.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to view all orders" });
        }

        const orders = await Order.find().populate("user").populate("book").sort({ createdAt: -1 });

        res.status(200).json({
            status: "success",
            data: orders,
        });
    } catch (error) {
        console.error("Error in getallorders route:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update order status (Admin Only)
router.put('/update-status/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const adminUser = await User.findById(req.user.id);
        if (!adminUser || adminUser.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to update order status" });
        }

        await Order.findByIdAndUpdate(id, { status });

        res.status(200).json({
            status: "success",
            message: "Status updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
