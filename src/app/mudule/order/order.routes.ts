import express from 'express'
import { OrderController } from './order.controller'

const router=express.Router()

router.post('/create-order',OrderController.createOrder)
router.get('/calc-revenue',OrderController.claculateRavenue)

export const OrderRoutes=router