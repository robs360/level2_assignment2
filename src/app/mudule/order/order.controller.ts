import { Request, Response } from "express";
import { OrderServices } from "./order.services";
import { ObjectId } from 'mongodb';
import { ProductModel } from "../product/product.model";
import { OrderModel } from "./order.model";

const createOrder = async (req: Request, res: Response) => {
    try {
        const order = req.body.order;

        const decrement = order.quantity;

        const query = { _id: new ObjectId(order.product) };

        const Result2 = await ProductModel.find(query);
        
        if(Result2[0].quantity<decrement){
           res.send({
              message:"Sorry Quantity are not avialable"
           })
        }

        const result = await OrderServices.createOrderIntoDB(order)
        

        const update = { $inc: { quantity: -decrement } };
        
        
        const options = { new: true };

        const updatedProduct = await ProductModel.updateOne(query, update, options);
        const currentTime = new Date().toISOString();

        const updatedResult = await ProductModel.find(query);
        
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
            orderTime: currentTime,
            updatedQuantity: "Product Model Updated",
            UpdatedData: updatedResult
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create order.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
}


const claculateRavenue = async (req: Request, res: Response) => {
    try {
        const result = await OrderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalPrice" }

                }
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                    message: "Revenue calculated successfully",
                    status: true
                }
            }
        ]);
        res.status(200).json({
            success: true,
            data: result[0],
        });
    }
    catch (err) {
        throw err;
    }
}


export const OrderController = {
    createOrder, claculateRavenue
}