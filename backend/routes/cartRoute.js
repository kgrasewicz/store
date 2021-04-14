import { addItemToCart, getCart, emptyCart } from "../controllers/cartController.js";
import express from 'express'
const router = express.Router()


router.route('/').post(addItemToCart)

router.route('/').get(getCart)

router.route('/empty-cart').delete(emptyCart)

export default router