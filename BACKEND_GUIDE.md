# ShopHub — Backend Complete Guide

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- dotenv, cors, nodemon

---

## Step 1 — Create & Setup

```bash
mkdir Interview && cd Interview
mkdir backend && cd backend
npm init -y
```

---

## Step 2 — Install All Dependencies

```bash
# Production dependencies
npm install express mongoose dotenv cors bcryptjs jsonwebtoken

# Dev dependency
npm install -D nodemon
```

---

## Step 3 — Create Folder Structure

```bash
mkdir -p src/config src/controllers src/middleware src/models src/routes src/seeders
```

Final structure:

```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── cartController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── cartRoutes.js
│   ├── seeders/
│   │   └── productSeeder.js
│   └── app.js
├── .env
└── package.json
```

---

## Step 4 — package.json

Replace the generated `package.json` with:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "seed": "node src/seeders/productSeeder.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.2.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

> **Important:** `"type": "module"` enables ES module syntax (`import/export`).

---

## Step 5 — .env

Create `.env` in the `backend/` root:

```
PORT=3200
MONGO_URI=mongodb+srv://<your_user>:<your_password>@cluster.mongodb.net/?appName=MyApp
JWT_SECRET=your_super_secret_random_string_here
```

> Get `MONGO_URI` from MongoDB Atlas → Connect → Drivers.

---

## Step 6 — All Source Files

---

### `src/app.js`

```js
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Services running on port:", PORT);
});
```

---

### `src/config/db.js`

```js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error", error.message);
    process.exit(1);
  }
};

export default connectDB;
```

---

### `src/models/User.js`

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
```

---

### `src/models/Product.js`

```js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);
```

---

### `src/models/Cart.js`

```js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Cart", cartSchema);
```

---

### `src/middleware/authMiddleware.js`

```js
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;
```

---

### `src/controllers/authController.js`

```js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPass,
    });

    res.status(201).json({
      message: "User created successfully",
      user: { name: user.name, email: user.email },
    });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ message: "Login successful", token: token });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
```

---

### `src/controllers/productController.js`

```js
import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, imageUrl, category, stock } = req.body;

    if (!name || !price || !imageUrl || !category || stock === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create({
      name,
      price,
      imageUrl,
      category,
      stock,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ message: "All products fetched successfully", products });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product fetched successfully", product });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch {
    res.status(400).json({ message: "Failed to delete product" });
  }
};
```

---

### `src/controllers/cartController.js`

```js
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "productId and quantity required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user });

    if (!cart) {
      cart = await Cart.create({
        user: req.user,
        items: [{ product: productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.json(cart);
  } catch {
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Valid quantity required" });
    }

    const cart = await Cart.findOne({ user: req.user });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch {
    res.status(500).json({ message: "Failed to update cart" });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();
    res.json(cart);
  } catch {
    res.status(500).json({ message: "Failed to remove item" });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user }).populate(
      "items.product",
    );

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};
```

---

### `src/routes/authRoutes.js`

```js
import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
```

---

### `src/routes/productRoutes.js`

```js
import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
```

---

### `src/routes/cartRoutes.js`

```js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.put("/update/:productId", authMiddleware, updateCartItem);
router.delete("/remove/:productId", authMiddleware, removeCartItem);
router.get("/", authMiddleware, getCart);

export default router;
```

---

### `src/seeders/productSeeder.js`

```js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Wireless Mouse",
    price: 22,
    imageUrl: "https://placehold.co/300x300?text=Mouse",
    category: "Electronics",
    stock: 30,
  },
  {
    name: "Bluetooth Headphones",
    price: 55,
    imageUrl: "https://placehold.co/300x300?text=Headphones",
    category: "Electronics",
    stock: 20,
  },
  {
    name: "Office Chair",
    price: 120,
    imageUrl: "https://placehold.co/300x300?text=Chair",
    category: "Furniture",
    stock: 10,
  },
  {
    name: "Running Shoes",
    price: 80,
    imageUrl: "https://placehold.co/300x300?text=Shoes",
    category: "Fashion",
    stock: 25,
  },
  {
    name: "Backpack",
    price: 45,
    imageUrl: "https://placehold.co/300x300?text=Backpack",
    category: "Fashion",
    stock: 40,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding failed", error);
    process.exit(1);
  }
};

seedProducts();
```

---

## API Reference

| Method | Route                       | Auth Required | Description              |
| ------ | --------------------------- | :-----------: | ------------------------ |
| POST   | /api/auth/register          |      ❌       | Register new user        |
| POST   | /api/auth/login             |      ❌       | Login, returns JWT token |
| GET    | /api/products               |      ❌       | Get all products         |
| POST   | /api/products               |      ❌       | Create a product         |
| GET    | /api/products/:id           |      ❌       | Get product by ID        |
| PUT    | /api/products/:id           |      ❌       | Update product           |
| DELETE | /api/products/:id           |      ❌       | Delete product           |
| GET    | /api/cart                   |      ✅       | Get user's cart          |
| POST   | /api/cart/add               |      ✅       | Add item to cart         |
| PUT    | /api/cart/update/:productId |      ✅       | Update item quantity     |
| DELETE | /api/cart/remove/:productId |      ✅       | Remove item from cart    |

## Start Backend

```bash
npm run dev     # development (auto-restart)
npm start       # production
npm run seed    # seed sample products
```
