import mediaModel from "../model/media.model.js";
import productModel from "../model/product.model.js";
import fs from "fs"

class MediaController 
{
    static async uploadImages(req, res, next)
    {
        try 
        {
            const productId = req.params.id;
            const { files } = req;

            if (!files || files.length === 0) 
            {
                return res.status(400).send('No files uploaded.');
            }

            const imagePaths = files.map(file => file.path);

            const product = await productModel.findById(productId);
            if (!product) 
            {
            return res.status(404).send('Product not found.');
            }

            const media = new mediaModel({
                images: imagePaths,
            });

            const savedMedia = await media.save();
            product.mediaId = savedMedia._id;
            await product.save();

            res.status(201).json({ message: 'Images uploaded successfully', media: savedMedia });
        } 
        catch (error) 
        {
            console.log("Error in uploading products images: ", error);
            next(error)
        }
    }

    static async deleteImages(req, res, next)
    {
        try 
        {
            const productId = req.params.id;
            const mediaId = req.params.mediaId;

            // Find the product by ID
            const product = await productModel.findById(productId);
            if (!product) {
            return res.status(404).send('Product not found.');
            }

            const media = await mediaModel.findById(mediaId);
            if (!media) {
            return res.status(404).send('Media not found.');
            }

            media.images.forEach((imagePath) => {
                if (fs.existsSync(imagePath)) {
                  fs.unlinkSync(imagePath); // Delete image from storage
                }
              });

            
            await mediaModel.findByIdAndDelete(mediaId);
            
            if (product.mediaId?.toString() === mediaId) {
                product.mediaId = null;
                await product.save();
              }
          
            res.status(200).json({ message: 'Image deleted successfully' });
        } 
        catch (error) 
        {
            console.log("Error in deleting products images: ", error);
            next(error)
        }
    }
}

export default MediaController