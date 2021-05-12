
import connectDB from "./backend/config/db.js";
import productRoutes from "./backend/routes/productRoute.js";
import cartRoutes from "./backend/routes/cartRoute.js";
import couponsRoutes from "./backend/routes/couponsRoute.js";
import userRoutes from "./backend/routes/userRoute.js";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import connectMongo from 'connect-mongo';
import passport from "passport";
import bodyParser from "body-parser"
import { createRequire } from 'module';
import serverless from "serverless-http";


const router = express.Router();
const require = createRequire(import.meta.url);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const MongoStore = connectMongo(session);

//connect database
connectDB();

//dotenv config
dotenv.config();

const app = express();

//Creating API for user

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180*60*1000}
  })
);


app.use(passport.initialize())
app.use(passport.session())

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponsRoutes);
app.use("/api/users", userRoutes); 
app.use(function (req, res, next){
    res.locals.session = req.session
});

app.use('/.netlify/functions/server', router);
const PORT = process.env.PORT || 5002;

app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

module.exports.handler = serverless(app);