import express from "express";
import {
  showProductPage,
  showCreateProductPage,
  showEditProductPage,
  showSingleProductPage,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
import { createproductMulter } from "../utils/multer.js";

// init router
const router = express.Router();

// EJS routes
router.get("/", showProductPage);
router.get("/create", showCreateProductPage);
router.get("/edit/:id", showEditProductPage);
router.get("/single/:slug", showSingleProductPage);

// API routes
router.post("/product", createproductMulter, createProduct);
router.post("/update/:id", createproductMulter, updateProduct);
router.get("/delete/:id", deleteProduct);
// export router
export default router;
