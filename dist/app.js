"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/mudule/product/product.route");
const order_routes_1 = require("./app/mudule/order/order.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use('/api/products', product_route_1.ProductRoutes);
app.use('/api/orders', order_routes_1.OrderRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
