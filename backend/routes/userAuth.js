
require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) return res.sendStatus(401); 

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Token verification failed:", err);
            return res.sendStatus(403);
        }
        req.user = user; 
        next(); 
    });
    
};

module.exports = authenticateToken;
