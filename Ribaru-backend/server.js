require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const prisma = require('./config/db');
const { limiter, securityMiddleware } = require('./middleware/security');

// Import routes
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const socialRoutes = require('./routes/social.routes');
const uploadRoutes = require('./routes/upload.routes');
const searchRoutes = require('./routes/search.routes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Apply security middleware
app.use('/api', limiter);
securityMiddleware.forEach(middleware => app.use(middleware));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Ribaru API' });
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ message: 'Database connection successful', users });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/search', searchRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
