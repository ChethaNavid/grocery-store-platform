# 🛒 Grocery Store Platform

**Grocery E-Commerce Platform** is a full-stack web application designed to enhance the grocery shopping experience. It allows customers to order fresh groceries online — anytime, anywhere — with secure payments and doorstep delivery. Store administrators can manage inventory and product listings efficiently via an intuitive admin dashboard.

---

## Features

### User Authentication
- Secure login and signup for both **customers** and **admins**
- Session management with **role-based access control**

### Product Catalog
- Browse a wide selection of grocery items
- Search and filter by **name**, **category**, or **availability**
- View product details including images, prices, and stock status

### Shopping Cart & Checkout
- Add items to cart and adjust quantities
- View live cart totals
- Secure **online payment** integration

### Admin Dashboard & Inventory Management
- Perform **CRUD operations** on products
- Manage pricing, stock levels, and categories
- Upload product images (Amazon S3 integration)

### Stock Availability Checker
- Real-time display of **in-stock / out-of-stock** items
- Automatically syncs with inventory updates

---

## Tech Stack

| Frontend   | Backend   | Database  | File Storage | Other Tools             |
|------------|-----------|-----------|--------------|--------------------------|
| React.js   | Node.js   | MySQL     | Amazon S3    | Express, Sequelize ORM, JWT, Bcrypt |

---

## Project Structure
```
grocery-store-platform/
├── frontend/ 
| ├──rocery_store/# React frontend
├── backend/ # Node.js backend
│ ├── models/ # Sequelize models
│ ├── routes/ # API routes
│ ├── controllers/ # Business logic
| ├── middleware/ # Middleware and helpers
| ├── database/ # use sequelize for connecting to database
│ └── src/ #server 
```

---

## Setup Instructions

### Prerequisites

- Node.js v16+
- MySQL database
- AWS S3 bucket for media storage

---

### Clone the Repository

```
git clone https://github.com/ChethaNavid/grocery-store-platform.git
cd grocery-ecommerce

```
### Install Dependencies
```
# Backend
cd backend
cd src
npm install

# Frontend
cd frontend
cd grocery_store
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the `backend/` directory with the following content:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourdbpassword
DB_NAME=groceries_ecommerce
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
S3_BUCKET_NAME=your_s3_bucket_name
```
### Run the Application
```
# Start the backend server
cd backend
cd src
npm run dev

# Start the frontend app
cd frontend
cd grocery_store
npm run dev
```
## Contributing
Contributions are welcome and appreciated!
To contribute:
1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
3. Commit and push: `git commit -m "Add feature"` then `git push origin your-branch`
4. Open a pull request
## License
This project is licensed under the MIT License.
