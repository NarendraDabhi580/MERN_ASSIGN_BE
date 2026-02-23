import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  // ── Electronics ──────────────────────────────────────────────────────────
  {
    name: "Wireless Mouse",
    price: 22,
    imageUrl:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&auto=format",
    category: "Electronics",
    stock: 30,
  },
  {
    name: "Bluetooth Headphones",
    price: 55,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format",
    category: "Electronics",
    stock: 20,
  },
  {
    name: "Mechanical Keyboard",
    price: 89,
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop&auto=format",
    category: "Electronics",
    stock: 15,
  },
  {
    name: "Smartphone",
    price: 699,
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&auto=format",
    category: "Electronics",
    stock: 12,
  },
  {
    name: "Laptop",
    price: 1199,
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&auto=format",
    category: "Electronics",
    stock: 8,
  },

  // ── Furniture ─────────────────────────────────────────────────────────────
  {
    name: "Office Chair",
    price: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop&auto=format",
    category: "Furniture",
    stock: 10,
  },
  {
    name: "Wooden Desk",
    price: 250,
    imageUrl:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop&auto=format",
    category: "Furniture",
    stock: 6,
  },
  {
    name: "Bookshelf",
    price: 95,
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&auto=format",
    category: "Furniture",
    stock: 14,
  },

  // ── Fashion ───────────────────────────────────────────────────────────────
  {
    name: "Running Shoes",
    price: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format",
    category: "Fashion",
    stock: 25,
  },
  {
    name: "Classic Wristwatch",
    price: 149,
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format",
    category: "Fashion",
    stock: 18,
  },
  {
    name: "Sunglasses",
    price: 35,
    imageUrl:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&auto=format",
    category: "Fashion",
    stock: 50,
  },

  // ── Accessories ───────────────────────────────────────────────────────────
  {
    name: "Backpack",
    price: 45,
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&auto=format",
    category: "Accessories",
    stock: 40,
  },
  {
    name: "Leather Wallet",
    price: 28,
    imageUrl:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop&auto=format",
    category: "Accessories",
    stock: 60,
  },

  // ── Books ─────────────────────────────────────────────────────────────────
  {
    name: "JavaScript: The Good Parts",
    price: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&auto=format",
    category: "Books",
    stock: 35,
  },
  {
    name: "Clean Code",
    price: 22,
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop&auto=format",
    category: "Books",
    stock: 28,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log(`✅ ${products.length} products seeded successfully`);
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed", error);
    process.exit(1);
  }
};

seedProducts();
