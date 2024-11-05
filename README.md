# Books-A-Million

Books-A-Million is an online book-selling website designed to provide users with an extensive selection of books across various genres. This project focuses on delivering a seamless user experience with a responsive design and intuitive navigation.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Components](#components)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Admin Profile](#admin-profile)

## Features

- View detailed information about each book
- Add books to the cart
- Cash on delivery payment option
- Admin profile for managing book listings

## Technologies Used

### Frontend
- React
- Tailwind CSS
- `react-router-dom` for navigation
- `Redux Toolkit` for state management

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication

### Deployment
- Frontend: Netlify
- Backend: Render

## Setup and Installation

1. Clone the repository:
    ```bash
   https://github.com/sumit12376/Book-A-Million.git
    ```

2. Install the dependencies:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```plaintext
    MONGODB_URI=your_mongodb_uri_here
    JWT_SECRET=your_jwt_secret_here
    ```

4. Start the development server:
    ```bash
    cd backend
    npx nodemon index.js
    ```

5. Start the client:
    ```bash
    cd frontend
    npm run dev
    ```

## Components

### Frontend
- **Navbar**: Includes links to 'Home', 'Cart', and 'Admin'.
- **BookList**: Displays books filtered by selected genre.
- **BookDetail**: Shows detailed information about a selected book.
- **Cart**: Displays books added to the cart with an option to checkout.

### Backend
- **API Endpoints**: Handles CRUD operations for books and user authentication.
- **Authentication**: Uses JWT for secure authentication.

## Backend Deployment

The backend is deployed on Render. To deploy the backend:

1. Create a Render account and link your repository.
2. Set up a new web service with the following settings:
    - **Environment**: Node
    - **Build Command**: `npm install`
    - **Start Command**: `node views/index.js`
3. Add environment variables for `MONGODB_URI` and `JWT_SECRET`.

## Frontend Deployment

The frontend is deployed on Netlify. To deploy the frontend:

1. Create a Netlify account and link your repository.
2. Set up a new site with the following settings:
    - **Build Command**: `npm run build`
    - **Publish Directory**: `frontend/build`

## Admin Profile

An admin profile is available to manage book listings. Use the admin login credentials to access the admin panel and perform CRUD operations on book listings.
