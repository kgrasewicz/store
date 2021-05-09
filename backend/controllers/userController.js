import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";


export const getUser = asyncHandler(async(req, res) => {

    res.send(req.user)
})



export const signUp = asyncHandler(async (req, res) => {
  const user = await User.find({ email: req.body.email })
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword)
  if (user.length != 0) {

    res.json("User already exists")
  } else {

    const userData = 
        {
          password: hashedPassword,
          email: req.body.email,
          name: req.body.name,
          surname: req.body.surname
        }    

    const newUser = new User(userData);

    let data = await newUser.save();
    res.json(data);
  }

});
