"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
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
});
exports.OrderModel = (0, mongoose_1.model)('Order', orderSchema);
