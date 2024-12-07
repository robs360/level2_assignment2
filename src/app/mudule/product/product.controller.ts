import { Request, Response } from "express";
import { ProductServices } from "./product.service";
const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;

        const result = await ProductServices.createProductIntoDB(productData)
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Failed to create product.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
}

const getAllProduct = async (req: Request, res: Response) => {
    try {

        let search: string = '';
        if (req.query.q) {
            search = String(req.query.q);
            
        }
        const result = await ProductServices.getAllProductFromDB(search)
        res.status(200).json({
            success: true,
            message: "Get All Data Successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to Get product.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
}

const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.productId;
        const result = await ProductServices.getSingleProductFromDB(id)
        res.status(200).json({
            success: true,
            message: "Successfully Getted Single Data!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to Get product.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
}


const deleteSingleProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.productId;
        const result = await ProductServices.deleteSingleDataFromDB(id)
        res.status(200).json({
            success: true,
            message: "Successfully Deleted The Data",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed To Delete Data.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
}


const updateSingleProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.productId;
        const updateDoc = req.body;
        const result = await ProductServices.updatSingleProductFromDB(id, updateDoc)
        
        const currentTime = new Date().toISOString();
        res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            updateddata:result,
            updatedTime:currentTime,
        });

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed To Update Data.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
}

export const ProductController = {
    createProduct, getAllProduct, getSingleProduct,
    deleteSingleProduct, updateSingleProduct
}