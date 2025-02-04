const mongoose = require('mongoose');
const connectDB = async () => { 
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
        
    }
}
module.exports = connectDB;
