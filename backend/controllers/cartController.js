import Cart from "../models/cartModel.js";
import asyncHandler from "express-async-handler";


export const addItemToCart = asyncHandler(async (req, res) => {
  try {
    const cart = req.session.cart;

    const productId = req.body.productId;
    const quantity = Number.parseInt(req.body.quantity);
    const size = req.body.size;

    if (req.session.cart) {
      const indexFoundId = cart.items.findIndex(
        (item) => item.productId === productId
      );
      const indexFoundSize = cart.items.findIndex(
        (item) => item.productId === productId && item.size === size
      );

      if (indexFoundId !== -1 && indexFoundSize !== -1 && quantity === 0) {
        cart.items.splice(indexFoundId, 1);
        if (cart.items.length === 0) {
          cart.subTotal = 0;
          cart.itemsTotal = 0;
          cart.discountTotal = 0;
        } else {
          cart.subTotal = cart.items
            .map((item) => item.total)
            .reduce((acc, next) => acc + next);
          cart.itemsTotal = cart.items
            .map((item) => item.quantity)
            .reduce((acc, next) => acc + next);
          cart.cartId = req.sessionID;
          cart.discountTotal = -cart.items
            .map((item) => item.discount * item.quantity)
            .reduce((acc, next) => acc + next);
        }
      } else if (
        indexFoundId !== -1 &&
        indexFoundSize !== -1 &&
        quantity === -2
      ) {
        cart.items[indexFoundSize].discount = req.body.discount;
        cart.discountTotal = -cart.items
          .map((item) => item.discount * item.quantity)
          .reduce((acc, next) => acc + next);
      } else if (
        indexFoundId !== -1 &&
        indexFoundSize !== -1 &&
        quantity !== 0 &&
        quantity !== -2
      ) {

        cart.items[indexFoundSize].discount =
          cart.items[indexFoundSize].discount;
        cart.items[indexFoundSize].quantity =
          Number.parseInt(cart.items[indexFoundSize].quantity) + quantity;
        cart.items[indexFoundSize].total =
          cart.items[indexFoundSize].quantity *
          cart.items[indexFoundSize].price;
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
        cart.itemsTotal = cart.items
          .map((item) => item.quantity)
          .reduce((acc, next) => acc + next);
        cart.discountTotal = -cart.items
          .map((item) => item.discount * item.quantity)
          .reduce((acc, next) => acc + next);
      } else if (
        (indexFoundId === -1 && quantity > 0) ||
        (indexFoundId !== -1 && quantity > 0 && indexFoundSize === -1)
      ) {
        cart.items.push({
          productId: req.body.productId,
          productName: req.body.productName,
          size: req.body.size,
          quantity: req.body.quantity,
          price: req.body.price,
          total: parseInt(req.body.price * quantity),
          model: req.body.model,
          category: req.body.category,
          discount: 0,
        });
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
        cart.itemsTotal = cart.items
          .map((item) => item.quantity)
          .reduce((acc, next) => acc + next);
        cart.discountTotal = -cart.items
          .map((item) => item.discount * item.quantity)
          .reduce((acc, next) => acc + next);
      }

      let data = req.session.cart;
      res.status(200).json({
        type: "success",
        mgs: "Process Successful",
        data: data,
      });
    } else {
      const cartData = {
        items: [
          {
            productId: req.body.productId,
            productName: req.body.productName,
            quantity: quantity,
            size: req.body.size,
            total: parseInt(req.body.price * quantity),
            price: req.body.price,
            model: req.body.model,
            category: req.body.category,
            discount: 0,
          },
        ],
        subTotal: parseInt(req.body.price * quantity),
        itemsTotal: quantity,
        cartId: req.sessionID,
        discountTotal: 0,
      };

      req.session.cart = cartData;
      res.json(req.session.cart);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      err: err,
    });
  }
});

export const getCart = asyncHandler(async (req, res) => {

  const cart = req.session.cart;

  res.json(cart);
});

export const postCartDB =  asyncHandler(async (req, res) => {
  const newCart = new Cart(req.session.cart);

  let data = await newCart.save();

  req.session.destroy()
  res.json(data);
});


export const postPersonalData = asyncHandler(async (req, res) => {
  const cart = req.session.cart

  cart.personalData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    country: req.body.country,
    postalCode: req.body.postalCode,
    city: req.body.city,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
  };

  res.json(cart);
});

export const postShippingData = asyncHandler(async (req, res) => {
  const cart = req.session.cart

  cart.shippingDetails = {
    method: req.body.method,
    address: req.body.address,
    price: req.body.price,
  };

  res.json(cart);
});


export const postPaymentData = asyncHandler(async (req, res) => {
  const cart = req.session.cart

  cart.paymentDetails = {
    method: req.body.method
  };

  res.json(cart);
});

export const emptyCart = asyncHandler(async (req, res) => {
  try {
    req.session.cart = null;

    let data = req.session.cart;
    res.status(200).json({
      type: "Success",
      mgs: "Cart has been emptied",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
  }
});
