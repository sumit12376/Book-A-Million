const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./userAuth');
require('dotenv').config();

router.post('/sign-up', async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be more than 3" });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length <= 5) {
            return res.status(400).json({ message: "Password should be greater than 5 characters" });
        }

        const hashpass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashpass,
            address,
        });

        await newUser.save();
        return res.status(200).json({ message: "Signup successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Sign-in route
router.post('/sign-in', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const authclaims = {
            name: existingUser.username,
            role: existingUser.role,
        };

        const token = jwt.sign(authclaims,process.env.JWT_SECRET, { expiresIn: "30d" });

        return res.status(200).json({ id: existingUser._id, role: existingUser.role, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get user info route
router.get('/getinfo', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Update address route
router.put('/updateaddress', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address });
        return res.status(200).json({ message: "Address change successful" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
