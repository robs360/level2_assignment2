import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";


const productSchema= new Schema<TProduct>({
    title:{
        type:String,required:true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [200, 'Title must be less than 200 characters']
    },
    author:{
        type:String,required:true,
        minlength: [3, 'Author name must be at least 3 characters long'], 
        maxlength: [100, 'Author name must be less than 100 characters']
    },
    price:{
        type:Number,required:true,
        min: [0, 'Price cannot be negative'] 
    },
    category:{type:String,required:true},
    description:{type:String,required:true},
    quantity:{type:Number,required:true},
    inStock:{type:Boolean,required:true,default:true}

})

export const ProductModel= model<TProduct>('Product',productSchema)