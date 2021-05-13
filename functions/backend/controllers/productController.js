import Product from '../models/productsModel.js'
import asyncHandler from 'express-async-handler'

//getUsers function to get all users
export const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
})

//getUserById function to retrieve user by id
export const getProductById  = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    //if user id match param id send user else throw error
    if(product){
        res.json(product)
    }else{
        res.status(404).json({message: "Product not found"})
        res.status(404)
        throw new Error('Product not found')
    }
})