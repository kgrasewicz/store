import { json } from "express";
import mongoose from "mongoose";

let itemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

let personSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let shipSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

let paymentSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const cartSchema = new mongoose.Schema(
  {
    items: [itemSchema],
    
    subTotal: {
      default: 0,
      type: Number,
    },
    itemsTotal: {
      default: 0,
      type: Number,
    },
    discountTotal: {
      default: 0,
      type: Number,
    },
    total: {
        default: 0,
        type: Number
    },
    personalData: [personSchema],
    shippingDetails: [shipSchema],
    paymentDetails: [paymentSchema]
  },
  {
    timestamps: true,
  },
  { collection: "cart" }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
