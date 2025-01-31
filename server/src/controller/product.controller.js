import mediaModel from "../model/media.model.js";
import productModel from "../model/product.model.js";

class Product
{
    static async createProduct(req, res, next)
    {
        try 
        {
            const media = new mediaModel({
                images: req.body.images || []
            });
    
            // Save the media document to get the mediaId
            const savedMedia = await media.save();

            const productData = {
                ...req.body,
                mediaId: savedMedia._id,
            };


            const product = new productModel(productData);

            await product.save();
            res.status(201).json({ message: "Product added successfully.", product });
        } 
        catch (error) 
        {
            console.log("Error in while creating product: ", error.message);
            next(error)
        }
        
    }

    static async getProducts(req, res, next)
    {
        try 
        {
            const products = await productModel.find();

            if(products.length === 0) return res.status(300).send({message: "Product List is empty!"})

            res.status(200).json(products);
        } 
        catch (error) 
        {
            console.log("Error in fetching products details: ", error);
            next(error)
        }
    }

    static async getProductById(req, res, next)
    {
        const {id} = req.params
        try 
        {
            const product = await productModel.findById(id)
            if(!product) return res.status(400).send({message: "product not found"})
            res.status(200).send(product)
        } 
        catch (error) 
        {
            console.log("Error in fetching product details by id: ", error);
            next(error)
        }
    }

    static async updateProductById(req, res, next)
    {
        const {id} = req.params
        try 
        {

            const product = await productModel.findByIdAndUpdate(id, req.body, { new: true });
            if (!product) 
            {
                return res.status(404).json({ error: "Product not found." });
            }
            res.status(200).json({ message: "Product updated successfully.", product });
            } 
        catch (error) 
        {
            console.log("Error in Updating product details by id: ", error);
            next(error)
            
        }
    }

    static async updateProductStatus(req, res, next)
    {
        const {id, status} = req.body
        try 
        {
            await productModel.findByIdAndUpdate(id,
                {$set: {status}},
                {new : true}
            )

            res.status(200).send({message: "status updated successfully"})
        } 
        catch (error) 
        {
            console.log("Error in Updating product status: ", error);
            next(error)
            
        }
    }

    static async deleteProduct(req, res, next)
    {
        const {id} = req.params
        try 
        {
            const product = await productModel.findByIdAndDelete(id);
            if (!product) 
            {
                return res.status(404).json({ error: "Product not found." });
            }
            res.status(200).json({ message: "Product deleted successfully." });
        } 
        catch (error) 
        {
            console.log("Error in deleting product ", error);
            next(error)
            
        }
    }
}

export default Product