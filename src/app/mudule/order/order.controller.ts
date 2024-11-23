import { Request, Response } from "express";
import { OrderServices } from "./order.services";


const createOrder=async (req: Request, res: Response)=>{
   try{
    const order=req.body.order;
    const result=await OrderServices.createOrderIntoDB(order)
    const currentTime = new Date().toISOString();
    res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result,
        orderTime:currentTime,
    });
   }
   catch(err){
    res.status(500).json({
        success: false,
        message: "Failed to create order.",
        error: err instanceof Error ? err.message : "Unknown error",
    });
   }
}

export const OrderController={
    createOrder
}