import { Router } from "express";
import upload from "../utils/fileparser.js";
import BulkProduct from "../controller/bulk.controller.js";
import uploadImages from "../utils/imgparser.js";

const bulkRouter = Router()

bulkRouter.post("/products/bulk-upload", upload.single("file"), BulkProduct.bulkUpload)
bulkRouter.put("/products/bulk-update", upload.single("file"), BulkProduct.bulkUpdate)
bulkRouter.delete("/products/bulk-delete", upload.single("file"), BulkProduct.bulkDelete)

export default bulkRouter