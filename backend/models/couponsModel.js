import { json } from 'express'
import mongoose from 'mongoose'

const couponsSchema = new mongoose.Schema({
    promocode: {
        type: String,
    },
    products:{
        type: Array,
    }
}, {
    timestamps: true
}, { collection : 'coupons' })

const Coupon = mongoose.model('Coupon', couponsSchema)

export default Coupon