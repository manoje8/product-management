import { Router } from "express";
import Product from "../controller/product.controller.js";
import { uploadImages } from "../utils/imgparser.js";

const productRouter = Router()

productRouter.get("/products", Product.getProducts)
productRouter.get("/products/:id", Product.getProductById)
productRouter.post("/products", uploadImages.array("images", 10), Product.createProduct)
productRouter.put("/products/:id", Product.updateProductById)
productRouter.put("/products/:id/status", Product.updateProductStatus)
productRouter.delete("/products/:id", Product.deleteProduct)

export default productRouter