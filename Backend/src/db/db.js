const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB is connected");
    } catch (error) {
        console.log("error:", error);
    }
}
 

module.exports = connectDb

