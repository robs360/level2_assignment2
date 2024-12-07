import { Request, Response } from "express";
import { OrderServices } from "./order.services";
import { ObjectId } from 'mongodb';
import { ProductModel } from "../product/product.model";
import { OrderModel } from "./order.model";
import { TOrder } from "./order.interface";


const createOrder = async (req: Request, res: Response) => {
    try {
        let custumerOrder: TOrder | '' = '';
        let mess:string = "Order Not Possible"
        const order = req.body;

        const decrement = order.quantity;

        const query = { _id: new ObjectId(order.product)};
                                                           
        const Result2 = await ProductModel.find(query);
        const update = { $inc: { quantity: -decrement } };
        const update2 = {
            $inc: { quantity: -decrement },
            $set: { inStock: false }
        };
        const options = { new: true };
        if (Result2[0].quantity < decrement || !Result2[0].inStock) {
            res.status(404).json({
                message: "Sorry, the requested quantity is not available."
            });
        }


        else {
            
            if (Result2[0].quantity === decrement) {
                const result = await OrderServices.createOrderIntoDB(order)
                const updatedProduct = await ProductModel.updateOne(query, update2, options);
                custumerOrder=result;
            }
            else {
                const result = await OrderServices.createOrderIntoDB(order)
                const updatedProduct = await ProductModel.updateOne(query, update, options);
                custumerOrder=result;
            }

            mess = '';

        }
        const currentTime = new Date().toISOString();

        const updatedResult = await ProductModel.find(query);


        if (mess !== "Order Not Possible") {
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: custumerOrder,
                orderTime: currentTime,
                updatedQuantity: "Product Model Updated",
                UpdatedData: updatedResult
            });
        }
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