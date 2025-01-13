# Hotelbooking Web App

## Description

This project is a web application developed with a React-based frontend and a MERN (MongoDB, Express.js, React, Node.js) backend. It integrates several modern tools and libraries to provide efficient functionality and maintainable code.

### Frontend Features
- Built with **React**.
- State management using **Context API**.
- Data fetching and caching with **React Query**.

### Backend Features
- Built with the **MERN stack**.
- Image handling and storage using **Cloudinary**.
- File upload functionality implemented with **Multer**.

## Folder Structure
```
project-root/
├── frontend/        # React application
└── backend/         # MERN backend API
```

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Context API**: For state management.
- **React Query**: For server-state management and API interactions.

### Backend
- **MongoDB**: NoSQL database for storing application data.
- **Express.js**: Web framework for building the backend API.
- **Node.js**: JavaScript runtime for backend development.
- **Multer**: Middleware for handling file uploads.
- **Cloudinary**: Cloud-based image storage and processing.

## Installation and Setup

### Prerequisites
- **Node.js** (v14 or later)
- **MongoDB**

### Clone the Repository
```bash
git clone https://github.com/Bidyut-Sikder/hotelbooking.git
cd project-name
```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables by creating a `.env` file in the `backend` directory. Example:
   ```env
NODE_ENV=development
MONGODB_CONNECTION_STRING_DEV=mongodb://localhost:27017/hotelbooking
MONGODB_CONNECTION_STRING=

FRONTEND_URL=http://localhost:5173

JWT_SECRET_KEY=

NODE_VERSION=20.10.0
#cloudinary variables

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

## Running the Application
1. Start both the frontend and backend servers as described above.
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints
### Example Endpoints:
- **POST /upload**: Handle file uploads using Multer and store them in Cloudinary.
- **GET /items**: Fetch a list of items from the database.



## Contributing
Feel free to fork this repository and make contributions. Submit a pull request for review.

