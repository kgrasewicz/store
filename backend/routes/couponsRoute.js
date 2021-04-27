import { getCoupons, getCouponsByName} from "../controllers/couponsController.js";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getCoupons)

// express router method to create route for getting users by id
router.route('/:promocode').get(getCouponsByName)

export default router