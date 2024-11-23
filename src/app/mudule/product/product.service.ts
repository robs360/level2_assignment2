import { TProduct } from "./product.interface"
import { ProductModel } from "./product.model"
import { ObjectId } from "mongodb";

const createProductIntoDB = async (product: TProduct) => {
    const result = await ProductModel.create(product)
    return result
}

const getAllProductFromDB = async () => {
    const result = await ProductModel.find()
    return result
}

const getSingleProductFromDB = async (id: string) => {
    const query = { _id: new ObjectId(id) }
    const result = await ProductModel.find(query)
    return result
}

const deleteSingleDataFromDB = async (id: string) => {
    const query = { _id: new ObjectId(id) }

    const result = await ProductModel.deleteOne(query)
    if (result.deletedCount === 0) {
        throw new Error("Product not found or already deleted");
    }
    return result
}

const updatSingleProductFromDB = async (id: string, updateDoc: Partial<TProduct>) => {
    const query = { _id: new ObjectId(id) }
    const update = { $set: updateDoc }
    const option ={new:true}
    const result = await ProductModel.updateOne(query, update,option);
    return result;
}
export const ProductServices = {
    createProductIntoDB, getAllProductFromDB,
    getSingleProductFromDB, deleteSingleDataFromDB,
    updatSingleProductFromDB
}