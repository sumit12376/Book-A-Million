const router = require('express').Router();
const User = require('../models/user');
const authenticateToken = require('./userAuth');

router.put('/addbookfav', authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        // Validate headers
        if (!bookid || !id) {
            return res.status(400).json({ message: "Book ID and User ID are required" });
        }

        // Fetch user data
        const userdata = await User.findById(id);
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if book is already in favorites
        const isbookfav = userdata.favourites.includes(bookid);
        if (isbookfav) {
            return res.status(200).json({ message: "Book is already in favorites" });
        }

        // Add book to favorites
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: "Book added to favorites" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put('/deletefav', authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        // Validate headers
        if (!bookid || !id) {
            return res.status(400).json({ message: "Book ID and User ID are required" });
        }

        // Fetch user data
        const userdata = await User.findById(id);
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove book from favorites
        await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
        return res.status(200).json({ message: "Book removed from favorites" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/getfavbook', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; 
        
        const userdata = await User.findById(id).populate("favourites");
        
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }

        const favouritebooks = userdata.favourites;
        return res.json({ status: "success", data: favouritebooks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;



// {
//     "_id": "123",
//     "username": "abc",
//     "email": "abc@example.com",
//     "favourites": [
//         {
//             "_id": "6666",
//             "url": "44tt",
//             "title": "Boott",
//             "author": "Authottr 1",
//             "price": 19.9tt9,
//             "desc": "Descriptiont",
//             "language": "English",
//             "createdAt": "2024-10-01t",
//             "updatedAt": "2024-10-01Tt"
//         },
//          {
//             "_id": "666ryd6",
//             "url": "44tdfdt",
//             "title": "Boodett",
//             "author": "Aussfthottr 1",
//             "price": 19.9tsfgt9,
//             "desc": "Descripghhtiont",
//             "language": "Englhhish",
//             "createdAt": "2024-j566410-01t",
//             "updatedAt": "2024-10-01Tt"
//         },
//     ],
//     "createdAt": "2024-10-01T00:00:00.000Z",
//     "updatedAt": "2024-10-01T00:00:00.000Z"
// }
