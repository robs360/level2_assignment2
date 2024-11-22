import { Request, Response } from "express";
import { ProductServices } from "./product.service";
const createProduct=async (req:Request,res:Response)=>{
     try{
        const productData=req.body.product;
        
        const result=await ProductServices.createProductIntoDB(productData)
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
     }
     catch (err){
       console.log(err)
       res.status(500).json({
        success: false,
        message: "Failed to create product.",
        error: err instanceof Error ? err.message : "Unknown error",
    });
     }
}

const getAllProduct=async (req:Request,res:Response)=>{
     try{
        const result=await ProductServices.getAllProductFromDB()
        res.status(200).json({
            success: true,
            message: "Get All Data Successfully!",
            data: result,
        });
     }
     catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to Get product.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
     }
}

const getSingleProduct=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const result=await ProductServices.getSingleProductFromDB(id)
        res.status(200).json({
            success: true,
            message: "Successfully Getted Single Data!",
            data: result,
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to Get product.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
}


const deleteSingleProduct=async (req:Request,res:Response)=>{
   try{
    const id=req.params.id;
    const result=await ProductServices.deleteSingleDataFromDB(id)
    res.status(200).json({
        success: true,
        message: "Successfully Deleted The Data",
        data: result,
    });
   }
   catch(err){
    res.status(500).json({
        success: false,
        message: "Failed To Delete Data.",
        error: err instanceof Error ? err.message : "Unknown error",
    });
   }
}

export const ProductController={
    createProduct,getAllProduct,getSingleProduct, deleteSingleProduct
}