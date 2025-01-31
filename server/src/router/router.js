import express from "express";
import productRouter from "./product.router.js";
import bulkRouter from "./bulk.router.js";
import mediaRouter from "./media.router.js";

const route = express()

route.use("/api", productRouter)
route.use("/api", bulkRouter)
route.use("/api", mediaRouter)

export default route