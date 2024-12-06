# Ribaru Backend API

This is the backend API for the Ribaru React application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a .env file with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ribaru
JWT_SECRET=your_jwt_secret_key_here
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

- `/routes` - API routes
- `/controllers` - Route controllers
- `/models` - Database models
- `/middleware` - Custom middleware
- `/config` - Configuration files
- `/utils` - Utility functions

## API Endpoints

### Auth
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

More endpoints will be added as development continues.
