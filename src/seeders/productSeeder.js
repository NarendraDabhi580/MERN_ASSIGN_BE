import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Wireless Mouse",
    price: 22,
    imageUrl: "https://via.placeholder.com/300x300.png?text=Wireless+Mouse",
    category: "Electronics",
    stock: 30,
  },
  {
    name: "Bluetooth Headphones",
    price: 55,
    imageUrl: "https://via.placeholder.com/300x300.png?text=Headphones",
    category: "Electronics",
    stock: 20,
  },
  {
    name: "Office Chair",
    price: 120,
    imageUrl: "https://via.placeholder.com/300x300.png?text=Office+Chair",
    category: "Furniture",
    stock: 10,
  },
  {
    name: "Running Shoes",
    price: 80,
    imageUrl: "https://via.placeholder.com/300x300.png?text=Shoes",
    category: "Fashion",
    stock: 25,
  },
  {
    name: "Backpack",
    price: 45,
    imageUrl: "https://via.placeholder.com/300x300.png?text=Backpack",
    category: "Accessories",
    stock: 40,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed", error);
    process.exit(1);
  }
};

seedProducts();
