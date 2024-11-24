"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: {
        type: String, required: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [200, 'Title must be less than 200 characters']
    },
    author: {
        type: String, required: true,
        minlength: [3, 'Author name must be at least 3 characters long'],
        maxlength: [100, 'Author name must be less than 100 characters']
    },
    price: {
        type: Number, required: true,
        min: [0, 'Price cannot be negative']
    },
    category: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: true }
});
exports.ProductModel = (0, mongoose_1.model)('Product', productSchema);
