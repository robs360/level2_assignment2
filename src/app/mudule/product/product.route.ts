import express from 'express'
import { ProductController } from './product.controller'

const router=express.Router()

router.post('/create-product', ProductController.createProduct)
router.get('/getAllProduct',ProductController.getAllProduct)
router.get('/:id',ProductController.getSingleProduct)
router.delete('/:id',ProductController.deleteSingleProduct)
router.patch('/:id',ProductController.updateSingleProduct)

export const ProductRoutes=router