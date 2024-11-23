import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import { ProductRoutes } from './app/mudule/product/product.route';
import { OrderRoutes } from './app/mudule/order/order.routes';

const app: Application = express()
app.use(express.json());
dotenv.config()
app.use(cors())

app.use('/api/products',ProductRoutes)
app.use('/api/orders',OrderRoutes)
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

export default app