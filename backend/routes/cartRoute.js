import { addItemToCart, getCart, emptyCart, postPersonalData, postCartDB, postShippingData, postPaymentData } from "../controllers/cartController.js";
import express from 'express'
const router = express.Router()


router.route('/').post(addItemToCart)

router.route('/').get(getCart)

router.route('/empty-cart').delete(emptyCart)

router.route('/post-cart-db').post(postCartDB)

router.route('/post-personal-data').post(postPersonalData)

router.route('/post-shipping-data').post(postShippingData)

router.route('/post-payment-data').post(postPaymentData)

export default router