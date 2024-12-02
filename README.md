# 🏠 Housify

A modern real estate platform connecting property agents with potential buyers and renters. Built with React, Node.js, and MongoDB.

## ✨ Features

- 🏘️ Property Listings: Browse, search, and filter available properties
- 👤 User Authentication: Secure signup and login for users and agents
- 💼 Agent Dashboard: Dedicated portal for real estate agents to manage listings
- 📝 Property Management: Add, edit, and remove property listings
- 📱 Responsive Design: Optimized for both desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS
  - Axios for API calls
  - Context API for state management

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/housify.git
   cd housify
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

3. Environment Setup:
   ```bash
   # Copy the example env file
   cp .env.example .env
   ```

4. Update the `.env` file with your values:
   - `MONGO_URL`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT token signing
   - `ADMIN_PASSWORD`: Password for admin access
   - Other configuration variables as needed

5. Start the development servers:
   ```bash
   # Start backend server (from backend directory)
   npm start

   # Start frontend server (from root directory)
   npm start
   ```

## 📁 Project Structure

```
housify/
├── frontend/          # React frontend application
├── backend/           # Node.js backend API
│   ├── api/          # API routes and controllers
│   ├── models/       # MongoDB models
│   └── middleware/   # Custom middleware
├── public/           # Static files
└── src/              # React source files
    ├── components/   # Reusable React components
    ├── pages/        # Page components
    ├── context/      # React Context providers
    └── utils/        # Utility functions
```

## 🔒 Security Best Practices

- Environment variables for sensitive information
- Secure password hashing with bcrypt
- JWT for authenticated requests
- Rate limiting on API endpoints
- Input validation and sanitization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Tunde Ridwan Ogunmodede

---

⭐️ If you find this project helpful, please give it a star!