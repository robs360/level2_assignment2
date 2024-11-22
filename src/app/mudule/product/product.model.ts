import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";


const productSchema= new Schema<TProduct>({
    title:{type:String,required:true},
    author:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    quantity:{type:Number,required:true},
    inStock:{type:Boolean,required:true,default:true}

})

export const ProductModel= model<TProduct>('Product',productSchema)