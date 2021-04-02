import { json } from 'express'
import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    product_id: {
        type: String,
    },
    product_name:{
        type: String,
    },
    price: {
        type: Number,
    },
    stock: {
        type: Array,
    },
    category: {
        type: String
    },
    collection_name: {
        type: String,
    },
    material: {
        type: String,
    },
    popularity: {
        type: String,
    },
    discount_val: {
        type: String,
    },
    tags: {
        type: Array,
    },
    specs: {
        type: String
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product