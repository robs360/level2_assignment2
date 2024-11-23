"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_services_1 = require("./order.services");
const mongodb_1 = require("mongodb");
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body.order;
        const result = yield order_services_1.OrderServices.createOrderIntoDB(order);
        const decrement = order.quantity;
        const query = { _id: new mongodb_1.ObjectId(order.product) };
        const update = { $inc: { quantity: -decrement } };
        const options = { new: true };
        const updatedProduct = yield product_model_1.ProductModel.updateOne(query, update, options);
        const currentTime = new Date().toISOString();
        console.log(updatedProduct);
        const updatedResult = yield product_model_1.ProductModel.find(query);
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
});
const claculateRavenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_model_1.OrderModel.aggregate([
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
});
exports.OrderController = {
    createOrder, claculateRavenue
};
