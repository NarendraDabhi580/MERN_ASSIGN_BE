# ShopHub — MERN E-Commerce Project

> Complete project guide split into two files for full detail:
>
> - 📄 **[BACKEND_GUIDE.md](./BACKEND_GUIDE.md)** — Node.js + Express + MongoDB
> - 📄 **[FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md)** — React + TypeScript + Vite

---

## Quick Start

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (free tier works)
- npm

---

### 1. Clone / Create project root

```bash
mkdir Interview && cd Interview
```

---

### 2. Setup Backend

```bash
mkdir backend && cd backend
npm init -y

# Install all dependencies
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install -D nodemon

# Create folder structure
mkdir -p src/config src/controllers src/middleware src/models src/routes src/seeders
```

Create `.env` in `backend/`:

```
PORT=3200
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/?appName=MyApp
JWT_SECRET=your_secret_key
```

Then copy all files from **BACKEND_GUIDE.md** into the correct paths.

```bash
npm run seed   # (optional) seed 5 sample products
npm run dev    # start backend → http://localhost:3200
```

---

### 3. Setup Frontend

```bash
# From Interview/ root directory
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install react-router-dom axios

# Create folders
mkdir -p src/api src/components src/context src/pages
```

Then copy all files from **FRONTEND_GUIDE.md** into the correct paths.

```bash
npm run dev    # start frontend → http://localhost:5173
```

---

## Project Structure Overview

```
Interview/
├── BACKEND_GUIDE.md      ← Full backend code & instructions
├── FRONTEND_GUIDE.md     ← Full frontend code & instructions
├── PROJECT_GUIDE.md      ← This file (index / quick start)
│
├── backend/
│   ├── .env
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── config/db.js
│       ├── controllers/ (auth, product, cart)
│       ├── middleware/authMiddleware.js
│       ├── models/ (User, Product, Cart)
│       ├── routes/ (auth, product, cart)
│       └── seeders/productSeeder.js
│
└── frontend/
    ├── index.html
    ├── package.json
    └── src/
        ├── api/api.ts
        ├── components/ (Navbar, ToastProvider)
        ├── context/AuthContext.tsx
        ├── pages/ (Login, Register, Products, Cart, Checkout)
        ├── App.tsx
        ├── main.tsx
        └── index.css
```

---

## API Endpoints

| Method | Route                       | Auth | Description         |
| ------ | --------------------------- | :--: | ------------------- |
| POST   | /api/auth/register          |  ❌  | Register user       |
| POST   | /api/auth/login             |  ❌  | Login → returns JWT |
| GET    | /api/products               |  ❌  | List all products   |
| POST   | /api/products               |  ❌  | Create product      |
| GET    | /api/products/:id           |  ❌  | Get single product  |
| PUT    | /api/products/:id           |  ❌  | Update product      |
| DELETE | /api/products/:id           |  ❌  | Delete product      |
| GET    | /api/cart                   |  ✅  | Get user cart       |
| POST   | /api/cart/add               |  ✅  | Add item to cart    |
| PUT    | /api/cart/update/:productId |  ✅  | Update qty          |
| DELETE | /api/cart/remove/:productId |  ✅  | Remove item         |

---

## Features

| Feature                                  | Status |
| ---------------------------------------- | :----: |
| Register / Login with JWT                |   ✅   |
| Auth state in localStorage + Context     |   ✅   |
| Product grid (image, name, price, stock) |   ✅   |
| Search by name + filter by category      |   ✅   |
| Product CRUD (add/edit/delete via modal) |   ✅   |
| Cart — update quantity, remove items     |   ✅   |
| Total cart value displayed               |   ✅   |
| Mock checkout with success screen        |   ✅   |
| Loading & error states                   |   ✅   |
| Toast notifications                      |   ✅   |
| Responsive UI                            |   ✅   |
