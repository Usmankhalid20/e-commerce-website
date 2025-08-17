const express = require('express')
const app = express()
const connectDB = require('./lib/connect');
const dotenv = require('dotenv').config();
const userRoutes = require('./Routes/UserRoute');
const dashboardRoutes = require('./Routes/dashboardRoute');
const cookieParser = require('cookie-parser');
const cors = require("cors")

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
   credentials: true
}));
connectDB();
app.use('/api/auth', userRoutes)
app.use("/api/adminAuth", dashboardRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})