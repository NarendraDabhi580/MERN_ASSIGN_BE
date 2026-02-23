import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.put("/update/:productId", authMiddleware, updateCartItem);
router.delete("/remove/:productId", authMiddleware, removeCartItem);
router.get("/", authMiddleware, getCart);

export default router;