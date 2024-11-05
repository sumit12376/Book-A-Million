const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected");
    } catch (error) {
        console.log("Error:", error);
    }
};

module.exports = conn;
