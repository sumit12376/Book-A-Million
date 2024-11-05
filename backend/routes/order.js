const router = require('express').Router();
const User = require('../models/user');
const authenticateToken = require('./userAuth');
const Order = require('../models/order');
const Book = require('../models/book');

// Place order
router.post('/placeorder', authenticateToken, async (req, res) => {
    const { id } = req.headers;
    const { order: orderDataArray } = req.body;

    try {
        const orderIds = [];
        for (const orderData of orderDataArray) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataDb = await newOrder.save();
            orderIds.push(orderDataDb._id);

            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataDb._id }
            });

            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id }
            });
        }

        res.status(201).json({ message: 'Order placed successfully', orderIds });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.get('/getorderhistory', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userdata = await User.findById(id).populate({
            path: 'orders',
            populate: { path: 'book' }
        });

        if (!userdata) {
            return res.status(404).json({ message: 'User not found' });
        }
        const orderData = userdata.orders.slice().reverse();

        res.status(200).json({
            status: 'success',
            data: orderData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});




router.get('/getallorders', authenticateToken, async (req, res) => {
    try {
        
        const userdata = await User.find()
            .populate({
                path: 'orders',
            populate: { path: 'book' }
            })
            .sort({ createdAt: -1 });

        if (!userdata || userdata.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json({
            status: 'success',
            data: userdata,
        });
    } catch (error) {
        console.error('Error in getallbooks route:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// update order admin

router.put('/update-status/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        await Order.findByIdAndUpdate(id, { status });

        res.status(200).json({
            status: 'success',
            message: 'Status updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
