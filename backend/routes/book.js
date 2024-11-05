const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./userAuth');
const Book = require('../models/book');

router.post('/addbook', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to perform admin work" });
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });

        await book.save();
        return res.status(201).json({ message: "Book added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put('/updatebook', authenticateToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        if (!bookid) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to perform admin work" });
        }

        const updatedBook = await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        }, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.delete('/deletebook', authenticateToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        if (!bookid) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to perform admin work" });
        }

        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/getallbook",async(req,res)=>{
    try {
        const books=await Book.find().sort({createdAt:-1})
        return res.json({
            status:"success",
            data:books
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})
router.get("/getrecentbook",async(req,res)=>{
    try {
        const books=await Book.find().sort({createdAt:-1}).limit(8);
        return res.json({
            status:"success",
            data:books
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/getbookbyid/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const books=await Book.findById(id)
        
        return res.json({
            status:"success",
            data:books
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;
   //hamne admin updatw and delete dono me apne aap se liya hai baad me change ho sakta hai