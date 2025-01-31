import XLSX from 'xlsx';
import productModel from '../model/product.model.js';
import { ObjectId } from 'mongoose';


class BulkProduct
{
    static async bulkUpload(req, res, next)
    {
        try 
        {
            const file = req.file;
            if (!file) return res.status(400).send('No file uploaded.');

            if (!file.mimetype.includes('excel') && !file.originalname.endsWith('.xlsx')) 
            {
                return res.status(400).send('Invalid file format. Please upload an Excel file.');
            }

            // Read the uploaded Excel file
            const workbook = XLSX.readFile(file.path);
            const sheet_name_list = workbook.SheetNames;
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

            if (data.length === 0) return res.status(400).send("Excel file is empty.");

            const products = data.map((item) => ({
                name: item.name,
                code: item.code,
                category: item.category,
                description: item.description,
                status: item.status || false,
                basePrice: item.basePrice,
                discount: item.discount || 0,
                tax: item.tax || 0,
                stockQuantity: item.stockQuantity,
                minOrderQuantity: item.minOrderQuantity || 1,
                restock: item.restock || 0,
                specification: item.specification || [],
            }));

            await productModel.insertMany(products);
            res.status(201).send('Products successfully uploaded.');

        } 
        catch (error) 
        {
            console.log("Error in while uploading product: ", error.message);
            next(error)
        }
        
    }

    static async bulkUpdate(req, res, next) {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).send('No file uploaded.');
            }
        
            
            if (!file.mimetype.includes('excel') && !file.originalname.endsWith('.xlsx')) {
                return res.status(400).send('Invalid file format. Please upload an Excel file.');
            }
        
            
            const workbook = XLSX.readFile(file.path);
            const sheet_name_list = workbook.SheetNames;
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        
            
            const errors = [];
            const bulkOps = data.map((item, index) => {
                if (!item.name || !item.category || !item.basePrice || !item.stockQuantity) 
                {
                    errors.push(`Row ${index + 2}: Missing required fields.`);
                    return null;
                }
                if (isNaN(item.basePrice) || isNaN(item.stockQuantity)) 
                {
                    errors.push(`Row ${index + 2}: Invalid numeric value.`);
                    return null;
                }
        
                return {
                    updateOne: {
                        filter: { code: item.code },
                        update: {
                        $set: {
                            name: item.name,
                            category: item.category,
                            description: item.description || '',
                            status: item.status || false,
                            basePrice: parseFloat(item.basePrice),
                            discount: parseFloat(item.discount) || 0,
                            tax: parseFloat(item.tax) || 0,
                            stockQuantity: parseInt(item.stockQuantity),
                            minOrderQuantity: parseInt(item.minOrderQuantity) || 1,
                            restock: parseInt(item.restock) || 0,
                            specification: item.specification || [],
                        },
                        },
                        upsert: false,
                    },
                };
            }).filter(op => op !== null);
        
            
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }
        
            
            await productModel.bulkWrite(bulkOps);
            res.status(200).send('Products successfully updated.');
        } catch (error) 
        {
            console.log("Error while updating products: ", error.message);
            next(error);
        }
    }

    static async bulkDelete(req, res, next)
    {
        try 
        {
            const file = req.file;
            if (!file) return res.status(400).send('No file uploaded.');
        
            
            const workbook = XLSX.readFile(file.path);
            const sheet_name_list = workbook.SheetNames;
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

            if (data.length === 0) return res.status(400).send("Excel file is empty.");

            const productNames = data.map((item) => item.name).filter(Boolean);

            if (productNames.length === 0) return res.status(400).send("No valid product names found.");

            const result = await productModel.deleteMany({ name: { $in: productNames } });
            
            res.status(200).json({
                message: `${result.deletedCount} products deleted successfully.`,
            });
        } 
        catch (error) 
        {
            console.log("Error in while deleting product in bulk: ", error.message);
            next(error)
        }
        
    }
}

export default BulkProduct