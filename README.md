# A-3 Blog Platform

A-3 Blog Platform is a full-featured blogging application built with TypeScript, Express.js, and Mongoose. It includes features like user authentication, blog management, and admin capabilities for user and blog control.

---

## Features

### User Features
- Secure login with JWT authentication.
- Create, update, and delete blogs.
- Browse all published blogs.

### Admin Features
- Block any user.
- Delete any blog.

---

## Technology Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Mongoose**
- **bcrypt**
- **jsonwebtoken (JWT)**
- **Zod**

---

## Installation

### Prerequisites
- Node.js (>= 16.x)
- MongoDB (local or cloud)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/A-3-BLOG-PLATFORM.git
   cd A-3-BLOG-PLATFORM
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an `.env` file in the root directory with the following:
   ```env
   PORT=5000
   DATABASE_URL=<your-mongodb-uri>
   JWT_ACCESS_SECRET=<your-jwt-access-secret>
   JWT_ACCESS_EXPIRES_IN=1h
   BCRYPT_SALT_ROUNDS=4
   NODE_ENV=development
   NODE_ENV=
   ```

4. Start the server:
   ```bash
   npm run start:dev
   ```

The server will run at `http://localhost:5000` by default.

---

## API Endpoints

### Authentication
- **POST** `/api/auth/register`: Log in a user.
- **POST** `/api/auth/login`: Refresh access token.

### Blogs
- **GET** `/api/blogs`: Get all blogs.
- **POST** `/api/blogs`: Create a new blog.
- **PATCH** `/api/blogs/:id`: Update a blog.
- **DELETE** `/api/blogs/:id`: Delete a blog.

### Admin Actions
- **PATCH** `/api/admin/users/:userId/block`: Delete a user.
- **DELETE** `/api/admin/blogs/:id`: Delete a blog.

---

## Folder Structure
```
A-3-BLOG-PLATFORM/
├── src/
│   ├── config/           # Environment configuration
│   ├── controllers/      # Route handlers
│   ├── interfaces/       # TypeScript interfaces
│   ├── middlewares/      # Authentication and validation
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Helpers and utilities
│   ├── validations/      # Input validation schemas
│   ├── app.ts            # Express app
│   └── server.ts         # Server entry point
├── .env
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

---
