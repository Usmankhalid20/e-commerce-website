const express = require('express')
const app = express()
const connectDB = require('./lib/connect');
const dotenv = require('dotenv').config();
const userRoutes = require('./Routes/User.Route');
const dashboardRoutes = require('./Routes/dashboard.Route');
const cookieParser = require('cookie-parser');
const cors = require("cors")

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
   credentials: true
}));

app.use("/uploads", express.static("uploads"));
connectDB();
app.use('/api/auth', userRoutes)
app.use("/api/adminAuth", dashboardRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})