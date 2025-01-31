# Product Management System

The **Product Management System** is a comprehensive solution for managing products, including CRUD operations, bulk operations, and media management. It consists of both a **frontend (client)** and a **backend (server)**. The system is designed to provide a seamless experience for managing products, with features like bulk upload, product tracking, and media handling.

---

## Features

### Frontend (Client)

- **User Authentication:** Secure login and registration system.
    
- **Product Listing:** View all products with pagination and search functionality.
    
- **Product Details:** View detailed information about a single product.
    
- **Create/Update Product:** Add new products or update existing ones.


### Backend (Server)

- **RESTful API:** Provides endpoints for all product-related operations.
    
- **CRUD Operations:** Create, read, update, and delete products.
    
- **Bulk Operations:** Handle bulk upload, update, and delete operations.
    
- **Error Handling:** Comprehensive error handling for all endpoints.
    

---

## Technologies Used

### Frontend (Client)

- **React.js**: Frontend library for building user interfaces.
    
- **Axios**: HTTP client for making API requests.
    
- **React Router**: For navigation and routing.
    
- **Bootstrap**: For responsive and modern UI components.

### Backend (Server)

- **Node.js**: Server-side JavaScript runtime.
    
- **Express.js**: Web framework for building the API.
    
- **MongoDB**: NoSQL database for storing product data.
    
- **Mongoose**: MongoDB object modeling for Node.js.
    
- **Multer**: Middleware for handling file uploads.
    
- **XLSX**: Library for parsing Excel files during bulk operations.
    
- **CORS**: Middleware to enable cross-origin requests.
    

---

## API Endpoints

### Product CRUD

1. **List All Products:** `GET /api/products` - Retrieve a list of all products with pagination.
    
2. **Get Single Product:** `GET /api/products/:id` - Retrieve details of a single product by its ID.
    
3. **Create New Product:** `POST /api/products` - Create a new product.
    
4. **Update Product:** `PUT /api/products/:id` - Update an existing product by its ID.
    
5. **Delete Product:** `DELETE /api/products/:id` - Delete a product by its ID.
    
6. **Update Product Status:** `PUT /api/products/:id/status` - Update the status (active/inactive) of a product.
    

### Bulk Operations

1. **Bulk Product Upload:** `POST /api/products/bulk-upload` - Upload multiple products via an Excel file.
    
2. **Bulk Update Products:** `PUT /api/products/bulk-update` - Update multiple products via an Excel file.
    
3. **Bulk Delete Products:** `DELETE /api/products/bulk-delete` - Delete multiple products by their IDs.
    

### Product Media

1. **Upload Product Images:** `POST /api/products/:id/media` - Upload images for a product.
    
2. **Delete Product Image:** `DELETE /api/products/:id/media/:mediaId` - Delete a specific image for a product.
    

---

## Setup and Installation

### Prerequisites

- Node.js
    
- npm (Node Package Manager)
    
- MongoDB (running locally or remotely)
    

### Frontend (Client)

1. Clone the repository:
    
```
    git clone https://github.com/your-repo/product-management-system.git
    cd product-management-system/client
```
    
2. Install dependencies:
    
```
    npm install
```
    
3. Start the development server:
    
```
    npm run dev
```
    
4. Open `http://localhost:3000` in your browser to access the application.
    

### Backend (Server)

1. Navigate to the server directory:
    
```
    cd server
```
    
2. Install dependencies:
    
```
    npm install
```
    
3. Set up environment variables:  
    Create a `.env` file in the server directory and add the following:
```
    PORT=8000
    MONGO_URI=mongodb://localhost:27017/product_db
```
    
4. Start the server:
    
```
    npm start
```
    
5. The API will be available at `http://localhost:8000`