const express = require('express');
const app = express();
require("dotenv").config();
const cors=require('cors')
const conn = require('./connection/connection');
const user = require('./routes/user');
const books = require('./routes/book');
const favourites = require('./routes/favourite');
const cart = require('./routes/cart');
const orderRouter = require('./routes/order');
app.use(cors())
app.use(express.json());
app.use("/api/v1", user);
app.use("/api/v1", books);
app.use("/api/v1", favourites);
app.use("/api/v1", cart);
app.use("/api/v1", orderRouter); 

app.get('/', (req, res) => {
    res.send("Sumit Vikram Singh");
});

// Call the connection function to connect to the database
conn();

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
