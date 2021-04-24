import connectDB from "./backend/config/db.js";
import productRoutes from "./backend/routes/productRoute.js";
import cartRoutes from "./backend/routes/cartRoute.js";
import couponsRoutes from "./backend/routes/couponRoute.js";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

//connect database
connectDB();

//dotenv config
dotenv.config();

const app = express();

//Creating API for user
app.use(express.json());
app.use(
  session({
    secret: "sedcadgafadfasdfas",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180*60*1000}
  })
);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("api/coupons", couponsRoutes);
app.use(function (req, res, next){
    res.locals.session = req.session
})

const PORT = process.env.PORT || 5002;

//Express js listen method to run project on http://localhost:5000
app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
