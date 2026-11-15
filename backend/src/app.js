'use strict';

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');

const config = require('./config/env');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

// Route imports
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();

// 1. Security HTTP headers
app.use(helmet());

// 2. Request logging
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// 3. Rate limiting (DDoS protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});
app.use('/api', limiter);

// 4. Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. Cookie parser
app.use(cookieParser());

// 6. Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// 7. CORS
app.use(
  cors({
    origin: config.ALLOWED_ORIGINS,
    credentials: true,
  })
);

// 8. Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 9. Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: config.NODE_ENV,
    uptime: Math.floor(process.uptime()),
  });
});
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes); // Public — no auth required
app.use('/api/orders', orderRoutes);     // Protected — requires login

// 10. Handle undefined routes
app.all('*', notFoundHandler);

// 11. Global Error Handler
app.use(errorHandler);

module.exports = app;
