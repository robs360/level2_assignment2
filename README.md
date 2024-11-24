Book Order Management System:
This project is a Book Order Management System built with TypeScript, Express.js, MongoDB, Mongoose and follows the REST API architecture. It allows users to manage products, place orders, and track inventory efficiently.

Features
Product Management:

Add, update, and delete products.
Track product price, quantity
Order Management:

Place orders by specifying product ID, quantity, and total price.
Automatically update product inventory after an order is placed.
Revenue Calculation:

Aggregates total revenue from all orders.
Error Handling:
Using try and catch.

Folder Structure:
/app
  /module
    /product
      Product.interface.ts
      product.model.ts
      product.route.ts
      product.controller.ts
      product.service.ts
    /order
    order.interface.ts
      order.model.ts
      order.route.ts
      order.controller.ts
      order.service.ts
/app.ts
/server.ts

Used Tech:

express, Typescript, MongoDB, Mongoose, Cors, DotEnv Etc

NPM For Devedependency is:
npm install --save-dev @types/cors@^2.8.17 @types/express@^5.0.0 @types/node@^22.9.1 nodemon@^3.1.7 typescript@^5.6.3

## Scripts

The following npm scripts are available:

### 1. `dev`
Runs the server in development mode using **Nodemon**. It will watch for file changes and automatically restart the server.

```bash
npm run dev


