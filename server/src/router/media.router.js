import { Router } from "express";
import MediaController from "../controller/media.controller.js";
import uploadImages from "../utils/imgparser.js";

const mediaRouter = Router()

mediaRouter.post("/products/:id/media", uploadImages.array("images", 10), MediaController.uploadImages)
mediaRouter.delete("/products/:id/media/:mediaId", MediaController.deleteImages)

export default mediaRouter