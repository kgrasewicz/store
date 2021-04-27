import Coupon from '../models/couponsModel.js'
import asyncHandler from 'express-async-handler'

//getUsers function to get all users
export const getCoupons = asyncHandler(async(req, res) => {
    const coupons = await Coupon.find({})
    res.json(coupons)
})

//getUserById function to retrieve user by id
export const getCouponsByName  = asyncHandler(async(req, res) => {
    const coupon = await Coupon.find({promocode: req.params.promocode})

    //if user id match param id send user else throw error
    if(coupon){
        res.json(coupon)
    }else{
        res.status(404).json({message: "Coupon not found"})
        res.status(404)
        throw new Error('Coupon not found')
    }
})