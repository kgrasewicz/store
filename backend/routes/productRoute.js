import { getProducts, getProductById } from "../controllers/productController.js";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getProducts)

// express router method to create route for getting users by id
router.route('/:id').get(getProductById)

export default router