import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";


const orderSchema=new Schema<TOrder>({
    email: {type:String,required:true},
    product: {
        type: String,
        required: true,
        minlength: [3, 'Product name must be at least 3 characters long'], 
        maxlength: [100, 'Product name must be less than 100 characters'] 
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1'], 
        max: [1000, 'Quantity cannot exceed 1000'] 
    },
    totalPrice: {
        type: Number,
        required: true,
        min: [0, 'Total price cannot be negative'] 
    }
})

export const OrderModel=model<TOrder>('Order',orderSchema)