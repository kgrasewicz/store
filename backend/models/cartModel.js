import { json } from 'express'
import mongoose from 'mongoose'


let itemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

const cartSchema = new mongoose.Schema({
    items: [itemSchema],
    subTotal: {
        default: 0,
        type: Number
    },
    itemsTotal: {
        default: 0,
        type: Number
    },
}, {
    timestamps: true,
}, { collection : 'cart' })

const Cart = mongoose.model('Cart', cartSchema)

export default Cart