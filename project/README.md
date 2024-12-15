# GroceryDash - Full Stack E-commerce Application

GroceryDash is a modern e-commerce platform built with React, Node.js, and MongoDB, featuring user authentication, product management, and shopping cart functionality.

## 🚀 Features

- **User Authentication**
  - JWT-based authentication
  - Role-based access control (Customer, Premium, Store Owner, Admin)
  - Secure password hashing
  - Token blacklisting for logout

- **Shopping Experience**
  - Product browsing and search
  - Shopping cart management
  - Checkout process
  - Order history

- **User Management**
  - Multiple user roles
  - Profile management
  - Address management
  - Order tracking

- **Admin Features**
  - User management
  - Product management
  - Order management
  - System settings

## 🛠️ Tech Stack

### Frontend
- React with TypeScript
- Redux for state management
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## 📦 Installation

1. Clone the repository: 
bash
git clone https://github.com/yourusername/grocerydash.git
cd grocerydash
bash
Install backend dependencies
cd server
npm install
Install frontend dependencies
cd ../
npm install
bash
Create .env file in server directory
cp .env.example .env
Add your environment variables
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000



