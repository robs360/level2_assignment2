import { Request, Response } from "express";
import { OrderServices } from "./order.services";
import { ObjectId } from 'mongodb';
import { ProductModel } from "../product/product.model";

const createOrder = async (req: Request, res: Response) => {
    try {
        const order = req.body.order;
        
        const result = await OrderServices.createOrderIntoDB(order)
        const decrement = order.quantity;
        const query = { _id: new ObjectId(order.product) };

        const update = { $inc: { quantity: -decrement } };

        const options = { new: true };
        const updatedProduct = await ProductModel.updateOne(query, update, options);
        const currentTime = new Date().toISOString();
        console.log(updatedProduct)
        const updatedResult=await ProductModel.find(query);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
            orderTime: currentTime,
            updatedQuantity:"Product Model Updated",
            UpdatedData:updatedResult
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

export const OrderController = {
    createOrder
}