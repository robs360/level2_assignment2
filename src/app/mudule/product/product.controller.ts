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


const updateSingleProduct=async (req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        const updateDoc=req.body.product;
        const result=await ProductServices.updatSingleProsuctFromDB(id,updateDoc)
        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }
        if(result.modifiedCount>0){
            res.status(200).json({ 
                success: true,
                 message: "Product updated successfully."
             });
        }
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Failed To Update Data.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
}

export const ProductController={
    createProduct,getAllProduct,getSingleProduct,
     deleteSingleProduct,updateSingleProduct
}