const monogoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async() => {
    try {
        const conn = await monogoose.connect(process.env.CONNECTION);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.log('not connected ... ', error)
    }
}

module.exports = connectDB;