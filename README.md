# ShopHub — Backend API

Node.js + Express + MongoDB REST API for the ShopHub e-commerce assignment.

## Tech Stack

- **Runtime**: Node.js (ESM)
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Mongoose)
- **Auth**: JWT + bcryptjs
- **Dev Server**: Nodemon

## Project Structure

```
src/
├── app.js                  # Entry point
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── authController.js   # Register / Login
│   ├── productController.js
│   └── cartController.js
├── middleware/
│   └── authMiddleware.js   # JWT verification
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Cart.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── cartRoutes.js
└── seeders/
    └── productSeeder.js    # Seed sample products
```

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/NarendraDabhi580/MERN_ASSIGN_BE.git
cd MERN_ASSIGN_BE
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.example .env
```

Then open `.env` and fill in your values:

```
PORT=3200
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. (Optional) Seed the database with sample products

```bash
npm run seed
```

### 5. Start the server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:3200`

---

## API Endpoints

### Auth

| Method | Endpoint             | Auth | Description             |
| ------ | -------------------- | ---- | ----------------------- |
| POST   | `/api/auth/register` | ❌   | Register new user       |
| POST   | `/api/auth/login`    | ❌   | Login and get JWT token |

### Products

| Method | Endpoint            | Auth | Description       |
| ------ | ------------------- | ---- | ----------------- |
| GET    | `/api/products`     | ❌   | Get all products  |
| GET    | `/api/products/:id` | ❌   | Get product by ID |
| POST   | `/api/products`     | ❌   | Create a product  |
| PUT    | `/api/products/:id` | ❌   | Update a product  |
| DELETE | `/api/products/:id` | ❌   | Delete a product  |

### Cart (all require JWT)

| Method | Endpoint                      | Auth | Description           |
| ------ | ----------------------------- | ---- | --------------------- |
| GET    | `/api/cart`                   | ✅   | Get user's cart       |
| POST   | `/api/cart/add`               | ✅   | Add item to cart      |
| PUT    | `/api/cart/update/:productId` | ✅   | Update item quantity  |
| DELETE | `/api/cart/remove/:productId` | ✅   | Remove item from cart |

> **Auth Header format**: `Authorization: Bearer <token>`

---

## Environment Variables

| Variable     | Description                       |
| ------------ | --------------------------------- |
| `PORT`       | Port number (default: 3200)       |
| `MONGO_URI`  | MongoDB connection string         |
| `JWT_SECRET` | Secret key for signing JWT tokens |
