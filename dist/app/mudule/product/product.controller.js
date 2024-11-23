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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body.product;
        const result = yield product_service_1.ProductServices.createProductIntoDB(productData);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed to create product.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductServices.getAllProductFromDB();
        res.status(200).json({
            success: true,
            message: "Get All Data Successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to Get product.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(id);
        res.status(200).json({
            success: true,
            message: "Successfully Getted Single Data!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to Get product.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
});
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield product_service_1.ProductServices.deleteSingleDataFromDB(id);
        res.status(200).json({
            success: true,
            message: "Successfully Deleted The Data",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed To Delete Data.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
});
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updateDoc = req.body.product;
        const result = yield product_service_1.ProductServices.updatSingleProductFromDB(id, updateDoc);
        console.log(result);
        const currentTime = new Date().toISOString();
        res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            updateddata: result,
            updatedTime: currentTime,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed To Update Data.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
});
exports.ProductController = {
    createProduct, getAllProduct, getSingleProduct,
    deleteSingleProduct, updateSingleProduct
};
