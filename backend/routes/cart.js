const router = require('express').Router();
const User = require('../models/user');
const authenticateToken = require('./userAuth');

// Add to cart route
router.put("/addtocart", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        if (!bookid || !id) {
            return res.status(400).json({
                status: "fail",
                message: "Book ID and User ID are required",
            });
        }

        const userdata = await User.findById(id);
        if (!userdata) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }

        const isBookInCart = userdata.cart.includes(bookid);
        
        if (isBookInCart) {
            return res.json({
                status: "fail",
                message: "Book is already in the cart",
            });
        }
        
        await User.findByIdAndUpdate(id, {
            $push: { cart: bookid }
        });
        
        return res.json({
            status: "success",
            message: "Book is added to the cart",
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Remove from cart route
router.put("/removeaddtocart/:bookid", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.params;
        const { id } = req.headers;

        if (!bookid || !id) {
            return res.status(400).json({
                status: "fail",
                message: "Book ID and User ID are required",
            });
        }

        const userdata = await User.findById(id);
        if (!userdata) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }
        
        if (!userdata.cart.includes(bookid)) {
            return res.json({
                status: "fail",
                message: "Book is not in the cart",
            });
        }
        
        await User.findByIdAndUpdate(id, {
            $pull: { cart: bookid }
        });
        
        return res.json({
            status: "success",
            message: "Book is removed from the cart",
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get cart route
router.get("/getcart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        if (!id) {
            return res.status(400).json({
                status: "fail",
                message: "User ID is required",
            });
        }

        const userdata = await User.findById(id).populate("cart");
        if (!userdata) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }

        
    
        return res.json({
            status: "success",
            message: "Cart retrieved successfully",
            cart: userdata,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
